```tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  onScan: () => void;
  onLock: () => void;
  onOpenDoor: () => void;
  onSoloLens: () => void;
  onTranslate: () => void;
  isScanning: boolean;
  hasGlitch: boolean;
}

export default function ButtonPanel({ onScan, onLock, onOpenDoor, onSoloLens, onTranslate, isScanning, hasGlitch }: Props) {
  return (
    <View style={styles.panel}>
      <TouchableOpacity style={[styles.btn, styles.scan]} onPress={onScan}>
        <Text style={styles.btnText}>{isScanning ? 'SCANNING...' : 'SCAN'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, styles.lock]} onPress={onLock} disabled={!hasGlitch}>
        <Text style={styles.btnText}>LOCK</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, styles.door]} onPress={onOpenDoor} disabled={!hasGlitch}>
        <Text style={styles.btnText}>OPEN DOOR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, styles.lens]} onPress={onSoloLens}>
        <Text style={styles.btnText}>SOLO LENS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, styles.translate]} onPress={onTranslate}>
        <Text style={styles.btnText}>TRANSLATE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 },
  btn: { padding: 12, margin: 5, borderRadius: 6, minWidth: 80, alignItems: 'center' },
  scan: { backgroundColor: '#052' },
  lock: { backgroundColor: '#331' },
  door: { backgroundColor: '#213' },
  lens: { backgroundColor: '#143' },
  translate: { backgroundColor: '#123' },
  btnText: { color: '#fff', fontFamily: 'monospace', fontSize: 10, fontWeight: 'bold' },
});
```