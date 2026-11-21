import os, shutil, subprocess, tempfile, signal, time, secrets
from contextlib import ExitStack
from pathlib import Path
from urllib.parse import urlsplit,urlunsplit
from urllib.request import urlopen

root=Path(__file__).resolve().parents[2]
backend=root/'backend'
source=root/'frontend'
configured=subprocess.check_output(['node','-e','const fs=require("node:fs");const env=require("dotenv").parse(fs.readFileSync(".env"));process.stdout.write(process.env.DATABASE_URL??env.DATABASE_URL)'],cwd=backend,text=True)
url=urlsplit(configured)
assert url.hostname=='127.0.0.1' and url.port==5434 and url.path=='/genshinhub'
def database(name):
    assert name in ['genshinhub_phasec_fresh_97c1','genshinhub_phasec_admin_test_97c1']
    return urlunsplit(url._replace(path='/'+name))
root_env=os.environ.copy()
root_env.update(ADMIN_PASSWORD=secrets.token_urlsafe(32),ADMIN_JWT_SECRET=secrets.token_urlsafe(48),
                USER_JWT_SECRET=secrets.token_urlsafe(48),NODE_ENV='development',PHASE_C_FRONTEND_URL='http://127.0.0.1:3014',
                PHASE_C_GRAPHQL_URL='http://127.0.0.1:4014/graphql',NEXT_PUBLIC_GRAPHQL_URL='http://127.0.0.1:4014/graphql',
                PORT='4014',FRONTEND_URL='http://127.0.0.1:3014',TS_NODE_COMPILER_OPTIONS='{"rootDir":"."}',
                NEXT_TELEMETRY_DISABLED='1')
root_env.pop('CHARACTER_BUILD_READ_MODE',None)
def wait(proc,address):
    for i in range(160):
        if proc.poll() is not None: raise RuntimeError(f'Server process stopped while waiting for {address}')
        try:
            with urlopen(address,timeout=4) as r:
                if r.status==200: return
        except OSError:
            pass
        time.sleep(.5)
    raise RuntimeError(f'No server response for {address}')

def stop(proc):
    if proc.poll() is None:
        os.killpg(proc.pid,signal.SIGTERM)
        try: proc.wait(timeout=10)
        except subprocess.TimeoutExpired:
            os.killpg(proc.pid,signal.SIGKILL)
            proc.wait()

with ExitStack() as stack:
    temp=Path(stack.enter_context(tempfile.TemporaryDirectory(prefix='genshinhub-phase-c-web-')))
    web=temp/'frontend'
    shutil.copytree(source,web,ignore=shutil.ignore_patterns('.next','node_modules','public','.env*','*.tsbuildinfo','coverage','__pycache__'))
    (web/'node_modules').symlink_to(source/'node_modules',target_is_directory=True)
    (web/'public').symlink_to(source/'public',target_is_directory=True)
    def start(cmd,cwd,env,label):
        log=stack.enter_context(open(temp/(label+'.log'),'wb'))
        proc=subprocess.Popen(cmd,cwd=cwd,env=env,stdout=log,stderr=subprocess.STDOUT,start_new_session=True)
        stack.callback(stop,proc)
        return proc
    backend_cmd=['node','-r','ts-node/register/transpile-only','src/index.ts']
    fresh=start(backend_cmd,backend,{**root_env,'DATABASE_URL':database('genshinhub_phasec_fresh_97c1')},'fresh')
    wait(fresh,'http://127.0.0.1:4014/health')
    subprocess.run(['node','-e',"""(async()=>{
      const r=await fetch('http://127.0.0.1:4014/graphql',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:'{characters{id} weapons{id} characterBuilds(characterId:"mitya"){id}}'})});
      const body=await r.json();require('node:assert/strict').deepEqual(body.data,{characters:[],weapons:[],characterBuilds:[]});
      console.log('Fresh database: generated client and live Apollo query returned empty catalogs successfully.');
    })().catch(()=>process.exitCode=1)"""],check=True)
    stop(fresh)
    api=start(backend_cmd,backend,{**root_env,'DATABASE_URL':database('genshinhub_phasec_admin_test_97c1')},'backend')
    wait(api,'http://127.0.0.1:4014/health')
    frontend=start(['node',str(source/'node_modules/next/dist/bin/next'),'dev','--hostname','127.0.0.1','--port','3014'],
                   web,root_env,'frontend')
    wait(frontend,'http://127.0.0.1:3014/en/admin/login')
    result=subprocess.run(['python',str(source/'scripts/test-admin-multi-build.py')],env=root_env)
    if result.returncode:
        raise SystemExit(result.returncode)
