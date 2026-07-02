```typescript
export interface WormholeSignature {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: number;
  stability: number;
  resonanceFingerprint: string;
  locationName: string;
  dimensionTheme: 'rain' | 'sun' | 'night' | 'abandoned' | 'industrial';
  saved: boolean;
}

export interface GlitchEvent {
  type: 'minor' | 'major' | 'critical';
  intensity: number;       // 0–100
  proximityMeters: number; // 1–999
  decayTime: number;       // ms
}

export interface SourceCodeSecret {
  category: 'fact' | 'tip' | 'warning';
  text: string;
  clearanceRequired: number;
}

export type ClearanceLevel = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30;
```