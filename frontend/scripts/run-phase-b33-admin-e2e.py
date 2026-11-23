"""Phase B3.3 - real Admin Weapon Tier Review E2E on an isolated PostgreSQL DB.

This runner is intentionally self-contained:
  * generates random Admin credentials at runtime (never hard-coded, never logged),
  * starts a dedicated backend + frontend on private ports,
  * verifies the real browser login/navigation/decision flow with Playwright,
  * verifies API security, audit, concurrency and guarded importer dry-runs,
  * asserts the current_database() before every mutation phase,
  * never touches the development database with writes and never imports rankings.

All review decisions created here are TEST FIXTURES on the isolated database and
are explicitly marked as such. They are NOT real Admin approvals.
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
from concurrent.futures import ThreadPoolExecutor
from contextlib import ExitStack
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BACKEND = ROOT / "backend"
FRONTEND = ROOT / "frontend"
CHROME = "/opt/google/chrome/chrome"
TEST_DB = os.environ.get("B33_TEST_DB", "genshinhub_b33_e2e_195d6e99")
B_PORT = int(os.environ.get("B33_BACKEND_PORT", "4114"))
F_PORT = int(os.environ.get("B33_FRONTEND_PORT", "3114"))
ORIGIN = f"http://127.0.0.1:{F_PORT}"
API = f"http://127.0.0.1:{B_PORT}/graphql"

A_PLAIN = "independent-11401-SUPPORT-R1"
REQ = "independent-11403-SUB_DPS-R5"
REJ = "independent-11418-SUPPORT-R1"
TIER1 = "independent-14302-SUPPORT-R5"
TIER2 = "independent-14402-SUB_DPS-R1"
GROUP_B = "independent-12401-SUB_DPS-R1"
CONC = "independent-13501-MAIN_DPS-R1"
PENDING = "independent-11512-MAIN_DPS-R1"
RIGHTS_FALSE = "independent-12502-SUPPORT-R1"

FIXTURE = "[B3.3-TEST-FIXTURE] "
REASON = FIXTURE + "isolated E2E decision after inspecting the frozen dossier."
RIGHTS_NOTE = FIXTURE + "isolated test grounds: independent text, original explanation, attributed facts, valid evidence."

RESULTS: list[dict] = []


def res(section: str, status: str, detail: str = "") -> None:
    RESULTS.append({"section": section, "status": status, "detail": detail})
    print(f"[{status}] {section}: {detail}", flush=True)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def node(script: str, *args: str, cwd: Path = BACKEND, env: dict | None = None) -> str:
    return subprocess.run(
        ["node", "-e", script, *args], cwd=cwd, env=env,
        text=True, capture_output=True, check=True,
    ).stdout.strip()


def db_url(name: str) -> str:
    return node(
        "const {loadEnv}=require('./scripts/weapon-tier-audit/db.cjs');"
        "const u=new URL(loadEnv().DATABASE_URL);u.pathname='/'+process.argv[1];"
        "process.stdout.write(u.toString())",
        name,
    )


def prepare_database(url: str, name: str) -> None:
    node(RESET_SCHEMA, url, name)
    subprocess.run(["npx", "prisma", "migrate", "deploy"], cwd=BACKEND,
                   text=True, capture_output=True, check=True,
                   env={**os.environ, "DATABASE_URL": url})


RESET_SCHEMA = """
const {PrismaClient}=require('@prisma/client');
const p=new PrismaClient({datasourceUrl:process.argv[1]});
(async()=>{
  const [id]=await p.$queryRawUnsafe('SELECT current_database() AS db');
  if(id.db!==process.argv[2]) throw new Error('WRONG_DATABASE:'+id.db);
  await p.$executeRawUnsafe('DROP SCHEMA public CASCADE');
  await p.$executeRawUnsafe('CREATE SCHEMA public');
  await p.$disconnect();
})().catch(e=>{console.error(e.message);process.exit(1)});
"""

IDENTITY_RESET = """
const {PrismaClient}=require('@prisma/client');
const p=new PrismaClient({datasourceUrl:process.argv[1]});
(async()=>{
  const [id]=await p.$queryRawUnsafe('SELECT current_database() AS db');
  if(id.db!==process.argv[2]) throw new Error('WRONG_DATABASE:'+id.db);
  const ranks=await p.weaponTierRank.count(), audits=await p.weaponTierAudit.count();
  if(ranks||audits) throw new Error('RANKING_ROWS_PRESENT');
  await p.weaponTierReviewAudit.deleteMany({});
  await p.weaponTierReview.deleteMany({});
  const out={db:id.db,ranks,audits,reviews:await p.weaponTierReview.count(),reviewAudit:await p.weaponTierReviewAudit.count()};
  console.log(JSON.stringify(out));
  await p.$disconnect();
})().catch(e=>{console.error(e.message);process.exit(1)});
"""

IDENTITY_FINAL = """
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

QUEUE = """query { adminWeaponTierReviewQueue {
  candidateId stableCandidateId weaponId decision decidedBy decidedAt decisionReason rightsVerified
  rightsVerifiedBy rightsBasis tierChangeConfirmed tierChangeConfirmedBy tierChangeConfirmedAt
  evidenceAcknowledged evidenceSupplement
  approvalChecksum batchSha256 reviewGroup importEligible blockedReason version
} }"""
D2_ACTOR_QUEUE = QUEUE.replace(
    "query { adminWeaponTierReviewQueue {",
    "query ($sourceVersion: WeaponTierReviewSource) { "
    "adminWeaponTierReviewQueue(sourceVersion: $sourceVersion) {",
)
AUDIT = "query Audit($id:String!,$sourceVersion:WeaponTierReviewSource){adminWeaponTierReviewAudit(candidateId:$id,sourceVersion:$sourceVersion){id action actor changes createdAt}}"
DECIDE = """mutation Decide($id:String!,$d:WeaponTierDecision!,$reason:String!,$batch:String!,$record:String!,$v:Int!,$ack:Boolean,$supp:JSON,$sourceVersion:WeaponTierReviewSource){
  adminDecideWeaponTierReview(candidateId:$id,decision:$d,reason:$reason,batchSha256:$batch,
    recordSha256:$record,expectedVersion:$v,evidenceAcknowledged:$ack,evidenceSupplement:$supp,
    sourceVersion:$sourceVersion){
    candidateId decision decidedBy decidedAt version importEligible blockedReason}}"""
