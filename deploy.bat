@echo off
echo ====================================
echo    Portfolio Deployment Helper
echo ====================================
echo.

echo Step 1: Checking Git status...
git status
echo.

echo Step 2: Adding any new changes...
git add .
echo.

echo Step 3: Creating commit...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Update portfolio

git commit -m "%commit_message%"
echo.

echo Step 4: Pushing to GitHub...
git push origin main
echo.

echo ====================================
echo Deployment completed!
echo Your changes have been pushed to GitHub.
echo Vercel will automatically deploy the updates.
echo ====================================

pause
