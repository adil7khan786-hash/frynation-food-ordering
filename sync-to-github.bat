@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title FryNation - Auto Sync to GitHub
color 0B

echo ===================================================
echo       FRYNATION PAKISTAN - GITHUB AUTO-SYNC
echo ===================================================
echo.

:: 1. Force valid author name and email
for /f "delims=" %%i in ('git config user.name 2^>nul') do set CURRENT_NAME=%%i
for /f "delims=" %%i in ('git config user.email 2^>nul') do set CURRENT_EMAIL=%%i

if "%CURRENT_NAME%"=="" (
    echo [SETUP] Please enter your details for GitHub commits:
    echo.
    set /p IN_NAME="Enter your Full Name [Press Enter for Imran Malik]: "
    if "!IN_NAME!"=="" set IN_NAME=Imran Malik
    git config --global user.name "!IN_NAME!"
    echo Name set to: !IN_NAME!
)

if "%CURRENT_EMAIL%"=="" (
    set /p IN_EMAIL="Enter your GitHub Email address: "
    if "!IN_EMAIL!"=="" set IN_EMAIL=imran.dev@example.com
    git config --global user.email "!IN_EMAIL!"
    echo Email set to: !IN_EMAIL!
    echo.
)

:: Double check - if still empty, set default
for /f "delims=" %%i in ('git config user.name 2^>nul') do set CHECK_NAME=%%i
if "%CHECK_NAME%"=="" git config --global user.name "Imran Malik"
for /f "delims=" %%i in ('git config user.email 2^>nul') do set CHECK_EMAIL=%%i
if "%CHECK_EMAIL%"=="" git config --global user.email "imran.dev@example.com"

color 0B
:: 2. Ensure git repo and branch
if not exist ".git" (
    git init
)

git branch -M main >nul 2>nul

:: Check if remote origin exists
git remote get-url origin >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Please paste your GitHub Repository URL.
    echo Example: https://github.com/your-username/frynation-food-ordering.git
    echo.
    set /p REPO_URL="Enter GitHub Repository URL: "
    git remote add origin !REPO_URL!
    echo [OK] Remote set to !REPO_URL!
    echo.
)

echo [1/3] Adding all updated files...
git add -A

echo [2/3] Creating commit...
git commit -m "Auto update website - %date% %time%"

echo [3/3] Uploading changes to GitHub...
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    color 0A
    echo ===================================================
    echo    SUCCESS! Your website is now live on GitHub!
    echo ===================================================
) else (
    echo.
    color 0E
    echo [!] Notice: If GitHub opens a Sign-In window in your browser,
    echo click 'Sign in with your browser' and authorize.
    echo Then run this batch file once more to finish!
)

echo.
echo Press any key to close this window...
pause >nul