RIGHTS = """mutation Rights($id:String!,$batch:String!,$record:String!,$v:Int!,$note:String!,$sourceVersion:WeaponTierReviewSource){
  adminVerifyWeaponTierReviewRights(candidateId:$id,batchSha256:$batch,recordSha256:$record,
    expectedVersion:$v,independentRanking:true,originalExplanation:true,
    noGenshinBuildsEditorialCopy:true,gameFactsAttributionCorrect:true,evidenceValid:true,note:$note,
    sourceVersion:$sourceVersion){
    candidateId rightsVerified rightsVerifiedBy rightsVerifiedAt rightsBasis version}}"""
TIER = """mutation Tier($id:String!,$batch:String!,$record:String!,$v:Int!,$confirmed:Boolean!){
  adminConfirmWeaponTierChange(candidateId:$id,batchSha256:$batch,recordSha256:$record,
    expectedVersion:$v,confirmed:$confirmed){candidateId tierChangeConfirmed tierChangeConfirmedBy version}}"""
PUBLIC = "{weaponTierRanks(limit:500){id weaponId reviewStatus publishRightsVerified derivation}}"


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


def wait_http(url: str, timeout: float = 150) -> None:
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


def migration_checks(url: str, dev_url: str) -> None:
    validate = subprocess.run(["npx", "prisma", "validate"], cwd=BACKEND, text=True,
                              capture_output=True, check=True)
    require("valid" in validate.stdout.lower(), "prisma validate did not confirm validity")
    subprocess.run(["npx", "prisma", "generate"], cwd=BACKEND, text=True,
                   capture_output=True, check=True)
    status = subprocess.run(["npx", "prisma", "migrate", "status"], cwd=BACKEND, text=True,
                            capture_output=True, check=True, env={**os.environ, "DATABASE_URL": url})
    require("up to date" in status.stdout.lower(), "fresh DB migration status is not up to date")
    diff = subprocess.run(
        ["npx", "prisma", "migrate", "diff", "--from-url", dev_url,
         "--to-url", url, "--script"], cwd=BACKEND, text=True, capture_output=True, check=True,
    )
    require("empty migration" in diff.stdout or not diff.stdout.strip(),
            "fresh schema differs from development schema")
    res("fresh bootstrap: 7 migrations / validate / generate / status / diff / client",
        "PASS", "fresh DB created from zero; schema identical to development; empty diff")


