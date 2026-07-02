```typescript
import { WormholeSignature } from '../types';
import { storage } from '../utils/storage';

class BackDoorManager {
  private doors: WormholeSignature[] = [];

  async load() {
    const data = await storage.get('wormholes');
    if (data) {
      try { this.doors = JSON.parse(data); } catch {}
    }
  }

  async saveDoor(door: WormholeSignature) {
    door.saved = true;
    this.doors.push(door);
    await this.persist();
  }

  getDoor(id: string): WormholeSignature | undefined {
    return this.doors.find(d => d.id === id);
  }

  getAllDoors(): WormholeSignature[] {
    return this.doors;
  }

  private async persist() {
    await storage.set('wormholes', JSON.stringify(this.doors));
  }
}

export const backDoorManager = new BackDoorManager();
```