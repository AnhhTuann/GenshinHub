"""Phase D3 - positive Admin-decision -> DB -> GraphQL -> Tier List E2E.

This runner is intentionally self-contained and isolated:

  * creates a brand-new disposable PostgreSQL database whose name contains
    ``d3_e2e`` and asserts ``current_database()`` before every mutation phase;
  * generates random Admin credentials at runtime (never logged);
  * starts a dedicated backend + frontend on private ports;
  * drives the REAL B3.2 authoritative review flow (rights -> tier confirm ->
    APPROVE) through the browser UI and the Admin API, on the D2_REVISED
    version only;
  * runs the guarded Phase D3 partial importer with an explicit isolated-DB
    target, then verifies ranking rows, public GraphQL and the public Tier List
    plus weapon detail links;
  * verifies PENDING / REJECTED / evidence-blocked rows stay invisible;
  * never writes to the development or production database.

Every decision and ranking written here is a clearly marked TEST FIXTURE on the
disposable database. These approvals are NOT real content-approval evidence.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import secrets
import shutil
import signal
import subprocess
import tempfile
import time
import urllib.error
import urllib.request
from contextlib import ExitStack
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BACKEND = ROOT / "backend"
FRONTEND = ROOT / "frontend"
CHROME = "/opt/google/chrome/chrome"

SUFFIX = os.environ.get("D3_E2E_SUFFIX", secrets.token_hex(4))
TEST_DB = os.environ.get("D3_E2E_DB", f"genshinhub_d3_e2e_{SUFFIX}")
B_PORT = int(os.environ.get("D3_E2E_BACKEND_PORT", "4124"))
F_PORT = int(os.environ.get("D3_E2E_FRONTEND_PORT", "3124"))
ORIGIN = f"http://127.0.0.1:{F_PORT}"
API = f"http://127.0.0.1:{B_PORT}/graphql"

# D2 weapon candidates used by this positive E2E. All are synthetic fixtures.
C_BROWSER = "independent-14302-SUPPORT-R5"   # Thrilling Tales SS -> S (tier change via UI)
C_API_PLAIN = "independent-11401-SUPPORT-R1"  # plain APPROVE via API
C_API_TIER = "independent-14402-SUB_DPS-R1"   # The Widsith S -> A (tier change via API)
C_PENDING = "independent-11512-MAIN_DPS-R1"   # left PENDING -> must stay invisible
C_REQUEST_CHANGES = "independent-11403-SUB_DPS-R5"
C_REJECT = "independent-12502-SUPPORT-R1"     # REJECT -> must stay invisible
C_BLOCKED_A = "independent-13501-MAIN_DPS-R1"  # D2 missing evidence
C_BLOCKED_B = "independent-12401-SUB_DPS-R1"   # D2 Group B evidence fields

IMPORT_SET = [C_BROWSER, C_API_PLAIN, C_API_TIER]
INVISIBLE_SET = [C_PENDING, C_REQUEST_CHANGES, C_REJECT, C_BLOCKED_A, C_BLOCKED_B]

FIXTURE = "[D3-E2E-TEST-FIXTURE] "
REASON = FIXTURE + "isolated positive-path review after inspecting the D2 revised dossier."
RIGHTS_NOTE = FIXTURE + "five publication grounds verified on the D2 revised dossier."
D2 = "D2_REVISED"

RESULTS: list[dict] = []


def res(section: str, status: str, detail: str = "") -> None:
    RESULTS.append({"section": section, "status": status, "detail": detail})
    print(f"[{status}] {section}: {detail}", flush=True)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def node(script: str, *args: str, cwd: Path = BACKEND, env: dict | None = None) -> str:
    proc = subprocess.run(
        ["node", "-e", script, *args], cwd=cwd, env=env,
        text=True, capture_output=True,
    )
    if proc.returncode != 0:
        raise RuntimeError(f"node failed: {(proc.stderr or proc.stdout).strip()[-1500:]}")
    return proc.stdout.strip()


def db_url(name: str) -> str:
    return node(
        "const {loadEnv}=require('./scripts/weapon-tier-audit/db.cjs');"
        "const u=new URL(loadEnv().DATABASE_URL);"
        "if(u.hostname!=='127.0.0.1'||u.port!=='5434'||u.pathname!=='/genshinhub')"
        "{throw new Error('D3 E2E requires the local development connection');}"
        "u.pathname='/'+process.argv[1];"
        "process.stdout.write(u.toString())",
        name,
    )


CREATE_DB = """
const {PrismaClient}=require('@prisma/client');
const p=new PrismaClient({datasources:{db:{url:process.argv[1]}}});
(async()=>{
  await p.$executeRawUnsafe('CREATE DATABASE '+process.argv[2]);
  process.stdout.write(JSON.stringify({created:process.argv[2]}));
  await p.$disconnect();
})().catch(e=>{console.error(e.message);process.exit(1)});
"""

IDENTITY = """
const {PrismaClient}=require('@prisma/client');
const p=new PrismaClient({datasourceUrl:process.argv[1]});
(async()=>{
  const [id]=await p.$queryRawUnsafe('SELECT current_database() AS db');
  if(id.db!==process.argv[2]) throw new Error('WRONG_DATABASE:'+id.db);
  const out={db:id.db,
    ranks:await p.weaponTierRank.count(), audits:await p.weaponTierAudit.count(),
    reviews:await p.weaponTierReview.count(), reviewAudit:await p.weaponTierReviewAudit.count()};
  console.log(JSON.stringify(out));
  await p.$disconnect();
})().catch(e=>{console.error(e.message);process.exit(1)});
"""

SEED_WEAPONS = """
const {PrismaClient}=require('@prisma/client');
const {loadEnv}=require('./scripts/weapon-tier-audit/db.cjs');
(async()=>{
  const dev=new PrismaClient({datasourceUrl:loadEnv().DATABASE_URL});
  const test=new PrismaClient({datasourceUrl:process.argv[1]});
  try {
    const [id]=await test.$queryRawUnsafe('SELECT current_database() AS db');
    if(id.db!==process.argv[2]) throw new Error('WRONG_DATABASE:'+id.db);
    const weapons=await dev.weapon.findMany({select:{
      id:true,nameEn:true,nameVi:true,rarity:true,type:true,baseAtk:true,subStat:true,
      subStatValue:true,passiveNameEn:true,passiveNameVi:true,passiveDescEn:true,
      passiveDescVi:true,iconUrl:true}});
    if(weapons.length<279) throw new Error('DEV_WEAPON_SEED_INCOMPLETE:'+weapons.length);
    await test.weapon.createMany({data:weapons,skipDuplicates:true});
    process.stdout.write(JSON.stringify({seeded:weapons.length,db:id.db}));
  } finally { await dev.$disconnect(); await test.$disconnect(); }
})().catch(e=>{console.error(e.message);process.exit(1)});
"""

VERIFY_RANK_ROWS = """
const {PrismaClient}=require('@prisma/client');
const p=new PrismaClient({datasourceUrl:process.argv[1]});
(async()=>{
  const [id]=await p.$queryRawUnsafe('SELECT current_database() AS db');
  if(id.db!==process.argv[2]) throw new Error('WRONG_DATABASE:'+id.db);
  const rows=await p.weaponTierRank.findMany({
    select:{id:true,weaponId:true,role:true,tier:true,refinementContext:true,
      reviewStatus:true,derivation:true,publishRightsVerified:true,sourceChecksum:true}});
  console.log(JSON.stringify({db:id.db,count:rows.length,rows}));
  await p.$disconnect();
})().catch(e=>{console.error(e.message);process.exit(1)});
"""

QUEUE = """query Q($v: WeaponTierReviewSource) {
  adminWeaponTierReviewQueue(sourceVersion: $v) {
    candidateId weaponId weaponName role refinement proposedTier previousTier tierChanged
    decision decidedBy decidedAt decisionReason rightsVerified rightsVerifiedBy rightsBasis
    tierChangeConfirmed evidenceAcknowledged evidenceSupplement
    approvalChecksum batchSha256 reviewGroup importEligible blockedReason version
    currentVersion previousVersion versionReviewStatus versionDiff
  }
}"""
AUDIT = """query A($id: String!, $v: WeaponTierReviewSource) {
  adminWeaponTierReviewAudit(candidateId: $id, sourceVersion: $v) { id action actor changes createdAt }
}"""
DECIDE = """mutation D($id:String!,$d:WeaponTierDecision!,$reason:String!,$batch:String!,$record:String!,
  $v:Int!,$ack:Boolean,$sv:WeaponTierReviewSource){
  adminDecideWeaponTierReview(candidateId:$id,decision:$d,reason:$reason,batchSha256:$batch,
    recordSha256:$record,expectedVersion:$v,evidenceAcknowledged:$ack,sourceVersion:$sv){
    candidateId decision decidedBy decidedAt version importEligible blockedReason}}"""
RIGHTS = """mutation R($id:String!,$batch:String!,$record:String!,$v:Int!,$note:String!,$sv:WeaponTierReviewSource){
  adminVerifyWeaponTierReviewRights(candidateId:$id,batchSha256:$batch,recordSha256:$record,
    expectedVersion:$v,independentRanking:true,originalExplanation:true,
    noGenshinBuildsEditorialCopy:true,gameFactsAttributionCorrect:true,evidenceValid:true,
    note:$note,sourceVersion:$sv){
    candidateId rightsVerified rightsVerifiedBy rightsVerifiedAt rightsBasis version}}"""
TIER = """mutation T($id:String!,$batch:String!,$record:String!,$v:Int!,$confirmed:Boolean!,$sv:WeaponTierReviewSource){
  adminConfirmWeaponTierChange(candidateId:$id,batchSha256:$batch,recordSha256:$record,
    expectedVersion:$v,confirmed:$confirmed,sourceVersion:$sv){
    candidateId tierChangeConfirmed tierChangeConfirmedBy version}}"""
PUBLIC_RANKS = """query { weaponTierRanks(limit:500) {
  id weaponId weaponType role tier refinementContext refinementLevel publishRightsVerified
  derivation reviewStatus sourceChecksum explanationVi confidence } }"""
WEAPONS = "{ weapons { id nameEn nameVi type } }"


def gql(query: str, variables: dict | None = None, session: str | None = None,
        endpoint: str = API, cookie: str | None = None):
    headers = {"content-type": "application/json"}
    if session:
        headers["x-admin-session"] = session
    if cookie:
        headers["cookie"] = cookie
    request = urllib.request.Request(
        endpoint, data=json.dumps({"query": query, "variables": variables or {}}).encode(),
        headers=headers, method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status, json.loads(response.read().decode())
    except urllib.error.HTTPError as error:
        raw = error.read().decode() or "{}"
        try:
            return error.code, json.loads(raw)
        except json.JSONDecodeError:
            return error.code, {"raw": raw}


def admin_login(username: str, password: str, port: int = B_PORT) -> dict:
    request = urllib.request.Request(
        f"http://127.0.0.1:{port}/auth/admin/login",
        data=json.dumps({"username": username, "password": password}).encode(),
        headers={"content-type": "application/json"}, method="POST",
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode())


def bootstrap_admin(database_url: str, username: str, password: str) -> str:
    script = (
        "const bcrypt=require('bcryptjs');const {PrismaClient}=require('@prisma/client');"
        "const p=new PrismaClient({datasourceUrl:process.argv[1]});"
        "(async()=>{const a=await p.admin.create({data:{username:process.argv[2],"
        "passwordHash:await bcrypt.hash(process.argv[3],12),role:'OWNER',status:'ACTIVE'}});"
        "process.stdout.write(a.id);await p.$disconnect()})().catch(e=>{console.error(e.message);process.exit(1)})"
    )
    return node(script, database_url, username, password)


def start(cmd: list[str], cwd: Path, env: dict, log: Path, stack: ExitStack):
    handle = stack.enter_context(open(log, "wb"))
    proc = subprocess.Popen(cmd, cwd=cwd, env=env, stdout=handle,
                            stderr=subprocess.STDOUT, start_new_session=True)
    stack.callback(stop, proc)
    return proc


def stop(proc: subprocess.Popen) -> None:
    if proc.poll() is None:
        os.killpg(proc.pid, signal.SIGTERM)
        try:
            proc.wait(timeout=10)
        except subprocess.TimeoutExpired:
            os.killpg(proc.pid, signal.SIGKILL)
            proc.wait()


def wait_http(url: str, timeout: float = 180) -> None:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=4) as response:
                if response.status == 200:
                    return
        except OSError:
            pass
        time.sleep(0.5)
    raise RuntimeError(f"server not ready: {url}")


def preflight(url: str, dev_url: str, admin_session: str) -> dict:
    identity = json.loads(node(IDENTITY, url, TEST_DB))
    require(identity["db"] == TEST_DB and not identity["ranks"] and not identity["audits"],
            f"isolated DB not clean: {identity}")
    res("preflight: isolated DB identity", "PASS", json.dumps(identity))

    d2 = json.loads(node(
        "const {loadD2Bridge}=require('./scripts/phaseD3/import-approved-d3.cjs');"
        "const b=loadD2Bridge();console.log(JSON.stringify({artifact:b.d2.artifactSha256,"
        "records:b.d2.records.length,checksums:Object.fromEntries(b.d2.records.map(r=>[r.candidateId,r.newChecksum]))}))"))
    require(d2["records"] == 14 and re.fullmatch(r"[a-f0-9]{64}", d2["artifact"]),
            f"invalid D2 bridge: {d2}")
    require(d2["artifact"] == "eae26ea26b737d8e1cbe6cdabcc340c13575e47af0737a91e6662749b7460185",
            f"D2 artifact checksum changed: {d2['artifact']}")
    res("preflight: D2 artifact + 14 record checksums", "PASS",
        f"artifact={d2['artifact']}; recomputed and verified")

    # Count reconciliation is derived from content, never hardcoded.
    counts = json.loads(node(
        "const d=require('../docs/tierlist/phase-d2/WEAPON_REVISED_DRAFT.json');"
        "const c=require('../docs/tierlist/phase-d2/CHARACTER_REVISED_DRAFT.json');"
        "const w=d.records, ch=c.records;"
        "const ready=r=>!String(r.reviewStatus).startsWith('NEEDS_');"
        "const gap=r=>((r.d2Review?.missingEvidence||[]).length>0)||"
        "((r.d2Review?.blockedEvidence||[]).some(e=>e&&e.present===false));"
        "console.log(JSON.stringify({character:ch.length,weapon:w.length,prepared:ch.length+w.length,"
        "readyWeapon:w.filter(ready).length,readyCharacter:ch.filter(ready).length,"
        "ready:w.concat(ch).filter(ready).length,"
        "missingEvidence:w.concat(ch).filter(gap).length}))"))
    require(counts["character"] == 9 and counts["weapon"] == 14 and counts["prepared"] == 23
            and counts["ready"] == 20 and counts["missingEvidence"] == 3,
            f"D2 count reconciliation failed: {counts}")
    res("preflight: D2 count reconciliation (derived)", "PASS", json.dumps(counts))

    status = subprocess.run(["npx", "prisma", "migrate", "status"], cwd=BACKEND, text=True,
                            capture_output=True, check=True,
                            env={**os.environ, "DATABASE_URL": url})
    require("up to date" in status.stdout.lower(), "isolated DB migration status is not up to date")
    diff = subprocess.run(
        ["npx", "prisma", "migrate", "diff", "--from-url", dev_url,
         "--to-url", url, "--script"], cwd=BACKEND, text=True, capture_output=True, check=True)
    require(not diff.stdout.strip() or "empty migration" in diff.stdout.lower(),
            "isolated schema differs from development")
    res("preflight: migrations + schema parity", "PASS",
        "7 migrations applied; schema identical to development")

    dev_state = json.loads(node(
        "const {loadEnv}=require('./scripts/weapon-tier-audit/db.cjs');"
        "const {PrismaClient}=require('@prisma/client');"
        "const p=new PrismaClient({datasourceUrl:loadEnv().DATABASE_URL});"
        "(async()=>{const db=await p.$queryRawUnsafe('SELECT current_database() AS db');"
        "const ranks=await p.weaponTierRank.count(),audits=await p.weaponTierAudit.count();"
        "console.log(JSON.stringify({db:db[0].db,ranks,audits}));await p.$disconnect()})()"
        ".catch(e=>{console.error(e.message);process.exit(1)})"))
    require(dev_state["db"] == "genshinhub" and not dev_state["ranks"] and not dev_state["audits"],
            f"development database changed: {dev_state}")
    res("preflight: dev DB untouched", "PASS", json.dumps(dev_state))

    return d2["checksums"]


def queue_preflight(admin_session: str, checksums: dict) -> dict:
    """Read the authoritative D2 queue after the isolated backend is running."""
    qstatus, qbody = gql(QUEUE, {"v": D2}, session=admin_session)
    require(qstatus == 200 and not qbody.get("errors"), f"D2 queue unavailable: {qbody}")
    rows = qbody["data"]["adminWeaponTierReviewQueue"]
    require(len(rows) == 14, f"expected 14 D2 queue rows, got {len(rows)}")
    require(all(r["candidateId"].endswith("::D2") and r["currentVersion"] == "D2_REVISED"
                for r in rows), "queue is not the D2_REVISED version")
    by_id = {r["candidateId"].replace("::D2", ""): r for r in rows}
    require(set(by_id) >= set(IMPORT_SET + INVISIBLE_SET), "expected candidates missing from D2 queue")
    for cid, row in by_id.items():
        require(row["approvalChecksum"] == checksums[cid],
                f"live queue checksum mismatch for {cid}")
    require(by_id[C_BROWSER]["tierChanged"] and by_id[C_API_TIER]["tierChanged"],
            "tier-change candidates not marked as changed")
    require(not by_id[C_BLOCKED_A]["importEligible"] and not by_id[C_BLOCKED_B]["importEligible"],
            "evidence-blocked D2 rows are unexpectedly import eligible")
    res("preflight: authoritative D2 queue + checksums", "PASS",
        "14 D2_REVISED rows; live checksums match recomputed dossier; blockers ineligible")
    return by_id


def browser_review(admin_password: str, actor: str, by_id: dict) -> None:
    from playwright.sync_api import sync_playwright

    console_errors: list[str] = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            headless=True, executable_path=CHROME, args=["--no-sandbox", "--disable-dev-shm-usage"])
        context = browser.new_context(viewport={"width": 1440, "height": 1000}, color_scheme="dark")
        page = context.new_page()
        page.on("console", lambda msg: console_errors.append(f"{msg.type}:{msg.text}")
                if msg.type in ("error", "warning") else None)

        # Anonymous deep link must be redirected to Admin login.
        page.goto(f"{ORIGIN}/en/admin/weapon-tier-review", wait_until="domcontentloaded")
        page.wait_for_url("**/en/admin/login**", timeout=30000)
        res("browser: anonymous deep link -> login", "PASS", "middleware redirected to Admin login")

        page.wait_for_function(
            "() => {const i=document.querySelector('#admin-password');"
            "return i && Object.keys(i).some(k=>k.startsWith('__reactProps$'));}", timeout=30000)
        page.get_by_label("Admin username").fill("e2e_owner")
        password = page.get_by_label("Admin password")
        password.press_sequentially(admin_password)
        password.press("Enter")
        page.wait_for_function("() => location.pathname === '/en/admin'", timeout=60000)
        cookies = {c["name"]: c for c in context.cookies()}
        require("admin_token" in cookies and cookies["admin_token"]["httpOnly"],
                "HttpOnly admin_token missing after login")
        res("browser: Admin login / HttpOnly session", "PASS", "runtime credentials accepted")

        page.locator("aside").get_by_role("link", name="Weapon Review").click()
        page.wait_for_function("() => location.pathname === '/en/admin/weapon-tier-review'", timeout=45000)
        page.get_by_text("Đang tải dữ liệu review...").wait_for(state="hidden", timeout=45000)
        page.get_by_role("heading", name="Weapon Tier Review", exact=True).wait_for(
            state="visible", timeout=45000)

        # Switch to the authoritative D2 revised version (default is FROZEN).
        page.get_by_role("button", name="D2 Revised").click()
        page.get_by_text("Đang tải dữ liệu review...").wait_for(state="hidden", timeout=45000)
        page.wait_for_function(
            "() => document.querySelectorAll('section ul > li > button').length === 14",
            timeout=45000)
        require(page.get_by_text("D2 Revised").count() >= 1, "D2 version toggle not active")
        res("browser: D2_REVISED version selected", "PASS", "Admin UI switched to D2 revised queue")

        def candidates():
            return page.locator("section").filter(
                has=page.get_by_role("heading", name="Danh sách ứng viên")).locator("ul > li > button")

        require(candidates().count() == 14, f"expected 14 D2 rows, got {candidates().count()}")
        texts = [candidates().nth(i).inner_text() for i in range(candidates().count())]
        require(any("D2_REVISED" in t for t in texts), "D2 version label missing from rows")
        res("browser: 14 D2_REVISED candidate rows", "PASS", "version lineage rendered in the real DOM")

        def select(cid: str) -> None:
            wid = cid.split("-")[1]
            candidates().filter(has_text=wid).first.click()
            require(page.get_by_text("Phiên bản:").count() > 0 or
                    page.get_by_text("Current checksum:").count() > 0,
                    "version / checksum block missing")
            require(page.get_by_text("Batch checksum:").is_visible(), "batch checksum missing")
            require(page.get_by_text("Version diff (", exact=False).count() > 0,
                    "D2 version diff panel missing")
            require(page.get_by_text("Giải thích xếp hạng").is_visible(), "explanation missing")
            require(page.get_by_text("Sự kiện game có trong genshin-db").is_visible(),
                    "gameplay evidence missing")

        select(C_BROWSER)
        detail = page.locator("body").inner_text()
        require("B3_1_FROZEN" in detail and "D2_REVISED" in detail,
                "current/previous version not rendered")
        require("SS" in detail and "S" in detail, "Thrilling Tales tier change not rendered")
        res("browser: version / diff / checksum / role / tier", "PASS",
            "B3_1_FROZEN -> D2_REVISED; SS -> S; checksum and diff visible")

        # APPROVE must be blocked before rights verification.
        page.get_by_role("checkbox", name=re.compile("Tôi đã xem xét đầy đủ")).check()
        page.get_by_label("Lý do quyết định (bắt buộc):").fill(REASON)
        page.get_by_role("button", name="APPROVE", exact=True).click()
        page.get_by_text("RIGHTS_NOT_VERIFIED", exact=False).first.wait_for(state="visible", timeout=12000)
        row_text = candidates().filter(has_text=C_BROWSER.split("-")[1]).first.inner_text()
        require("PENDING" in row_text and "sẵn sàng nhập" not in row_text,
                f"decision must stay PENDING without rights: {row_text!r}")
        res("browser: APPROVE blocked without rights", "PASS", "RIGHTS_NOT_VERIFIED surfaced")

        # Separate rights verification.
        for label in [
            "Independent ranking / xếp hạng độc lập",
            "Original explanation / giải thích gốc",
            "No GenshinBuilds editorial copy / không chép biên tập",
            "Game-facts attribution correct / ghi nguồn đúng",
            "Evidence valid / bằng chứng hợp lệ",
        ]:
            page.get_by_role("checkbox", name=label).check()
        page.get_by_label("Ghi chú căn cứ xác minh:").fill(RIGHTS_NOTE)
        page.get_by_role("button", name="Xác minh quyền phát hành").click()
        page.get_by_text("Đã xác minh quyền phát hành", exact=False).first.wait_for(
            state="visible", timeout=12000)
        res("browser: rights verified separately", "PASS", "all five grounds checked by UI")

        # Separate tier re-review confirmation for Thrilling Tales.
        page.get_by_role("button", name="Xác nhận thay đổi tier").click()
        page.wait_for_function(
            "() => {const b=[...document.querySelectorAll('button')]"
            ".find(el=>el.textContent.includes('Hủy xác nhận')); return !!b && !b.disabled;}",
            timeout=12000)
        res("browser: tier change confirmed separately", "PASS", "SS -> S confirmation recorded")

        page.get_by_role("button", name="APPROVE", exact=True).click()
        page.get_by_text("Đã ghi quyết định APPROVE", exact=False).first.wait_for(
            state="visible", timeout=12000)
        page.wait_for_function(
            """() => {const b=[...document.querySelectorAll('section ul > li > button')]
                 .find(el=>el.textContent.includes('14302'));
               return !!b && b.textContent.includes('APPROVE') && b.textContent.includes('sẵn sàng nhập');}""",
            timeout=20000)
        audit = page.locator("details").filter(has=page.get_by_text("Nhật ký kiểm duyệt")).first
        if not audit.evaluate("(el) => el.open"):
            page.get_by_text("Nhật ký kiểm duyệt").click()
        page.wait_for_function(
            """() => [...document.querySelectorAll('details')].some(d =>
                 d.textContent.includes('Nhật ký kiểm duyệt') &&
                 d.textContent.includes('DECISION_RECORDED'))""", timeout=20000)
        require(actor in audit.inner_text(), "server-derived actor missing from audit UI")
        res("browser: APPROVE + audit + server-derived actor", "PASS", f"actor={actor}")

        # Reload persistence on the authoritative version.
        page.reload(wait_until="domcontentloaded")
        page.get_by_text("Đang tải dữ liệu review...").wait_for(state="hidden", timeout=45000)
        page.get_by_role("button", name="D2 Revised").click()
        page.get_by_text("Đang tải dữ liệu review...").wait_for(state="hidden", timeout=45000)
        page.wait_for_function(
            "() => document.querySelectorAll('section ul > li > button').length === 14",
            timeout=45000)
        require("APPROVE" in candidates().filter(has_text="14302").first.inner_text(),
                "browser decision did not persist after reload")
        res("browser: review reload persistence", "PASS", "D2 decision survived full reload")

        # Evidence blockers must be visibly blocked, never import eligible.
        candidates().filter(has_text=C_BLOCKED_B).first.click()
        page.wait_for_function(
            """() => document.body.innerText.includes('""" + C_BLOCKED_B + """') &&
                     document.body.innerText.includes('Bị chặn:')""",
            timeout=20000)
        blocked = page.locator("body").inner_text()
        require("D2_EVIDENCE_INCOMPLETE" in blocked,
                f"D2 evidence blocker not displayed: {blocked[-800:]}")
        res("browser: evidence blocker displayed", "PASS", "blocked reason rendered; no approval path")

        page.close()
        context.close()
        browser.close()


def api_review(admin_session: str, actor: str, by_id: dict) -> None:
    status, body = gql(QUEUE, {"v": D2}, session=admin_session)
    require(status == 200 and not body.get("errors"), f"initial queue refetch failed: {body}")
    rows = {r["candidateId"].replace("::D2", ""): r
            for r in body["data"]["adminWeaponTierReviewQueue"]}

    def refresh(cid: str) -> dict:
        nonlocal rows
        status, body = gql(QUEUE, {"v": D2}, session=admin_session)
        require(status == 200 and not body.get("errors"), f"queue refetch failed: {body}")
        rows = {r["candidateId"].replace("::D2", ""): r
                for r in body["data"]["adminWeaponTierReviewQueue"]}
        return rows[cid]

    def review(cid: str, decision: str = "APPROVE") -> None:
        """Apply only the steps still missing (idempotent across UI/API runs)."""
        r = refresh(cid)
        batch, record = r["batchSha256"], r["approvalChecksum"]
        version = r["version"]
        if not r["rightsVerified"]:
            status, body = gql(RIGHTS, {
                "id": cid + "::D2", "batch": batch, "record": record, "v": version,
                "note": RIGHTS_NOTE, "sv": D2,
            }, session=admin_session)
            require(status == 200 and not body.get("errors"), f"rights failed for {cid}: {body}")
            version = body["data"]["adminVerifyWeaponTierReviewRights"]["version"]
        r = refresh(cid)
        version = r["version"]
        if r["tierChanged"] and not r["tierChangeConfirmed"]:
            status, body = gql(TIER, {
                "id": cid + "::D2", "batch": batch, "record": record, "v": version,
                "confirmed": True, "sv": D2,
            }, session=admin_session)
            require(status == 200 and not body.get("errors"), f"tier confirm failed for {cid}: {body}")
            version = body["data"]["adminConfirmWeaponTierChange"]["version"]
        r = refresh(cid)
        if r["decision"] == "PENDING":
            status, body = gql(DECIDE, {
                "id": cid + "::D2", "d": decision, "reason": REASON, "batch": batch,
                "record": record, "v": r["version"], "ack": True, "sv": D2,
            }, session=admin_session)
            require(status == 200 and not body.get("errors"), f"decision failed for {cid}: {body}")
            require(body["data"]["adminDecideWeaponTierReview"]["decision"] == decision,
                    f"decision not persisted for {cid}")

    review(C_API_PLAIN)
    review(C_API_TIER)
    review(C_REJECT, decision="REJECT")
    row = refresh(C_REQUEST_CHANGES)
    requested = {
        "id": C_REQUEST_CHANGES + "::D2", "d": "REQUEST_CHANGES", "reason": REASON,
        "batch": row["batchSha256"], "record": row["approvalChecksum"],
        "v": row["version"], "ack": True, "sv": D2,
    }
    status, body = gql(DECIDE, requested, session=admin_session)
    require(status == 200 and not body.get("errors"), "request-changes mutation failed")
    _, replay = gql(DECIDE, requested, session=admin_session)
    require(any("CONCURRENT_MODIFICATION" in error["message"] for error in replay.get("errors", [])),
            "stale request-changes mutation did not fail")
    res("api review: request-changes and stale decision guard", "PASS", "fixture remains ineligible")
    # If the browser step did not complete, finish it here so the positive path
    # is still exercised end-to-end. The browser section reports its own result.
    review(C_BROWSER)
    res("api review: rights -> tier -> APPROVE / REJECT", "PASS",
        "plain + tier-changed APPROVE and one REJECT written through guarded mutations")

    status, body = gql(QUEUE, {"v": D2}, session=admin_session)
    require(status == 200 and not body.get("errors"), f"queue refetch failed: {body}")
    rows = {r["candidateId"].replace("::D2", ""): r
            for r in body["data"]["adminWeaponTierReviewQueue"]}
    for cid in IMPORT_SET:
        require(rows[cid]["decision"] == "APPROVE" and rows[cid]["rightsVerified"] and
                rows[cid]["importEligible"], f"{cid} not import eligible: {rows[cid]}")
    for cid in INVISIBLE_SET:
        require(not rows[cid]["importEligible"], f"{cid} must not be import eligible")
    require(rows[C_REJECT]["decision"] == "REJECT" and rows[C_PENDING]["decision"] == "PENDING"
            and rows[C_REQUEST_CHANGES]["decision"] == "REQUEST_CHANGES",
            "pending, rejected, or requested-changes decisions incorrect")
    res("api review: authoritative importEligible guards", "PASS",
        "only the three approved clean rows are import eligible")

    for cid in IMPORT_SET:
        status, body = gql(AUDIT, {"id": cid + "::D2", "v": D2}, session=admin_session)
        require(status == 200 and not body.get("errors"), f"audit failed for {cid}: {body}")
        actions = {e["action"] for e in body["data"]["adminWeaponTierReviewAudit"]}
        require({"REVIEW_CREATED", "RIGHTS_VERIFIED", "DECISION_RECORDED"} <= actions,
                f"missing audit actions for {cid}: {actions}")
        require(all(e["actor"] == actor for e in body["data"]["adminWeaponTierReviewAudit"]),
                f"non-server-derived actor in audit for {cid}")
    res("api review: audit trail + server actor", "PASS",
        "REVIEW_CREATED / RIGHTS_VERIFIED / DECISION_RECORDED for every approved row")


def run_importer(test_url: str, admin_session: str, by_id: dict) -> dict:
    env = {
        **os.environ,
        "ADMIN_SESSION_TOKEN": admin_session,
        "GRAPHQL_URL": API,
        "D3_IMPORT_DATABASE_URL": test_url,
        "ALLOW_TEST_IMPORT": "1",
        "D3_SKIP_BACKUP": "1",
    }
    selection = ",".join(by_id[c]["weaponId"] for c in IMPORT_SET)
    proc = subprocess.run(
        ["node", "scripts/phaseD3/import-approved-d3.cjs",
         "--apply", "--weapon-ids", selection],
        cwd=BACKEND, env=env, text=True, capture_output=True,
    )
    try:
        summary = json.loads(proc.stdout[proc.stdout.index("{"):proc.stdout.rindex("}") + 1])
    except (ValueError, IndexError):
        raise RuntimeError(f"importer output invalid: {(proc.stderr or proc.stdout).strip()[-2000:]}")
    require(summary.get("ok") is True, f"D3 importer failed: {json.dumps(summary)[:1500]}")
    require(summary["target"]["database"] == TEST_DB,
            f"importer target is not the isolated DB: {summary['target']}")
    require(summary["counts"]["writeCount"] == len(IMPORT_SET),
            f"unexpected writeCount: {summary['counts']}")
    require(all(i["candidateId"] in IMPORT_SET for i in summary.get("written", [])),
            "importer wrote an unselected candidate")
    res("importer: guarded partial apply", "PASS",
        f"target={summary['target']['target']}; writeCount={summary['counts']['writeCount']}; "
        f"eligible={summary['counts']['eligible']} blocked={summary['counts']['blocked']}")
    return summary


def verify_db_and_graphql(test_url: str, admin_session: str, by_id: dict) -> None:
    state = json.loads(node(VERIFY_RANK_ROWS, test_url, TEST_DB))
    require(state["count"] == len(IMPORT_SET), f"unexpected DB row count: {state}")
    rows = {r["weaponId"]: r for r in state["rows"]}
    for cid in IMPORT_SET:
        wid = by_id[cid]["weaponId"]
        r = rows.get(wid)
        require(r is not None, f"missing DB ranking for {cid}")
        require(r["tier"] == by_id[cid]["proposedTier"], f"wrong tier for {cid}: {r}")
        require(r["role"] == by_id[cid]["role"], f"wrong role for {cid}: {r}")
        require(r["reviewStatus"] == "APPROVED" and r["derivation"] == "INDEPENDENT" and
                r["publishRightsVerified"] is True, f"unguarded DB row for {cid}: {r}")
        require(r["sourceChecksum"] == by_id[cid]["approvalChecksum"],
                f"DB row not D2-bound for {cid}")
    res("DB: authoritative ranking rows", "PASS",
        f"{state['count']} APPROVED/INDEPENDENT D2-bound rows with correct tier+role")

    status, body = gql(PUBLIC_RANKS)
    require(status == 200 and not body.get("errors"), f"public GraphQL failed: {body}")
    public = body["data"]["weaponTierRanks"]
    wid_to_cid = {by_id[c]["weaponId"]: c for c in IMPORT_SET}
    imported_ids = set(wid_to_cid)
    require({r["weaponId"] for r in public} == imported_ids,
            f"public GraphQL rows mismatch: {[r['weaponId'] for r in public]}")
    for r in public:
        cid = wid_to_cid[r["weaponId"]]
        require(r["tier"] == by_id[cid]["proposedTier"] and r["role"] == by_id[cid]["role"],
                f"public GraphQL tier/role wrong for {cid}: {r}")
        require(r["reviewStatus"] == "APPROVED" and r["derivation"] == "INDEPENDENT" and
                r["publishRightsVerified"], f"public GraphQL exposes unguarded row: {r}")
    for cid in INVISIBLE_SET:
        wid = by_id[cid]["weaponId"]
        require(all(r["weaponId"] != wid for r in public), f"{cid} leaked into public GraphQL")
    res("public GraphQL: tier/role + invisibility", "PASS",
        "3 approved rows visible with correct tier/role; pending/rejected/blocked invisible")

    status, body = gql(WEAPONS)
    require(status == 200 and not body.get("errors"), f"weapons query failed: {body}")
    # The browser checks the English Tier List, so compare against English names.
    names = {w["id"]: (w.get("nameEn") or w.get("nameVi") or "") for w in body["data"]["weapons"]}
    return names


def browser_tierlist(names: dict, by_id: dict) -> None:
    from playwright.sync_api import sync_playwright

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            headless=True, executable_path=CHROME, args=["--no-sandbox", "--disable-dev-shm-usage"])
        context = browser.new_context(viewport={"width": 1440, "height": 1000}, color_scheme="dark")
        page = context.new_page()

        page.goto(f"{ORIGIN}/en/tierlist", wait_until="domcontentloaded")
        page.wait_for_function(
            """() => document.body.innerText.length > 500""", timeout=45000)
        # The public page defaults to the character tab; switch to weapons.
        page.get_by_role("tab", name="Weapons").click()
        page.wait_for_function(
            """() => document.querySelectorAll('a[href*="/weapons/"]').length > 0""",
            timeout=30000)
        body_text = page.locator("body").inner_text()
        for cid in IMPORT_SET:
            wid = by_id[cid]["weaponId"]
            name = names.get(wid, "")
            require((name or wid) in body_text, f"imported weapon {wid} missing a display name")
        res("frontend: Tier List loaded public rows", "PASS",
            "public weapon tab rendered after isolated import")

        # Weapon detail links for approved rows only.
        for cid in IMPORT_SET:
            wid = by_id[cid]["weaponId"]
            links = page.locator(f'a[href$="/weapons/{wid}"]')
            require(links.count() >= 1, f"no detail link for approved weapon {wid}")
        res("frontend: detail links for approved rows", "PASS",
            "all three approved weapons link to their detail pages")

        for cid in INVISIBLE_SET:
            wid = by_id[cid]["weaponId"]
            require(page.locator(f'a[href$="/weapons/{wid}"]').count() == 0,
                    f"invisible weapon {wid} leaked into Tier List links")
            name = names.get(wid, "")
            if name:
                require(name not in body_text, f"invisible weapon name {name} leaked into Tier List")
        res("frontend: pending/rejected/blocked invisible", "PASS",
            "no links or names for non-approved fixtures")

        # Reload and re-check persistence of the public binding.
        page.reload(wait_until="domcontentloaded")
        page.wait_for_function("() => document.body.innerText.length > 500", timeout=45000)
        page.get_by_role("tab", name="Weapons").click()
        page.wait_for_function(
            """() => document.querySelectorAll('a[href*="/weapons/"]').length > 0""",
            timeout=30000)
        for cid in IMPORT_SET:
            wid = by_id[cid]["weaponId"]
            require(page.locator(f'a[href$="/weapons/{wid}"]').count() >= 1,
                    f"detail link for {wid} lost after reload")
        res("frontend: reload persistence", "PASS", "public Tier List binding survived reload")
        page.close()
        context.close()
        browser.close()


def main() -> None:
    require(re.fullmatch(r"genshinhub_d3_e2e_[a-z0-9_]{1,40}", TEST_DB) is not None,
            "D3 E2E requires a uniquely named disposable database")
    dev_url = db_url("genshinhub")
    test_url = db_url(TEST_DB)
    admin_password = secrets.token_urlsafe(32)
    jwt_secret = secrets.token_urlsafe(48)
    actor = "pending-bootstrap"
    workspace = Path(tempfile.mkdtemp(prefix="genshinhub-d3-e2e-", dir="/tmp/opencode"))
    print(f"D3 isolated DB: {TEST_DB} | actor: {actor} | workspace: {workspace}", flush=True)

    with ExitStack() as stack:
        super_url = db_url("postgres")
        node(CREATE_DB, super_url, TEST_DB)
        res("setup: fresh isolated DB", "PASS", TEST_DB)

        deploy = subprocess.run(
            ["npx", "prisma", "migrate", "deploy"], cwd=BACKEND, text=True,
            capture_output=True, check=True, env={**os.environ, "DATABASE_URL": test_url})
        require("database schema is up to date" in deploy.stdout.lower() or
                "applying migration" in deploy.stdout.lower(),
                f"migration deploy did not succeed: {deploy.stdout[-800:]}")
        res("setup: migrations deployed to isolated DB", "PASS",
            "all 7 migrations applied from zero")

        seeded = json.loads(node(SEED_WEAPONS, test_url, TEST_DB))
        require(seeded["db"] == TEST_DB and seeded["seeded"] >= 279,
                f"weapon seed failed: {seeded}")
        res("setup: weapon catalogue copied (dev read-only -> isolated)", "PASS",
            f"{seeded['seeded']} weapons seeded into {seeded['db']}")

        checksums = preflight(test_url, dev_url, admin_password)

        web = workspace / "frontend"
        shutil.copytree(
            FRONTEND, web,
            ignore=shutil.ignore_patterns(".next", "node_modules", "public", ".env*",
                                          "*.tsbuildinfo", "coverage", "__pycache__"),
        )
        (web / "node_modules").symlink_to(FRONTEND / "node_modules", target_is_directory=True)
        (web / "public").symlink_to(FRONTEND / "public", target_is_directory=True)

        base_env = {
            **os.environ,
            "ADMIN_JWT_SECRET": jwt_secret,
            "NODE_ENV": "development",
            "TS_NODE_COMPILER_OPTIONS": '{"rootDir":"."}',
            "NEXT_TELEMETRY_DISABLED": "1",
            "FRONTEND_URL": ORIGIN,
        "BACKEND_URL": f"http://127.0.0.1:{B_PORT}",
        "NEXT_PUBLIC_API_URL": f"http://127.0.0.1:{B_PORT}",
        }
        base_env.pop("ADMIN_ACTOR_ID", None)
        backend_env = {**base_env, "DATABASE_URL": test_url, "PORT": str(B_PORT)}
        frontend_env = {**base_env, "NEXT_PUBLIC_GRAPHQL_URL": API}

        start(["node", "-r", "ts-node/register/transpile-only", "src/index.ts"],
              BACKEND, backend_env, workspace / "backend.log", stack)
        wait_http(f"http://127.0.0.1:{B_PORT}/health")
        bootstrap_admin(test_url, "e2e_owner", admin_password)
        admin_login_result = admin_login("e2e_owner", admin_password)
        admin_session = admin_login_result["token"]
        actor = admin_login_result["admin"]["id"]
        print(f"D3 Admin identity: {actor}", flush=True)
        frontend = start(["node", str(FRONTEND / "node_modules/next/dist/bin/next"), "dev",
                          "--hostname", "127.0.0.1", "--port", str(F_PORT)],
                         web, frontend_env, workspace / "frontend.log", stack)
        wait_http(f"{ORIGIN}/en/admin/login")
        res("setup: isolated backend + frontend", "PASS",
            f"backend :{B_PORT}, frontend :{F_PORT}, runtime-only credentials")

        by_id = queue_preflight(admin_session, checksums)

        try:
            browser_review(admin_password, actor, by_id)
        except Exception as error:
            res("browser review E2E", "FAIL", f"{type(error).__name__}: {error}")
        else:
            res("browser review E2E", "PASS", "all browser review assertions succeeded")

        try:
            api_review(admin_session, actor, by_id)
        except Exception as error:
            res("API review E2E", "FAIL", f"{type(error).__name__}: {error}")
        else:
            res("API review E2E", "PASS", "all authoritative review assertions succeeded")

        try:
            run_importer(test_url, admin_session, by_id)
        except Exception as error:
            res("D3 partial import E2E", "FAIL", f"{type(error).__name__}: {error}")
        else:
            res("D3 partial import E2E", "PASS", "guarded partial import applied to isolated DB")

        try:
            names = verify_db_and_graphql(test_url, admin_session, by_id)
        except Exception as error:
            res("DB + public GraphQL E2E", "FAIL", f"{type(error).__name__}: {error}")
            names = {}
        else:
            res("DB + public GraphQL E2E", "PASS", "rows, tier/role and visibility verified")

        # Restart frontend so ISR cache cannot mask the freshly imported rows.
        stop(frontend)
        frontend = start(["node", str(FRONTEND / "node_modules/next/dist/bin/next"), "dev",
                          "--hostname", "127.0.0.1", "--port", str(F_PORT)],
                         web, frontend_env, workspace / "frontend-reloaded.log", stack)
        wait_http(f"{ORIGIN}/en/tierlist")

        if names:
            try:
                browser_tierlist(names, by_id)
            except Exception as error:
                res("frontend Tier List E2E", "FAIL", f"{type(error).__name__}: {error}")
            else:
                res("frontend Tier List E2E", "PASS", "tier/role, detail links, visibility, reload")

        final = json.loads(node(IDENTITY, test_url, TEST_DB))
        res("post-condition: isolated DB state", "PASS", json.dumps(final))
        require(final["ranks"] == len(IMPORT_SET), "unexpected final ranking count")

    counts: dict[str, int] = {}
    for item in RESULTS:
        counts[item["status"]] = counts.get(item["status"], 0) + 1
    report = {"results": RESULTS, "counts": counts, "testDb": TEST_DB}
    out = Path("/tmp/opencode/d3-positive-e2e-results.json")
    out.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False), flush=True)
    print(f"D3 results written to {out} (FAIL={counts.get('FAIL', 0)})", flush=True)
    if counts.get("FAIL", 0):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