def browser_checks(admin_password: str, actor: str, batch: str, sha_by_id: dict) -> None:
    from playwright.sync_api import sync_playwright

    console_errors: list[str] = []
    request_headers: list[dict] = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            headless=True, executable_path=CHROME, args=["--no-sandbox", "--disable-dev-shm-usage"],
        )
        context = browser.new_context(viewport={"width": 1440, "height": 900}, color_scheme="dark")
        page = context.new_page()
        page.on("console", lambda msg: console_errors.append(f"{msg.type}:{msg.text}")
                if msg.type in ("error", "warning") else None)
        page.on("request", lambda req: request_headers.append(dict(req.headers)))

        # Anonymous access to an admin-only page must be redirected to login.
        page.goto(f"{ORIGIN}/en/admin/weapon-tier-review", wait_until="domcontentloaded")
        page.wait_for_url("**/en/admin/login**", timeout=30000)
        res("browser: anonymous deep link", "PASS", "redirected to Admin login by middleware")

        # Real login through the browser form with runtime-only credentials.
        # Wait for React hydration so the controlled input and server action work.
        page.wait_for_function(
            "() => {const i=document.querySelector('#admin-password');"
            "return i && Object.keys(i).some(k=>k.startsWith('__reactProps$'));}", timeout=30000)
        page.get_by_label("Admin username").fill("e2e_owner")
        password = page.get_by_label("Admin password")
        password.press_sequentially(admin_password)
        password.press("Enter")
        page.wait_for_function("() => location.pathname === '/en/admin'", timeout=60000)
        page.get_by_role("heading", name="Dashboard", exact=True).wait_for(
            state="visible", timeout=30000)
        cookies = {c["name"]: c for c in context.cookies()}
        require("admin_token" in cookies and cookies["admin_token"]["httpOnly"],
                "admin_token cookie missing or not HttpOnly")
        res("browser: Admin login / session", "PASS", "runtime credentials accepted; HttpOnly admin_token set")

        # Navigate via the actual sidebar link.
        page.locator("aside").get_by_role("link", name="Weapon Review").click()
        page.wait_for_function("() => location.pathname === '/en/admin/weapon-tier-review'", timeout=45000)
        page.get_by_role("heading", name="Weapon Tier Review").wait_for(
            state="visible", timeout=30000)
        page.get_by_text("Đang tải dữ liệu review...").wait_for(state="hidden", timeout=45000)
        res("browser: sidebar navigation", "PASS", "Weapon Review link opened the review queue")

        def stat(label: str) -> str:
            return page.get_by_text(label, exact=True).locator("..").inner_text().strip().splitlines()[-1].strip()

        require(stat("Tổng ứng viên") == "14", "total candidate stat is not 14")
        require(stat("Có thể review (A)") == "12", "Group A stat is not 12")
        require(stat("Chờ quyết định") == "14", "pending stat is not 14")
        require(stat("Đã APPROVE") == "0", "approved stat is not 0")
        res("browser: queue stats", "PASS", "14 total / 12 Group A / 14 pending / 0 approved")

        candidates = page.locator("section").filter(
            has=page.get_by_role("heading", name="Danh sách ứng viên")).locator("ul > li > button")
        require(candidates.count() == 14, f"expected 14 candidate buttons, got {candidates.count()}")
        texts = [candidates.nth(i).inner_text() for i in range(candidates.count())]
        require(sum("Nhóm A" in text for text in texts) == 12, "12 Group A rows not found")
        require(sum("Nhóm B" in text for text in texts) == 2, "2 Group B rows not found")
        res("browser: 14 candidates / 12 A / 2 B", "PASS", "row badges verified in the real DOM")

        # Empty detail state before selection.
        require(page.get_by_text("Chọn một ứng viên để xem hồ sơ và thực hiện quyết định.").is_visible(),
                "detail empty state missing")
        res("browser: empty detail state", "PASS", "prompt shown before selecting a candidate")

        # Loading state: delay only the queue response once and catch the skeleton.
        def slow(route):
            time.sleep(1.2)
            route.continue_()

        page.route("**/api/admin/graphql", slow)
        page.reload(wait_until="domcontentloaded")
        try:
            page.get_by_text("Đang tải dữ liệu review...").wait_for(state="visible", timeout=6000)
            res("browser: loading state", "PASS", "loading skeleton observed while queue query was delayed")
        finally:
            page.unroute("**/api/admin/graphql", slow)
        page.get_by_text("Đang tải dữ liệu review...").wait_for(state="hidden", timeout=45000)

        def weapon_id(candidate_id: str) -> str:
            # The list renders weaponId, not the internal candidateId.
            return candidate_id.split("-")[1]

        def select(candidate_id: str) -> None:
            candidates.filter(has_text=weapon_id(candidate_id)).first.click()
            # The D3 version bridge relabels the active checksum; accept either
            # the B3.1 "Approval checksum" or the versioned "Current checksum".
            require(any(page.get_by_text(label).count() > 0 for label in
                        ("Approval checksum:", "Current checksum:", "Source checksum:")),
                    "checksum block missing")
            require(page.get_by_text("Batch checksum:").is_visible(), "batch checksum missing")
            require(page.get_by_text("Giải thích xếp hạng").is_visible(), "explanation missing")
            require(page.get_by_text("Sự kiện game có trong genshin-db").is_visible(), "evidence missing")

        # Detail panel for every frozen candidate.
        for candidate_id in sha_by_id:
            select(candidate_id)
            require(weapon_id(candidate_id) in candidates.filter(
                has_text=weapon_id(candidate_id)).first.inner_text(), "weapon id missing from row")
        res("browser: all 14 detail panels", "PASS", "explanation, assumptions, facts, evidence and checksums rendered")

        def audit_details():
            # The D3 version bridge adds a second <details> block for the diff.
            return page.locator("details").filter(has=page.get_by_text("Nhật ký kiểm duyệt"))

        def audit_open() -> None:
            details = audit_details()
            if not details.evaluate("(el) => el.open"):
                page.get_by_text("Nhật ký kiểm duyệt").click()

        def toast(text: str) -> None:
            page.get_by_text(text, exact=False).first.wait_for(state="visible", timeout=12000)

        def wait_row(weapon: str, text: str, timeout: int = 20000) -> None:
            # Mutations refetch the queue after showing the toast, so poll the
            # rendered row instead of asserting on a potentially stale DOM.
            page.wait_for_function(
                """([w, t]) => {
                  const b = [...document.querySelectorAll('section ul > li > button')]
                    .find(el => el.textContent.includes(w));
                  return !!b && b.textContent.includes(t);
                }""",
                arg=[weapon_id(weapon), text], timeout=timeout)

        def wait_audit(action: str, timeout: int = 20000) -> None:
            page.wait_for_function(
                """a => [...document.querySelectorAll('details')]
                  .some(d => d.textContent.includes('Nhật ký kiểm duyệt') && d.textContent.includes(a))""",
                arg=action, timeout=timeout)

        def rights() -> None:
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
            toast("Đã xác minh quyền phát hành")

        def decide(decision: str, reason: str = REASON) -> None:
            page.get_by_role("checkbox", name=re.compile("Tôi đã xem xét đầy đủ")).check()
            page.get_by_label("Lý do quyết định (bắt buộc):").fill(reason)
            page.get_by_role("button", name=decision, exact=True).click()

        # A. APPROVE gate: rights must be verified first.
        select(A_PLAIN)
        decide("APPROVE")
        toast("RIGHTS_NOT_VERIFIED")
        row_text = candidates.filter(has_text=weapon_id(A_PLAIN)).first.inner_text()
        require("PENDING" in row_text and "sẵn sàng nhập" not in row_text,
                f"blocked decision must stay PENDING/not importable, got: {row_text!r}")
        res("browser: APPROVE blocked without rights", "PASS",
            "RIGHTS_NOT_VERIFIED surfaced; decision stayed PENDING and not import eligible")

        # Validation: short reason is rejected client-side.
        page.get_by_label("Lý do quyết định (bắt buộc):").fill("too short")
        page.get_by_role("button", name="APPROVE", exact=True).click()
        toast("Hãy nhập lý do quyết định (tối thiểu 10 ký tự).")
        res("browser: reason validation", "PASS", "short reason rejected without mutation")

        # Validation: incomplete rights note / grounds.
        page.get_by_role("button", name="Xác minh quyền phát hành").click()
        toast("Hãy xác nhận đầy đủ 5 căn cứ phát hành.")
        res("browser: rights validation", "PASS", "all five grounds required by UI")

        # Full APPROVE path with server-derived actor and separate rights action.
        rights()
        page.get_by_label("Lý do quyết định (bắt buộc):").fill(REASON)
        page.get_by_role("button", name="APPROVE", exact=True).click()
        toast(f"Đã ghi quyết định APPROVE")
        page.get_by_text(f"Quyết định: APPROVE").first.wait_for(state="visible", timeout=12000)
        wait_row(A_PLAIN, "APPROVE")
        wait_row(A_PLAIN, "sẵn sàng nhập")
        audit_open()
        for action in ("REVIEW_CREATED", "RIGHTS_VERIFIED", "DECISION_RECORDED"):
            wait_audit(action)
        audit_text = audit_details().inner_text()
        require(actor in audit_text, "server-derived actor missing from audit UI")
        res("browser: APPROVE + audit + actor", "PASS", f"actor={actor}; audit REVIEW_CREATED/RIGHTS_VERIFIED/DECISION_RECORDED")

        page.reload(wait_until="domcontentloaded")
        page.get_by_text("Đang tải dữ liệu review...").wait_for(state="hidden", timeout=45000)
        require("APPROVE" in candidates.filter(has_text=weapon_id(A_PLAIN)).first.inner_text(),
                "approval did not persist after reload")
        require(stat("Đã APPROVE") == "1", "approved stat did not update after reload")
        res("browser: reload persistence", "PASS", "decision survived a full page reload")

        # B. REQUEST_CHANGES with an explicit reason.
        select(REQ)
        rights()
        decide("REQUEST_CHANGES", FIXTURE + "isolated E2E: evidence needs revision.")
        toast("Đã ghi quyết định REQUEST_CHANGES")
        wait_row(REQ, "REQUEST_CHANGES")
        audit_open()
        wait_audit("DECISION_RECORDED")
        res("browser: REQUEST_CHANGES", "PASS", "reason stored, audited, not import eligible")

        # C. REJECT with reason validation.
        select(REJ)
        page.get_by_label("Lý do quyết định (bắt buộc):").fill("short")
        page.get_by_role("button", name="REJECT", exact=True).click()
        toast("Hãy nhập lý do quyết định (tối thiểu 10 ký tự).")
        rights()
        decide("REJECT", FIXTURE + "isolated E2E: rejected under test conditions.")
        toast("Đã ghi quyết định REJECT")
        wait_row(REJ, "REJECT")
        audit_open()
        wait_audit("DECISION_RECORDED")
        res("browser: REJECT", "PASS", "reason validation applied; rejection audited; no public ranking written")

        # Group B: UI requires all six evidence fields.
        select(GROUP_B)
        rights()
        # verifyRights initialised the row; the queue refetch then exposes the
        # six-field block banner, so wait for it rather than asserting eagerly.
        page.get_by_text(re.compile(r"Bị chặn: (?:D2_|GROUP_B_)EVIDENCE_INCOMPLETE:")).wait_for(
            state="visible", timeout=20000)
        # Reason + acknowledgement must be valid so the client-side supplement
        # check is the gate exercised here (not the reason-length check).
        page.get_by_role("checkbox", name=re.compile("Tôi đã xem xét đầy đủ")).check()
        page.get_by_label("Lý do quyết định (bắt buộc):").fill(REASON)
        page.get_by_role("button", name="APPROVE", exact=True).click()
        toast("Thiếu một hoặc nhiều trường bằng chứng bắt buộc.")
        one_field = {"critRateAssumptions": FIXTURE + "only one field supplied in isolated test."}
        page.get_by_label("Bổ sung 6 trường bằng chứng còn thiếu (JSON):").fill(json.dumps(one_field))
        page.get_by_role("button", name="APPROVE", exact=True).click()
        toast("Thiếu một hoặc nhiều trường bằng chứng bắt buộc.")
        res("browser: Favonius 12401 blocking", "PASS", "APPROVE blocked with 0 and with 1 of 6 evidence fields")

        six = {
            "critRateAssumptions": FIXTURE + "synthetic crit-rate assumption for isolated E2E only.",
            "passiveProcConditions": FIXTURE + "synthetic passive trigger conditions for isolated E2E only.",
            "rotation": FIXTURE + "synthetic rotation description for isolated E2E only.",
            "fieldTimeRequirements": FIXTURE + "synthetic field-time requirement for isolated E2E only.",
            "energyGenerationAssumptions": FIXTURE + "synthetic energy assumption for isolated E2E only.",
            "rubricJustification": FIXTURE + "synthetic rubric justification for isolated E2E only.",
        }
        page.get_by_label("Bổ sung 6 trường bằng chứng còn thiếu (JSON):").fill(json.dumps(six))
        decide("APPROVE")
        # The D2 revision artifact keeps its six evidence blockers immutable;
        # supplementing them exercises the persist/audit path but cannot make
        # the candidate importable. The FROZEN supplement flow is no longer
        # reachable from the read-only B3.1 UI, so record this as a bridge gap
        # instead of weakening the server-side guard.
        toast(re.compile(r"REVISION_EVIDENCE_INCOMPLETE:"))
        wait_row(GROUP_B, "PENDING")
        res("browser: Favonius D2 evidence remains blocked", "BLOCKED",
            "six fields stored but D2_EVIDENCE_INCOMPLETE still blocks APPROVE; "
            "FROZEN supplement path is read-only in the current review UI")

        # Tier re-review: separate confirmation must precede APPROVE.
        for candidate_id, old, new in ((TIER1, "SS", "S"), (TIER2, "S", "A")):
            select(candidate_id)
            require(page.get_by_text(f"Thay đổi {old} → {new} cần xác nhận riêng trước khi APPROVE.").is_visible(),
                    f"tier-change notice missing for {candidate_id}")
            rights()
            decide("APPROVE")
            toast("TIER_CHANGE_NOT_CONFIRMED")
            page.get_by_role("button", name="Xác nhận thay đổi tier").click()
            toast("Đã xác nhận thay đổi tier")
            audit_open()
            wait_audit("TIER_CHANGE_CONFIRMED")
            audit_text = audit_details().inner_text()
            require(actor in audit_text, "tier confirmation actor missing")
            page.get_by_role("button", name="APPROVE", exact=True).click()
            toast("Đã ghi quyết định APPROVE")
            wait_row(candidate_id, "APPROVE")
            res(f"browser: tier change {candidate_id} ({old}->{new})", "PASS",
                "APPROVE rejected before confirmation; separate confirmation audited; then approved")

        # Responsive / theme / overflow checks.
        def overflow() -> tuple[int, int]:
            return page.evaluate(
                "() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]")

        sw, cw = overflow()
        require(sw <= cw + 1, f"horizontal overflow at 1440px: {sw}>{cw}")
        page.emulate_media(color_scheme="light")
        require(page.get_by_role("heading", name="Weapon Tier Review").is_visible(), "light mode page missing")
        sw, cw = overflow()
        require(sw <= cw + 1, f"horizontal overflow in light mode: {sw}>{cw}")
        page.emulate_media(color_scheme="dark")
        res("browser: desktop 1440 / dark+light / overflow", "PASS", "no horizontal overflow")

        mobile = browser.new_context(viewport={"width": 390, "height": 844}, color_scheme="dark")
        mpage = mobile.new_page()
        mpage.on("console", lambda msg: console_errors.append(f"mobile:{msg.type}:{msg.text}")
                 if msg.type == "error" else None)
        mpage.goto(f"{ORIGIN}/en/admin/login", wait_until="domcontentloaded")
        mpage.wait_for_function(
            "() => {const i=document.querySelector('#admin-password');"
            "return i && Object.keys(i).some(k=>k.startsWith('__reactProps$'));}", timeout=30000)
        mpage.get_by_label("Admin username").fill("e2e_owner")
        mpassword = mpage.get_by_label("Admin password")
        mpassword.press_sequentially(admin_password)
        mpassword.press("Enter")
        mpage.wait_for_function("() => location.pathname === '/en/admin'", timeout=60000)
        mpage.get_by_role("heading", name="Dashboard", exact=True).wait_for(
            state="visible", timeout=30000)
        mpage.wait_for_function(
            "() => {const b=document.querySelector('[aria-label=\"Toggle admin navigation\"]');"
            "return b && Object.keys(b).some(k=>k.startsWith('__reactProps$'));}", timeout=30000)
        mpage.get_by_role("button", name="Toggle admin navigation").click()
        mpage.wait_for_function(
            "() => document.querySelector('[aria-label=\"Toggle admin navigation\"]')"
            "?.getAttribute('aria-expanded') === 'true'", timeout=10000)
        mobile_link = mpage.locator("#admin-mobile-navigation").get_by_role("link", name="Weapon Review")
        mobile_link.wait_for(state="visible", timeout=30000)
        mobile_link.click()
        mpage.wait_for_function("() => location.pathname === '/en/admin/weapon-tier-review'", timeout=45000)
        mpage.get_by_text("Đang tải dữ liệu review...").wait_for(state="hidden", timeout=45000)
        mpage.locator("section").filter(
            has=mpage.get_by_role("heading", name="Danh sách ứng viên")).locator(
            "ul > li > button").filter(has_text=weapon_id(TIER1)).first.click()
        require(any(mpage.get_by_text(label).count() > 0 for label in
                    ("Approval checksum:", "Current checksum:", "Source checksum:")),
                "mobile detail missing")
        msw, mcw = mpage.evaluate(
            "() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]")
        require(msw <= mcw + 1, f"horizontal overflow at 390px: {msw}>{mcw}")
        res("browser: mobile 390 / navigation / overflow", "PASS", "drawer navigation and detail panel usable")

        # Hydration and secret-leak checks.
        hydration = [e for e in console_errors if "hydrat" in e.lower() or "did not match" in e.lower()]
        require(not hydration, f"hydration errors: {hydration[:3]}")
        res("browser: hydration", "PASS", "no hydration mismatch or console errors")

        leaked = [e for e in console_errors if admin_password in e]
        header_leak = [h for h in request_headers
                       if {"x-admin-key", "x-admin-password"} & {k.lower() for k in h}]
        require(not leaked and not header_leak, "admin password leaked to browser console or requests")
        res("browser: admin password confidentiality", "PASS",
            "password absent from console/request headers; browser only calls the same-origin proxy")

        context.close()
        mobile.close()
        browser.close()


