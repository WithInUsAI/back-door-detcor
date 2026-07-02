```typescript
import { storage } from '../utils/storage';
import { ClearanceLevel } from '../types';
import { LEVELS } from '../constants/levelData';

class LevelSystem {
  xp = 0;
  level: ClearanceLevel = 1;

  constructor() {
    this.loadState();
  }

  addXP(amount: number) {
    this.xp += amount;
    const newLevel = this.calculateLevel();
    if (newLevel > this.level) {
      this.level = newLevel as ClearanceLevel;
    }
    this.saveState();
  }

  private calculateLevel(): number {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (this.xp >= LEVELS[i].xp) return LEVELS[i].level;
    }
    return 1;
  }

  private async saveState() {
    await storage.set('level', JSON.stringify({ xp: this.xp, level: this.level }));
  }

  private async loadState() {
    const data = await storage.get('level');
    if (data) {
      try {
        const { xp, level } = JSON.parse(data);
        this.xp = xp ?? 0;
        this.level = level ?? 1;
      } catch {}
    }
  }
}

export const levelSystem = new LevelSystem();
```