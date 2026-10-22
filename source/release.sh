#!/bin/bash
# Publishes the current build to the update branch of the GitHub repository (auto-update feed + source backup)
set -e
cd "$(dirname "$0")"
R=/home/user/clash-of-heroes
S=..
cp $S/update-feed/clash-of-heroes.html $S/update-feed/server.js $S/update-feed/version.json $R/
rm -rf $R/music && mkdir -p $R/music && cp $S/update-feed/music/* $R/music/
mkdir -p $R/source/lan $R/source/app
cp g*.js head.html build.sh pack.sh pack-app.sh release.sh $R/source/
cp lan/server.js lan/LISEZ-MOI*.txt "lan/Lancer le serveur (Windows).bat" "lan/Lancer le serveur (Mac-Linux).command" $R/source/lan/
cp $S/app/src/main.js $S/app/src/package.json $S/app/src/icon.png $S/app/icon.ico $R/source/app/ && cp $S/app/package.json $R/source/app/build-package.json
V=$(python3 -c "import json;print(json.load(open('$S/update-feed/version.json'))['version'])")
cd $R && git add -A && git -c user.name="Claude" -c user.email="noreply@anthropic.com" commit -q -m "Version $V du jeu

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01KNDgeEsrh1grdrzzdVwRCQ" && for i in 1 2 3 4; do git push -u origin jeu && break || sleep $((2**i)); done
