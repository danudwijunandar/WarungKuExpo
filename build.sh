#!/bin/bash

echo "========================================"
echo "  WARUNGKU - EAS Build Quick Setup"
echo "========================================"
echo ""

while true; do
    echo "Pilih opsi:"
    echo "1. Install EAS CLI (Global)"
    echo "2. Login ke Expo Account"
    echo "3. Build APK untuk Android"
    echo "4. Check Build Status"
    echo "5. Exit"
    echo ""
    read -p "Masukan pilihan (1-5): " choice

    case $choice in
        1)
            echo ""
            echo "Installing EAS CLI..."
            npm install -g eas-cli
            echo ""
            echo "✓ EAS CLI installed successfully!"
            read -p "Tekan Enter untuk melanjutkan..."
            clear
            ;;
        2)
            echo ""
            echo "Login to Expo Account..."
            eas login
            echo ""
            echo "✓ Login successful!"
            read -p "Tekan Enter untuk melanjutkan..."
            clear
            ;;
        3)
            echo ""
            echo "Building APK for Android (Development)..."
            echo "This will take 5-15 minutes"
            echo ""
            eas build --platform android --profile development
            echo ""
            echo "✓ Build completed! Check your Expo dashboard for download link"
            read -p "Tekan Enter untuk melanjutkan..."
            clear
            ;;
        4)
            echo ""
            echo "Checking build status..."
            eas build:list
            read -p "Tekan Enter untuk melanjutkan..."
            clear
            ;;
        5)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid choice. Please try again."
            read -p "Tekan Enter untuk melanjutkan..."
            clear
            ;;
    esac
done
