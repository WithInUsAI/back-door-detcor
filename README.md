Back Door Detcor

The universe runs on code. Find its back doors.
A breakthrough‑technology dimension‑detection instrument disguised as an interactive remote controller.

---

https://img.shields.io/badge/React%20Native-0.73-blue https://img.shields.io/badge/TypeScript-5.3-blue https://img.shields.io/badge/license-MIT-green

Back Door Detcor turns your phone into a handheld reality‑scanning terminal.
Detect glitches in the source code of reality, lock onto unstable wormholes, and step through back doors into solo dimensions – perfect, empty copies of Earth where you are the only conscious being.

It combines a meticulously designed remote‑controller UI, real‑time scanning mechanics, an augmented‑reality Solo Lens that erases all life from your camera feed, a 30‑level progression system, and a source‑code translator that reveals the universe’s hidden secrets.

---

📱 Features

Feature Description
Reality Glitch & Wormhole Detector Scan for dimensional tears; lock onto the anomaly and open a back door before it collapses.
Solo Dimensions Enter an empty Earth at the same moment in time – rain‑soaked alleys, silent airports, sun‑bleached boardwalks. Every door leads to a unique, eerily realistic environment.
AR Solo Lens Activate your camera and watch all life disappear in real time. Powered by MediaPipe person‑segmentation (native frame processor plugin).
Source Code Translator Decode raw reality code into unsettling secrets, cryptic tips, and warnings. Higher clearance levels unlock deeper truths.
Remote Controller UI A fully interactive device chassis with working analog meters, radar, waveform display, and tactile buttons. The phone feels like a dedicated instrument.
30 Clearance Levels Progress from Rift Novice to Architect of the Back Doors. Each level unlocks new abilities, longer door durations, enhanced AR, and the ultimate Primal Back Door.
Wormhole Stabilizer Minigame Balance resonance dials to prevent a back door from collapsing – a tense, skill‑based challenge.
Persistent Storage All wormholes, XP, and clearance are saved locally using AsyncStorage.

---

🧰 Tech Stack

· React Native 0.73 (TypeScript)
· React Navigation 6 (native stack)
· react-native-vision-camera + custom frame processor for AR
· react-native-reanimated & react-native-svg for smooth animations
· MediaPipe (via native plugin) for person segmentation
· AsyncStorage for data persistence
· react-native-sound for atmospheric audio

---

📂 Project Structure

```
src/
├── App.tsx                   # Root component
├── navigation/
│   └── RootNavigator.tsx
├── screens/
│   ├── MainScreen.tsx         # Remote controller
│   ├── SoloLensScreen.tsx     # Camera AR view
│   ├── BackDoorExplorerScreen.tsx  # Inside a solo dimension
│   └── WormholeStabilizerScreen.tsx
├── components/
│   ├── RemoteDeviceUI/        # Meters, radar, waveform, buttons, notifications
│   ├── SourceCodeReveal.tsx
│   ├── LevelUpModal.tsx
│   └── EmergencySealButton.tsx
├── services/
│   ├── DetectorEngine.ts      # Glitch/wormhole logic
│   ├── BackDoorManager.ts     # Save/load wormholes
│   ├── SourceCodeTranslator.ts# Secrets pool
│   ├── LevelSystem.ts         # XP & clearance progression
│   └── SoloLensProcessor.ts   # Frame processor integration
├── hooks/
│   ├── useDetector.ts
│   ├── useLevel.ts
│   └── useSoloLens.ts
├── types/
│   └── index.ts
├── constants/
│   ├── levelData.ts
│   ├── sourceCodeSecrets.ts   # 200+ secrets
│   └── themeColors.ts
└── utils/
    ├── audioManager.ts
    ├── haptics.ts
    └── storage.ts
```

---

🚀 Getting Started

Prerequisites

· Node ≥ 18
· Yarn or npm
· CocoaPods (iOS)
· Android Studio (for Android)
· For the AR Solo Lens: MediaPipe segmentation model (selfie_segmenter.tflite) placed in the correct native directories (see Native Plugin Setup).

Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-org/back-door-detcor.git
   cd back-door-detcor
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. iOS only
   ```bash
   cd ios && pod install && cd ..
   ```
