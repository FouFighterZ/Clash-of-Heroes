#!/bin/bash
# Builds the zip to share: game + local-network server + soundtrack
set -e
cd "$(dirname "$0")"
bash build.sh
rm -rf pack && mkdir -p pack/Clash-of-Heroes/music
cp lan/server.js lan/clash-of-heroes.html lan/LISEZ-MOI.txt "lan/Lancer le serveur (Windows).bat" "lan/Lancer le serveur (Mac-Linux).command" pack/Clash-of-Heroes/
cp music/* pack/Clash-of-Heroes/music/
python3 - <<'P'
import zipfile,os
out='../Clash-of-Heroes.zip'
if os.path.exists(out):os.remove(out)
z=zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED)
for root,_,files in os.walk('pack/Clash-of-Heroes'):
    for f in files:
        p=os.path.join(root,f);a=os.path.relpath(p,'pack')
        zi=zipfile.ZipInfo(a);zi.external_attr=(0o755 if f.endswith('.command') else 0o644)<<16
        zi.compress_type=zipfile.ZIP_STORED if f.endswith(('.ogg','.mp3')) else zipfile.ZIP_DEFLATED
        z.writestr(zi,open(p,'rb').read())
z.close()
P
ls -la ../Clash-of-Heroes.zip
