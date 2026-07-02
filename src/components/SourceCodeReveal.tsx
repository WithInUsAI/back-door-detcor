```tsx
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface Props { secret: string; }

export function SourceCodeReveal({ secret }: Props) {
  const fadeAnim = new Animated.Value(0);
  React.useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, [secret]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.label}>SOURCE CODE FRAGMENT:</Text>
      <Text style={styles.text}>{secret}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 16,
    backgroundColor: 'rgba(0,20,20,0.85)',
    borderLeftWidth: 3,
    borderLeftColor: '#0ff',
    borderRadius: 4,
  },
  label: { color: '#0ff', fontFamily: 'monospace', fontSize: 12, marginBottom: 6 },
  text: { color: '#fff', fontFamily: 'monospace', fontSize: 14, lineHeight: 22 },
});
```