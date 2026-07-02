```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props { message: string; type?: 'info' | 'warning' | 'success'; }

export default function NotificationBar({ message, type = 'info' }: Props) {
  const color = type === 'warning' ? '#f90' : type === 'success' ? '#0f0' : '#0ff';
  return (
    <View style={[styles.bar, { borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { borderWidth: 1, padding: 8, borderRadius: 4, backgroundColor: '#111', marginVertical: 4 },
  text: { fontFamily: 'monospace', fontSize: 11 },
});
```