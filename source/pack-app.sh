#!/bin/bash
# Builds the Windows desktop app (Electron) next to the browser zip
set -e
cd "$(dirname "$0")"
bash build.sh
A=../app
UPDATE_BASE=${UPDATE_BASE-https://raw.githubusercontent.com/FouFighterZ/Clash-of-Heroes/jeu/}
rm -rf $A/src/music && mkdir -p $A/src/music
cp lan/server.js lan/clash-of-heroes.html $A/src/
cp music/* $A/src/music/
# version stamp + update feed (folder published to the update repository)
VER=$(grep -o 'version [0-9]*' head.html | head -1 | grep -o '[0-9]*')
python3 - "$VER" <<'P'
import json,os,sys
v=int(sys.argv[1]);src='../app/src';files=[{'path':'clash-of-heroes.html','size':os.path.getsize(os.path.join(src,'clash-of-heroes.html'))}]+[{'path':'server.js','size':os.path.getsize(os.path.join(src,'server.js'))}]
for f in sorted(os.listdir(os.path.join(src,'music'))):files.append({'path':'music/'+f,'size':os.path.getsize(os.path.join(src,'music',f))})
man={'version':v,'files':files};open(os.path.join(src,'version.json'),'w').write(json.dumps(man))
P
rm -rf ../update-feed && mkdir -p ../update-feed/music && cp $A/src/clash-of-heroes.html $A/src/server.js $A/src/version.json ../update-feed/ && cp $A/src/music/* ../update-feed/music/
if [ -n "$UPDATE_BASE" ]; then printf '{"base":"%s"}' "$UPDATE_BASE" > $A/src/update.json; else rm -f $A/src/update.json; fi
cd $A
rm -rf out && npx --no-install electron-packager src "Clash of Heroes" --platform=win32 --arch=x64 --electron-version=44.5.1 --icon=icon.ico --out=out --overwrite --no-prune \
  --win32metadata.ProductName="Clash of Heroes" --win32metadata.FileDescription="Clash of Heroes" --win32metadata.CompanyName="Clash of Heroes" >/dev/null
D="out/Clash of Heroes-win32-x64"
mv "$D/Clash of Heroes.exe" "$D/Clash of Heroes.exe" 2>/dev/null || true
cp ../game/lan/LISEZ-MOI-APP.txt "$D/LISEZ-MOI.txt"
find "$D/locales" -name "*.pak" ! -name "fr.pak" ! -name "en-US.pak" -delete
python3 - <<'P'
import zipfile,os
src='out/Clash of Heroes-win32-x64';out='../Clash-of-Heroes-Windows.zip'
if os.path.exists(out):os.remove(out)
z=zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=9)
for root,_,files in os.walk(src):
    for f in files:
        p=os.path.join(root,f);a=os.path.join('Clash of Heroes',os.path.relpath(p,src))
        z.write(p,a,compress_type=zipfile.ZIP_STORED if f.endswith(('.ogg','.mp3')) else zipfile.ZIP_DEFLATED)
z.close()
P
ls -la ../Clash-of-Heroes-Windows.zip
