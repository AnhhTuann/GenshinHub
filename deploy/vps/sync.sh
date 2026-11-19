#!/usr/bin/env bash
set -euo pipefail
umask 077
export LC_ALL=C

: "${DATABASE_URL:?Set the explicit PostgreSQL target}"
: "${ASSET_STORAGE_PATH:?Set the persistent asset storage root}"
case "${1:-}" in
  check)
    # Run each check even if the registry or another dependency is unavailable.
    status=0
    npm run sync:version || status=1
    npm run sync:validate || status=1
    npm run sync:assets:check || status=1
    exit "$status"
    ;;
  assets)
    npm run sync:assets
    ;;
  apply)
    : "${APPROVED_GENSHIN_DB_VERSION:?Set the reviewed installed version}"
    : "${SYNC_BACKUP_ROOT:?Set the private backup directory}"
    : "${FRONTEND_REVALIDATE_URL:?Set the Next.js revalidation endpoint}"
    : "${REVALIDATE_SECRET:?Set the Next.js revalidation secret}"
    [[ "$(node -p "require('genshin-db/package.json').version")" == "$APPROVED_GENSHIN_DB_VERSION" ]]
    mkdir -p "$SYNC_BACKUP_ROOT"
    exec 9>"$SYNC_BACKUP_ROOT/apply.lock"
    flock --nonblock 9
    export SYNC_BACKUP_DIR
    SYNC_BACKUP_DIR="$(mktemp -d "$SYNC_BACKUP_ROOT/apply.XXXXXXXX")"
    npm run sync:validate -- --report "$SYNC_BACKUP_DIR/preflight.md"
    node - "$SYNC_BACKUP_DIR/database.dump" <<'NODE'
const { spawnSync } = require('node:child_process');
const url = new URL(process.env.DATABASE_URL);
if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.hostname || !url.pathname.slice(1)) {
  throw new Error('Use a direct PostgreSQL URL for backup and apply');
}
const env = {
  ...process.env,
  PGSERVICE: '',
  PGHOSTADDR: '',
  PGHOST: url.hostname.replace(/^\[|\]$/g, ''),
  PGPORT: url.port || '5432',
  PGDATABASE: decodeURIComponent(url.pathname.slice(1)),
  PGUSER: decodeURIComponent(url.username),
  PGPASSWORD: decodeURIComponent(url.password),
  PGSSLMODE: url.searchParams.get('sslmode') || 'prefer',
  PGCONNECT_TIMEOUT: '10',
};
const result = spawnSync('pg_dump', ['--no-password', '--format=custom', '--file', process.argv[2]], {
  env, stdio: 'inherit', timeout: 300000,
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
NODE
    pg_restore --list "$SYNC_BACKUP_DIR/database.dump" >/dev/null
    ./node_modules/.bin/ts-node scripts/sync/syncEngine.ts --sync --download-assets --report "$SYNC_BACKUP_DIR/applied.md"
    rollback_current() {
      shopt -s nullglob
      snapshots=("$SYNC_BACKUP_DIR"/snapshot_before_sync_*.json)
      if (( ${#snapshots[@]} == 1 )); then
        npm run sync:rollback -- "${snapshots[0]}"
      fi
      exit 1
    }
    if ! npm run sync:validate -- --report "$SYNC_BACKUP_DIR/post-apply.md" ||
       ! npm run sync:assets; then
      rollback_current
    fi
    if ! node -e '
      const fs = require("node:fs");
      const path = require("node:path");
      const root = process.env.SYNC_BACKUP_DIR;
      const snapshot = fs.readdirSync(root).find(name => name.startsWith("snapshot_before_sync_"));
      const paths = ["/", "/characters", "/weapons", "/artifacts", "/materials", "/tierlist", "/teams", "/banners"];
      const details = { character: "/characters", weapon: "/weapons", artifactSet: "/artifacts" };
      if (snapshot) {
        const {entries} = JSON.parse(fs.readFileSync(path.join(root, snapshot), "utf8"));
        for (const entry of entries) {
          if (details[entry.kind]) paths.push(`${details[entry.kind]}/${encodeURIComponent(entry.id)}`);
        }
      }
      fetch(process.env.FRONTEND_REVALIDATE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({secret: process.env.REVALIDATE_SECRET, paths}),
        signal: AbortSignal.timeout(15000),
      }).then(res => {
        if (!res.ok) throw new Error(`Revalidation HTTP ${res.status}`);
      }).catch(error => { console.error(error); process.exitCode = 1; });
    '; then
      rollback_current
    fi
    ;;
  *)
    echo "Usage: sync.sh {check|assets|apply}" >&2
    exit 2
    ;;
esac