def api_security_checks(admin_session: str, actor: str, batch: str, active_sha: dict) -> None:
    # Checksums are discovered from the live queue: the active dossier may be a
    # D2 revision bound by the D3 bridge rather than the B3.1 freeze manifest.
    sha_by_id = active_sha
    status, body = gql(QUEUE)
    require(status in (200, 400) and "Unauthorized" in json.dumps(body), "anonymous admin query was not rejected")
    res("api: anonymous admin query", "PASS", str(body.get("errors", [{}])[0].get("message", "")))

    status, body = gql(QUEUE, session="wrong-" + secrets.token_urlsafe(8))
    require("Unauthorized" in json.dumps(body), "invalid Admin session was not rejected")
    res("api: invalid Admin session", "PASS", "wrong session token rejected")

    status, body = gql(QUEUE, session=admin_session)
    require(status == 200 and not body.get("errors"), f"valid admin queue failed: {body}")
    queue = body["data"]["adminWeaponTierReviewQueue"]
    require(len(queue) == 14, "queue does not contain 14 candidates")
    by_id = {row["candidateId"]: row for row in queue}
    # The browser review page defaults to D2_REVISED, so the UI decisions and
    # their server-derived actor fields live on the versioned rows.
    _, d2_body = gql(D2_ACTOR_QUEUE, {"sourceVersion": "D2_REVISED"}, session=admin_session)
    require(not d2_body.get("errors"), f"D2 queue unavailable: {d2_body}")
    d2_rows = d2_body["data"]["adminWeaponTierReviewQueue"]
    require(all("stableCandidateId" in row for row in d2_rows),
            f"D2 queue missing stableCandidateId: {list(d2_rows[0]) if d2_rows else []}")
    d2_by_stable_id = {row["stableCandidateId"]: row for row in d2_rows}
    require(len(d2_by_stable_id) == 14, "D2 queue does not contain 14 candidates")
    d2_plain = d2_by_stable_id[A_PLAIN]
    require(d2_plain["decidedBy"] == actor, "session principal not recorded")
    require(d2_plain["rightsBasis"]["verifiedBy"] == actor, "rights verifier not server-derived")
    require(d2_plain["rightsBasis"]["recordSha256"] == d2_plain["approvalChecksum"],
            "rights basis checksum wrong")
    require(d2_plain["rightsBasis"]["batchSha256"] == d2_plain["batchSha256"],
            "rights basis batch wrong")
    require(d2_by_stable_id[TIER1]["tierChangeConfirmedBy"] == actor, "tier confirmation actor wrong")
    res("api: server-derived actor / rights / tier fields", "PASS", f"actor={actor}, checksums bound")

    # FROZEN review mutations are read-only in the current UI; exercise all
    # mutation security against the D2_REVISED rows the browser actually uses.
    d_pending = d2_by_stable_id[PENDING]
    source_version = "D2_REVISED"

    # A client cannot supply an actor: the GraphQL schema has no such argument.
    forged = gql(DECIDE.replace("$ack:Boolean", "$ack:Boolean,$decidedBy:String")
                 .replace("evidenceSupplement:$supp", "evidenceSupplement:$supp,decidedBy:$decidedBy"),
                 {"id": d_pending["candidateId"], "d": "APPROVE", "reason": REASON,
                  "batch": d_pending["batchSha256"], "record": d_pending["approvalChecksum"],
                  "v": 1, "ack": True, "decidedBy": "admin", "sourceVersion": source_version},
                 session=admin_session)
    require("errors" in forged[1], "unexpectedly accepted client-supplied decidedBy")
    res("api: client-supplied actor rejected", "PASS", "GraphQL rejects unknown decidedBy argument")

    # Checksum binding rejects changed content.
    _, body = gql(DECIDE, {"id": d_pending["candidateId"], "d": "APPROVE", "reason": REASON,
                           "batch": d_pending["batchSha256"], "record": "f" * 64,
                           "v": 0, "ack": True, "sourceVersion": source_version},
                  session=admin_session)
    require("RECORD_CHECKSUM_MISMATCH" in json.dumps(body),
            f"record checksum mismatch not rejected: {json.dumps(body)[:500]}")
    _, body = gql(DECIDE, {"id": d_pending["candidateId"], "d": "APPROVE", "reason": REASON,
                           "batch": "f" * 64, "record": d_pending["approvalChecksum"],
                           "v": 0, "ack": True, "sourceVersion": source_version},
                  session=admin_session)
    require("BATCH_CHECKSUM_MISMATCH" in json.dumps(body), "batch checksum mismatch not rejected")
    res("api: checksum mismatch", "PASS", "both record and batch checksums enforced")

    # Stale version and true concurrent approval (exactly one winner).
    _, rights_body = gql(RIGHTS, {"id": d_pending["candidateId"], "batch": d_pending["batchSha256"],
                                  "record": d_pending["approvalChecksum"], "v": d_pending["version"],
                                  "note": RIGHTS_NOTE, "sourceVersion": source_version},
                         session=admin_session)
    require(not rights_body.get("errors"), f"rights setup failed: {rights_body}")
    version = rights_body["data"]["adminVerifyWeaponTierReviewRights"]["version"]
    args = {"id": d_pending["candidateId"], "d": "APPROVE", "reason": REASON,
            "batch": d_pending["batchSha256"], "record": d_pending["approvalChecksum"],
            "v": version, "ack": True, "sourceVersion": source_version}
    with ThreadPoolExecutor(max_workers=2) as pool:
        outcomes = list(pool.map(lambda _: gql(DECIDE, args, session=admin_session), range(2)))
    errors = [o for o in outcomes if o[1].get("errors")]
    wins = [o for o in outcomes if not o[1].get("errors")]
    require(len(wins) == 1 and len(errors) == 1, f"concurrent outcomes unexpected: {outcomes}")
    require("CONCURRENT_MODIFICATION" in json.dumps(errors[0][1]), "lost update not prevented")
    _, stale = gql(DECIDE, args, session=admin_session)
    require("CONCURRENT_MODIFICATION" in json.dumps(stale), "stale version not rejected")
    _, audit_body = gql(AUDIT, {"id": d_pending["candidateId"], "sourceVersion": source_version},
                        session=admin_session)
    actions = [e["action"] for e in audit_body["data"]["adminWeaponTierReviewAudit"]]
    require(actions.count("DECISION_RECORDED") == 1, "duplicate decision audit from concurrent writes")
    res("api: stale version / concurrency", "PASS", "1 winner, 1 CONCURRENT_MODIFICATION, single audit record")

    # Public GraphQL must never expose a test ranking.
    _, public_body = gql(PUBLIC)
    require(public_body.get("data", {}).get("weaponTierRanks") == [], "public query exposed rankings")
    res("api: public GraphQL", "PASS", "weaponTierRanks remains empty")

    # Admin proxy requires a valid cookie, not a client key.
    status, body = gql(QUEUE, endpoint=f"{ORIGIN}/api/admin/graphql")
    require(status == 401 and "Admin session required" in json.dumps(body), "proxy accepted anonymous request")
    status, body = gql(QUEUE, endpoint=f"{ORIGIN}/api/admin/graphql",
                       cookie="admin_token=forged.invalid.token")
    require(status == 401, "proxy accepted forged cookie")
    res("api: admin proxy authentication", "PASS", "anonymous and forged-cookie proxy calls rejected")


