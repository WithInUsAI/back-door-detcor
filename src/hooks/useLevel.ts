```typescript
import { useState, useEffect } from 'react';
import { levelSystem } from '../services/LevelSystem';
import { ClearanceLevel } from '../types';

export function useLevel() {
  const [level, setLevel] = useState<ClearanceLevel>(levelSystem.level);
  const [xp, setXP] = useState(levelSystem.xp);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel(levelSystem.level);
      setXP(levelSystem.xp);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { level, xp };
}
```