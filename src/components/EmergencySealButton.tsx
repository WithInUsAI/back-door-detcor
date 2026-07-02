```tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { audioManager } from '../utils/audioManager';

export default function EmergencySealButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => {
        audioManager.play('emergency_seal');
        onPress();
      }}>
      <Text style={styles.text}>EMERGENCY SEAL</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#f00',
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#200',
    alignSelf: 'center',
  },
  text: { color: '#f00', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 16 },
});
```