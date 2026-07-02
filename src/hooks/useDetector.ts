```typescript
import { useState, useEffect } from 'react';
import { detectorEngine } from '../services/DetectorEngine';
import { GlitchEvent } from '../types';
import { backDoorManager } from '../services/BackDoorManager';
import { levelSystem } from '../services/LevelSystem';

export function useDetector() {
  const [glitch, setGlitch] = useState<GlitchEvent | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const unsub = detectorEngine.subscribe(setGlitch);
    backDoorManager.load();
    return unsub;
  }, []);

  const scan = () => {
    setIsScanning(true);
    detectorEngine.scanForGlitches();
    // Scanning animation lasts 3s
    setTimeout(() => setIsScanning(false), 3000);
  };

  const lock = (): boolean => {
    const success = detectorEngine.attemptLock();
    if (success) {
      levelSystem.addXP(20);
    }
    return success;
  };

  const openDoor = () => {
    const door = detectorEngine.openBackDoor();
    if (door) {
      backDoorManager.saveDoor(door);
      levelSystem.addXP(50);
      return door;
    }
    return null;
  };

  return { glitch, isScanning, scan, lock, openDoor };
}
```