4. Link assets (audio & images)
   The project uses react-native.config.js to link assets automatically. If needed, run:
   ```bash
   npx react-native-asset
   ```
5. Start the development server
   ```bash
   npx react-native start
   ```
6. Run on device/simulator
   ```bash
   npx react-native run-ios
   # or
   npx react-native run-android
   ```

---

🧠 Native Plugin Setup (AR Solo Lens)

The Solo Lens feature requires a native frame processor that uses MediaPipe Selfie Segmentation to remove people from the live camera feed.

iOS

1. Add the EraseLifePlugin.swift and its bridging header to your Xcode project.
2. Install the MediaPipe ImageSegmenter via CocoaPods:
   ```ruby
   pod 'MediaPipeTasksVision'
   ```
3. Place the selfie_segmenter.tflite model in your app bundle.

Android

1. Add the EraseLifePluginModule.java and EraseLifePluginPackage.java to android/app/src/main/java/com/backdoordetcor/.
2. Register the package in MainApplication.java:
   ```java
   packages.add(new EraseLifePluginPackage());
   ```
3. Add the MediaPipe dependency to android/app/build.gradle:
   ```groovy
   implementation 'com.google.mediapipe:tasks-vision:0.10.9'
   ```
4. Place the .tflite model in android/app/src/main/assets/.

Note: Without the native plugin, the app still runs—the Solo Lens will show a placeholder view. All other features (scanning, doors, stabilizer, translation) work perfectly.

---

🎮 How to Use

1. Scanning for Glitches

Tap SCAN. The radar sweeps and the waveform jumps. If a glitch is detected, its intensity, proximity, and decay time appear on the meters.

2. Locking onto a Wormhole

Press LOCK while a glitch is active. The higher the intensity, the better the chance.

3. Opening a Back Door

Once locked, tap OPEN DOOR. You’ll be transported to a solo dimension – an identical Earth without people. Explore eerie themed environments; each wormhole you discover stays in your log.

4. Solo Lens (AR)

Press SOLO LENS to open your camera. After capturing an empty background (first use), the lens erases every person in the frame in real time. Toggle on/off to compare the real world with its lifeless echo.

5. Source Code Translator

Hit TRANSLATE to reveal fragments of reality’s source code. Secrets range from cryptic tips to disturbing warnings – your clearance level determines how deep you can see.

6. Wormhole Stabilizer

For high‑level doors, you must balance the resonance. Slide your finger up/down to keep the wormhole from collapsing.

7. Progression

Every scan, lock, door opening, and translation earns XP. As you level up, new abilities unlock and the device interface evolves.

---

🏆 Level System (1–30)

Tier Levels Highlights
Observer 1–10 Basic scanning, first doors, Solo Lens
Walker 11–20 Stabilizer minigame, deeper secrets, enhanced AR
Reality Hacker 21–29 Nested dimensions, source code edits, time dilation
Architect 30 Unlock the Primal Back Door – the blueprint of reality

---

📦 Assets

The app expects the following asset files (replace with your own creative content):

```
assets/
├── audio/
│   ├── scanning.wav
│   ├── lock_on.wav
│   ├── door_open.wav
│   ├── emergency_seal.wav
│   └── ambience_*.mp3
├── backdoors/
│   ├── rain_city.png
│   ├── sun_boardwalk.png
│   ├── night_alleys.png
│   ├── abandoned_terminal.png
│   └── industrial.png
```

You can use any audio/image files – for testing, silent audio and solid‑color images work.

---

🤝 Contributing

Contributions are welcome – especially for expanding the secrets pool, adding more dimension themes, or improving the AR segmentation pipeline.

1. Fork the repo
2. Create a feature branch (git checkout -b feature/awesome-feature)
3. Commit your changes
4. Push and open a Pull Request

---

📄 License

 © 2025 WithIn Us AI

---
