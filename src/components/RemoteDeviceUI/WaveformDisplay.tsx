```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GlitchEvent } from '../../types';

export default function WaveformDisplay({ glitch }: { glitch: GlitchEvent | null }) {
  const bars = Array.from({ length: 20 }).map((_, i) => (
    <View
      key={i}
      style={[
        styles.bar,
        {
          height: glitch ? 8 + Math.sin(i * 0.5 + Date.now() * 0.01) * 15 + 15 : 4,
          backgroundColor: glitch ? '#0ff' : '#333',
        },
      ]}
    />
  ));
  return <View style={styles.container}>{bars}</View>;
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 50, marginVertical: 10 },
  bar: { width: 4, marginHorizontal: 1, borderRadius: 1 },
});
```