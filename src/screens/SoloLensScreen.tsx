```tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { useSoloLens } from '../hooks/useSoloLens';
import { useNavigation } from '@react-navigation/native';

export default function SoloLensScreen() {
  const { device, hasPermission, isActive, frameProcessor, toggleLens } = useSoloLens();
  const navigation = useNavigation();

  if (!device || !hasPermission) {
    return (
      <View style={styles.fallback}>
        <Text style={{ color: '#fff' }}>Camera unavailable</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#0ff' }}>Exit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={isActive ? frameProcessor : undefined}
      />
      <View style={styles.overlay}>
        <Text style={styles.statusText}>
          {isActive ? 'SOLO LENS ACTIVE – LIFE ERASED' : 'SOLO LENS OFF'}
        </Text>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleLens}>
          <Text style={styles.buttonText}>
            {isActive ? 'DEACTIVATE' : 'ACTIVATE'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>EXIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  fallback: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  overlay: { position: 'absolute', bottom: 60, left: 0, right: 0, alignItems: 'center' },
  statusText: { color: '#0f0', fontSize: 16, marginBottom: 12, fontFamily: 'monospace' },
  toggleButton: { backgroundColor: '#1a3a3a', padding: 14, borderRadius: 8, marginBottom: 8 },
  backButton: { backgroundColor: '#333', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontFamily: 'monospace' },
});
```