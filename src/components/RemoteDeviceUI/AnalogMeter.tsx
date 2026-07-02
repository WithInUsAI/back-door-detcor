```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';

interface Props { label: string; value: number; }

export default function AnalogMeter({ label, value }: Props) {
  const angle = (Math.min(value, 100) / 100) * 270 - 135; // range -135° to 135°
  const rad = (angle * Math.PI) / 180;
  const cx = 40, cy = 40, r = 30;
  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);

  return (
    <View style={styles.container}>
      <Svg width="80" height="80" viewBox="0 0 80 80">
        <Circle cx="40" cy="40" r="35" fill="none" stroke="#1f3a3f" strokeWidth="3" />
        <G stroke="#0ff" strokeWidth="2">
          <Path d={`M 40 40 L ${x} ${y}`} />
        </G>
        <Circle cx="40" cy="40" r="4" fill="#0ff" />
      </Svg>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value.toFixed(0)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginHorizontal: 8 },
  label: { color: '#888', fontSize: 10, fontFamily: 'monospace', marginTop: 4 },
  value: { color: '#0ff', fontSize: 14, fontFamily: 'monospace' },
});
```