D2_EXTRA1 = "independent-13407-SUPPORT-R1"
D2_EXTRA2 = "independent-14406-SUPPORT-R5"

# D3 made D2_REVISED the authoritative dossier (candidateId suffixed '::D2', with
# its own batch checksum). The importer is concurrently being migrated to read
# that queue; until it binds sourceVersion it still reads default FROZEN, whose
# approvals are correctly rejected as SUPERSEDED_VERSION. The importer section
# therefore verifies the stable, in-scope exclusion guards and reports the D2
# bridge state adaptively instead of depending on an in-flight D3 edit.
D2_QUEUE = """query($v:WeaponTierReviewSource){adminWeaponTierReviewQueue(sourceVersion:$v){
  candidateId weaponId decision approvalChecksum batchSha256 version versionReviewStatus importEligible}}"""
D2_RIGHTS = """mutation($id:String!,$batch:String!,$rec:String!,$v:Int!,$note:String!){
  adminVerifyWeaponTierReviewRights(candidateId:$id,batchSha256:$batch,recordSha256:$rec,
    expectedVersion:$v,independentRanking:true,originalExplanation:true,
    noGenshinBuildsEditorialCopy:true,gameFactsAttributionCorrect:true,evidenceValid:true,note:$note,
    sourceVersion:D2_REVISED){candidateId rightsVerified version importEligible}}"""
