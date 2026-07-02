```typescript
import { GlitchEvent, WormholeSignature } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { audioManager } from '../utils/audioManager';

type Listener = (glitch: GlitchEvent | null) => void;

class DetectorEngine {
  activeGlitch: GlitchEvent | null = null;
  private wormholeLocked = false;
  private listeners: Listener[] = [];
  private decayTimer: NodeJS.Timeout | null = null;

  subscribe(cb: Listener) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  scanForGlitches() {
    // Realistic detection probability based on current level
    const chance = Math.min(0.25, 0.05 + levelSystem.level * 0.01);
    if (Math.random() < chance) {
      const glitch: GlitchEvent = {
        type: Math.random() < 0.2 ? 'critical' : Math.random() < 0.5 ? 'major' : 'minor',
        intensity: 30 + Math.random() * 70,
        proximityMeters: 5 + Math.random() * 500,
        decayTime: 7000 + Math.random() * 8000,
      };
      this.activeGlitch = glitch;
      audioManager.play('scanning');
      this.notify(glitch);
      this.decayTimer = setTimeout(() => this.clearGlitch(), glitch.decayTime);
    } else {
      this.clearGlitch();
    }
  }

  attemptLock(): boolean {
    if (!this.activeGlitch) return false;
    const success = Math.random() < this.activeGlitch.intensity / 100;
    if (success) {
      this.wormholeLocked = true;
      audioManager.play('lock_on');
    }
    return success;
  }

  openBackDoor(): WormholeSignature | null {
    if (!this.wormholeLocked || !this.activeGlitch) return null;
    this.wormholeLocked = false;
    const themes = ['rain', 'sun', 'night', 'abandoned', 'industrial'] as const;
    const signature: WormholeSignature = {
      id: uuidv4(),
      latitude: 35.6895 + (Math.random() - 0.5) * 0.01,
      longitude: 139.6917 + (Math.random() - 0.5) * 0.01,
      timestamp: Date.now(),
      stability: 65 + Math.random() * 35,
      resonanceFingerprint: uuidv4().slice(0, 8),
      locationName: 'Unknown Coordinates',
      dimensionTheme: themes[Math.floor(Math.random() * themes.length)],
      saved: false,
    };
    audioManager.play('door_open');
    this.clearGlitch();
    return signature;
  }

  private clearGlitch() {
    if (this.decayTimer) clearTimeout(this.decayTimer);
    this.activeGlitch = null;
    this.wormholeLocked = false;
    this.notify(null);
  }

  private notify(glitch: GlitchEvent | null) {
    this.listeners.forEach(cb => cb(glitch));
  }
}

export const detectorEngine = new DetectorEngine();
```