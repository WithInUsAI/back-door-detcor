```typescript
import Sound from 'react-native-sound';

// Enable playback in silence mode (iOS)
Sound.setCategory('Playback');

const sounds: Record<string, Sound> = {};

function loadSound(name: string, file: string) {
  const sound = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.warn(`Audio load failed: ${name}`, error);
    }
  });
  sounds[name] = sound;
  return sound;
}

// Pre‑load assets
loadSound('scanning', 'scanning.wav');
loadSound('lock_on', 'lock_on.wav');
loadSound('door_open', 'door_open.wav');
loadSound('emergency_seal', 'emergency_seal.wav');

export const audioManager = {
  play(name: string) {
    const s = sounds[name];
    if (s) {
      s.stop(() => s.play());
    }
  },
  stopAll() {
    Object.values(sounds).forEach(s => s.stop());
  },
  setAmbient(theme: string) {
    this.stopAll();
    const fileMap: Record<string, string> = {
      rain: 'ambience_rain.mp3',
      sun: 'ambience_sun.mp3',
      night: 'ambience_night.mp3',
      abandoned: 'ambience_abandoned.mp3',
      industrial: 'ambience_industrial.mp3',
    };
    const file = fileMap[theme];
    if (file) {
      loadSound('ambient', file);
      const ambient = sounds['ambient'];
      if (ambient) {
        ambient.setNumberOfLoops(-1);
        ambient.play();
      }
    }
  },
};
```