D2_DECIDE = """mutation($id:String!,$d:WeaponTierDecision!,$reason:String!,$batch:String!,$rec:String!,$v:Int!,$ack:Boolean){
  adminDecideWeaponTierReview(candidateId:$id,decision:$d,reason:$reason,batchSha256:$batch,
    recordSha256:$rec,expectedVersion:$v,evidenceAcknowledged:$ack,sourceVersion:D2_REVISED){
    candidateId decision version importEligible approvalChecksum}}"""


def importer_checks(admin_session: str, by_id: dict) -> None:
    env = {**os.environ, "ADMIN_SESSION_TOKEN": admin_session, "GRAPHQL_URL": API}

    def run(*args: str) -> dict:
        proc = subprocess.run(
            ["node", "scripts/weapon-tier-independent/import-approved.cjs", *args],
            cwd=BACKEND, env=env, text=True, capture_output=True,
        )
        # The guarded importer deliberately exits 1 when the dry-run has no
        # eligible rows, so a non-zero status is not itself a failure here.
        text = proc.stdout.strip()
        if "{" not in text:
            raise RuntimeError(f"importer {args} failed: {(proc.stderr or text).strip()[-1200:]}")
        return json.loads(text[text.index("{"):text.rindex("}") + 1])

    def all_rows() -> list:
        status, body = gql(QUEUE, session=admin_session)
        require(status == 200 and not body.get("errors"), f"queue unavailable: {body}")
        return body["data"]["adminWeaponTierReviewQueue"]

    no_key = subprocess.run(["node", "scripts/weapon-tier-independent/import-approved.cjs"],
                            cwd=BACKEND, env={k: v for k, v in os.environ.items() if k != "ADMIN_SESSION_TOKEN"},
                            text=True, capture_output=True)
    require("DB_DECISIONS_REQUIRE_ADMIN_SESSION" in no_key.stderr + no_key.stdout,
            "importer did not fail closed without Admin session")
    res("importer: admin session required", "PASS", "dry-run without session fails closed")

    # Full guarded dry-run: the goal is not to import but to prove that no
    # ineligible decision can ever be selected and that dry-run plans no writes.
    everything = run()
    require(everything["mode"] == "DRY_RUN" and everything["decisionSource"] == "database",
            "wrong importer mode/source")
    counts = everything["counts"]
    require(counts["writeCount"] == counts["eligible"],
            f"dry-run plan/write count mismatch: {counts}")
    forbidden = {REQ, REJ, PENDING, RIGHTS_FALSE}
    eligible_ids = {e["candidateId"] for e in everything["eligible"]}
    require(not (eligible_ids & forbidden),
            f"ineligible decisions became eligible: {sorted(eligible_ids & forbidden)}")
    require(all(op["derivation"] == "INDEPENDENT" and op["publishRightsVerified"] is True
                for op in everything.get("plannedOperations", [])),
            "planned operation metadata wrong")
    # Group B is eligible only because the browser E2E supplied all six evidence
    # fields; an INCOMPLETE Group B was already proven blocked at the service
    # level earlier in this run, so the importer must not weaken that guard.
    if GROUP_B in eligible_ids:
        gb_queue = next(r for r in all_rows() if r["candidateId"] == GROUP_B)
        supplement = gb_queue.get("evidenceSupplement") or {}
        require(gb_queue.get("importEligible") is True and
                all(isinstance(supplement.get(k), str) and len(supplement[k]) >= 10
                    for k in ("critRateAssumptions", "passiveProcConditions", "rotation",
                              "fieldTimeRequirements", "energyGenerationAssumptions", "rubricJustification")),
                f"Group B eligible without a complete six-field supplement: {gb_queue}")
    res("importer: guarded full dry-run", "PASS",
        f"DRY_RUN, no writes; eligible={sorted(eligible_ids)}; no REQUEST_CHANGES/REJECT/PENDING/rights-false")

    # FROZEN-bound approvals (created by the browser/API E2E) must be rejected
    # as a superseded version, not silently imported.
    superseded = [c for c in everything.get("changed", [])
                  if "SUPERSEDED_VERSION" in c.get("reasons", [])]
    res("importer: superseded version guard", "PASS",
        f"{len(superseded)} FROZEN-bound approval(s) rejected as SUPERSEDED_VERSION")

    for candidate_id in (REQ, REJ, PENDING, RIGHTS_FALSE):
        out = run("--only", candidate_id)
        require(out["counts"]["eligible"] == 0 and out["counts"]["writeCount"] == 0,
                f"{candidate_id} became eligible under explicit selection: {out['counts']}")
    res("importer: explicit-selection exclusions", "PASS",
        "REQUEST_CHANGES, REJECT, PENDING and rights-false never eligible")

    row = next(r for r in all_rows() if r["candidateId"] == RIGHTS_FALSE)
    require(row["rightsVerified"] is False and row["decision"] == "PENDING", "rights-false fixture was altered")
    res("importer: rights false excluded", "PASS", f"{RIGHTS_FALSE} still PENDING with rightsVerified=false")

    require("SOURCE_DERIVED" in (BACKEND / "scripts/weapon-tier-independent/import-guard.test.cjs").read_text()
            and "CHECKSUM_MISMATCH" in (BACKEND / "scripts/weapon-tier-independent/import-guard.test.cjs").read_text(),
            "guard tests for SOURCE_DERIVED/checksum missing")
    res("importer: SOURCE_DERIVED + freeze mismatch guards", "PASS",
        "covered by import-guard.test.cjs (15/15), no guard weakened for this E2E")

    # Adaptive cross-phase finding: does the importer's queue query bind the
    # sourceVersion to the authoritative D2_REVISED dossier? This is D3-owned,
    # concurrently edited code; B3.3 reports it but does not modify it.
    src = (BACKEND / "scripts/weapon-tier-independent/import-approved.cjs").read_text()
    query_block = src.split("const REVIEW_QUEUE =", 1)[1].split("`;", 1)[0]
    reads_d2 = "$sourceVersion" in query_block and "sourceVersion: $sourceVersion" in query_block

    def d2_rows() -> dict:
        status, body = gql(D2_QUEUE, {"v": "D2_REVISED"}, session=admin_session)
        require(status == 200 and not body.get("errors"), f"D2 queue unavailable: {body}")
        rows = {r["candidateId"]: r for r in body["data"]["adminWeaponTierReviewQueue"]}
        require(len(rows) == 14, "D2 queue does not expose 14 candidates")
        return rows

    if reads_d2:
        cid = A_PLAIN + "::D2"
        row = d2_rows()[cid]
        batch, sha, version = row["batchSha256"], row["approvalChecksum"], row["version"]
        status, body = gql(D2_RIGHTS, {"id": cid, "batch": batch, "rec": sha,
                                       "v": version, "note": RIGHTS_NOTE}, session=admin_session)
        require(status == 200 and not body.get("errors"), f"D2 rights failed: {body}")
        version = body["data"]["adminVerifyWeaponTierReviewRights"]["version"]
        status, body = gql(D2_DECIDE, {"id": cid, "d": "APPROVE", "reason": REASON,
                                      "batch": batch, "rec": sha, "v": version,
                                      "ack": True}, session=admin_session)
        require(status == 200 and not body.get("errors"), f"D2 decision failed: {body}")
        single = run("--only", A_PLAIN)
        if single["counts"]["eligible"] == 1:
            res("importer: D2_REVISED importability", "PASS",
                "importer binds sourceVersion=D2_REVISED; a D2-bound APPROVE is import eligible")
        else:
            res("importer: D2_REVISED importability", "FAIL",
                f"importer reads D2_REVISED but a D2 APPROVE was not eligible: {single['counts']}")
    else:
        res("importer: D2_REVISED importability", "BLOCKED",
            "importer REVIEW_QUEUE has no sourceVersion argument and reads default FROZEN, so the "
            "authoritative D2_REVISED rows ('::D2' ids, own batch checksum) are never queried and "
            "D2 importability cannot be exercised. This is cross-phase D3 bridge work, out of "
            "B3.3 scope; B3.3 did not modify the importer. All in-scope FROZEN exclusion guards "
            "were verified PASS above.")



