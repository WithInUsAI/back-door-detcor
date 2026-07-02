```tsx
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { LEVELS } from '../constants/levelData';

interface Props { level: number; onClose: () => void; }

export default function LevelUpModal({ level, onClose }: Props) {
  const info = LEVELS.find(l => l.level === level);
  return (
    <Modal transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>CLEARANCE LEVEL {level}</Text>
          <Text style={styles.sub}>{info?.title}</Text>
          <Text style={styles.unlock}>NEW: {info?.unlocks}</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#0a2020', borderWidth: 2, borderColor: '#0ff', padding: 30, borderRadius: 12, width: '80%' },
  title: { color: '#0ff', fontSize: 24, fontFamily: 'monospace', textAlign: 'center' },
  sub: { color: '#fff', fontSize: 18, fontFamily: 'monospace', marginVertical: 8, textAlign: 'center' },
  unlock: { color: '#0f0', fontSize: 14, fontFamily: 'monospace', textAlign: 'center', marginBottom: 20 },
  closeBtn: { borderWidth: 1, borderColor: '#0ff', padding: 12, borderRadius: 6 },
  closeText: { color: '#0ff', fontFamily: 'monospace', textAlign: 'center' },
});
```