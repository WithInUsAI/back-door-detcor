```typescript
import { SECRET_POOL } from '../constants/sourceCodeSecrets';
import { SourceCodeSecret } from '../types';
import { levelSystem } from './LevelSystem';

export function translateSourceCode(): SourceCodeSecret[] {
  const clearance = levelSystem.level;
  const available = SECRET_POOL.filter(s => s.clearanceRequired <= clearance);
  if (available.length === 0) return [];
  const count = Math.min(1 + Math.floor(Math.random() * 3), available.length);
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
```