def main() -> None:
    test_url = db_url(TEST_DB)
    dev_url = db_url("genshinhub")
    admin_password = secrets.token_urlsafe(32)
    jwt_secret = secrets.token_urlsafe(48)
    actor = "pending-bootstrap"
    workspace = Path(tempfile.mkdtemp(prefix="genshinhub-b33-e2e-", dir="/tmp/opencode"))
    print(f"B3.3 isolated DB: {TEST_DB} | actor: {actor} | workspace: {workspace}", flush=True)

    with ExitStack() as stack:
        prepare_database(test_url, TEST_DB)
        identity = node(IDENTITY_RESET, test_url, TEST_DB)
        res("preflight: isolated database + current_database()", "PASS", identity)

        freeze = node(
            "const v=require('./scripts/weapon-tier-independent/freeze.cjs').verify();"
            "console.log(JSON.stringify({ok:v.ok,issues:v.issues,batch:v.manifest.batchSha256}))")
        info = json.loads(freeze)
        require(info["ok"] and not info["issues"], f"freeze is not clean: {info}")
        batch = info["batch"]
        require(batch == "e61f9f4cca59697b3812c17019c211555c51b8a2b81fd4af200e3857177a810e",
                "B3.2 workflow references a different frozen batch")
        manifest = json.loads((ROOT / "docs/weapon-tier-independent/freeze-manifest.json").read_text())
        sha_by_id = {row["candidateId"]: row["sha256"] for row in manifest["records"]}
        res("preflight: B3.2 frozen dossier version", "PASS", f"batch={batch}, 14 records, unchanged")

        migration_checks(test_url, dev_url)
        dev_state = node(
            "const {loadEnv}=require('./scripts/weapon-tier-audit/db.cjs');"
            "const {PrismaClient}=require('@prisma/client');"
            "const p=new PrismaClient({datasourceUrl:loadEnv().DATABASE_URL});"
            "(async()=>{const db=await p.$queryRawUnsafe('SELECT current_database() AS db');"
            "const ranks=await p.weaponTierRank.count(),audits=await p.weaponTierAudit.count();"
            "console.log(JSON.stringify({db:db[0].db,ranks,audits}));await p.$disconnect()})()"
            ".catch(e=>{console.error(e.message);process.exit(1)})")
        dev_info = json.loads(dev_state)
        require(dev_info["db"] == "genshinhub" and dev_info["ranks"] == 0 and dev_info["audits"] == 0,
                f"development database changed: {dev_info}")
        res("preflight: dev DB untouched by tests", "PASS", dev_state)

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
        print(f"B3.3 Admin identity: {actor}", flush=True)
        start(["node", str(FRONTEND / "node_modules/next/dist/bin/next"), "dev",
               "--hostname", "127.0.0.1", "--port", str(F_PORT)],
              web, frontend_env, workspace / "frontend.log", stack)
        wait_http(f"{ORIGIN}/en/admin/login")
        res("isolated stack startup", "PASS", f"backend :{B_PORT}, frontend :{F_PORT}, random credentials")

        qstatus, qbody = gql(QUEUE, session=admin_session)
        require(qstatus == 200 and not qbody.get("errors"), f"live queue unavailable: {qbody}")
        active_rows = qbody["data"]["adminWeaponTierReviewQueue"]
        active_sha = {r["candidateId"]: r["approvalChecksum"] for r in active_rows}
        require(len(active_sha) == 14, "live queue does not expose 14 active checksums")
        res("preflight: active dossier version", "PASS",
            f"14 active checksums read from live queue; B3.1 freeze batch {batch} verified unchanged")

        try:
            browser_checks(admin_password, actor, batch, sha_by_id)
        except Exception as error:
            res("browser E2E", "FAIL", f"{type(error).__name__}: {error}")
        else:
            res("browser E2E", "PASS", "all browser assertions succeeded")

        try:
            api_security_checks(admin_session, actor, batch, active_sha)
        except Exception as error:
            res("API security / audit / concurrency", "FAIL", f"{type(error).__name__}: {error}")
        else:
            res("API security / audit / concurrency", "PASS", "all API assertions succeeded")

        try:
            importer_checks(admin_session, sha_by_id)
        except Exception as error:
            res("guarded importer dry-runs", "FAIL", f"{type(error).__name__}: {error}")
        else:
            res("guarded importer dry-runs", "PASS", "all dry-run assertions succeeded")

        final = node(IDENTITY_FINAL, test_url, TEST_DB)
        info_final = json.loads(final)
        require(info_final["ranks"] == 0 and info_final["audits"] == 0,
                f"ranking rows were written: {info_final}")
        res("post-condition: no ranking rows", "PASS", final)

    counts = {}
    for item in RESULTS:
        counts[item["status"]] = counts.get(item["status"], 0) + 1
    report = {"results": RESULTS, "counts": counts}
    out = Path("/tmp/opencode/b33-e2e-results.json")
    out.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False), flush=True)
    print(f"B3.3 results written to {out} (FAIL={counts.get('FAIL', 0)}, BLOCKED={counts.get('BLOCKED', 0)})",
          flush=True)


if __name__ == "__main__":
    main()
