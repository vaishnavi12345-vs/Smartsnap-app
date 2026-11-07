# SmartSnap

A photography-first React Native app built with Expo and Expo Router. This repository contains the first usable, local-first MVP for capturing, browsing, and making simple edits to photographs.

## What works

- **Home dashboard** with camera access, quick tools, and inspiration.
- **Camera** with front/rear switching, flash toggle, a composition grid, and photo capture.
- **Photo import** from the device library.
- **Gallery** that reads local photos after the user grants permission.
- **Photo editor** with reversible rotate/flip controls, reset, and a comparison-free original preview.
- **Save and share** edited JPEGs using the device's native library/share sheet.
- **Studio and profile** screens with clearly identified MVP capabilities and privacy information.
- Photos are processed locally; no account or image upload service is configured.

## Run locally

1. Install Node.js LTS and the Expo-compatible package manager.
2. Install dependencies: `npm install`.
3. Start Expo: `npx expo start`.
4. Open the QR code in Expo Go, or run `npm run android` / `npm run ios` on a configured device/simulator.

Camera and media-library features require a physical device or a compatible simulator and the relevant permissions. For native builds, use `npx expo prebuild` followed by the normal Android/iOS build workflow.

## MVP boundaries

AI enhancement, background/object removal, advanced color controls, crop UI, filters that alter exported pixels, cloud accounts, social/community features, and production subscriptions require additional implementation and/or external services. The editor labels unfinished tools instead of suggesting they are already applied. The remote photography images on the Home and Studio screens are visual inspiration only; device photos remain local.

## Privacy

The app requests camera and photo-library access only when those features are used. Captured or selected images are edited on-device and are not sent to a backend. Review the platform permission prompts before granting access.
