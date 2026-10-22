@echo off
title Clash of Heroes - serveur
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js n est pas installe. Telecharge-le sur https://nodejs.org puis relance ce fichier. & pause & exit /b)
node server.js
pause
