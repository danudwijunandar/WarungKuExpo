@echo off
echo ========================================
echo   WARUNGKU - EAS Build Quick Setup
echo ========================================
echo.

:menu
echo Pilih opsi:
echo 1. Install EAS CLI (Global)
echo 2. Login ke Expo Account
echo 3. Build APK untuk Android
echo 4. Check Build Status
echo 5. Exit
echo.
set /p choice="Masukan pilihan (1-5): "

if "%choice%"=="1" (
    echo.
    echo Installing EAS CLI...
    call npm install -g eas-cli
    echo.
    echo ✓ EAS CLI installed successfully!
    pause
    cls
    goto menu
)

if "%choice%"=="2" (
    echo.
    echo Login to Expo Account...
    call eas login
    echo.
    echo ✓ Login successful!
    pause
    cls
    goto menu
)

if "%choice%"=="3" (
    echo.
    echo Building APK for Android (Development)...
    echo This will take 5-15 minutes
    echo.
    call eas build --platform android --profile development
    echo.
    echo ✓ Build completed! Check your Expo dashboard for download link
    pause
    cls
    goto menu
)

if "%choice%"=="4" (
    echo.
    echo Checking build status...
    call eas build:list
    pause
    cls
    goto menu
)

if "%choice%"=="5" (
    exit /b
)

echo Invalid choice. Please try again.
pause
cls
goto menu
