```tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, StatusBar, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useDetector } from '../hooks/useDetector';
import { useLevel } from '../hooks/useLevel';
import AnalogMeter from '../components/RemoteDeviceUI/AnalogMeter';
import GlitchRadar from '../components/RemoteDeviceUI/GlitchRadar';
import WaveformDisplay from '../components/RemoteDeviceUI/WaveformDisplay';
import ButtonPanel from '../components/RemoteDeviceUI/ButtonPanel';
import NotificationBar from '../components/RemoteDeviceUI/NotificationBar';
import { triggerHaptic } from '../utils/haptics';
import { translateSourceCode } from '../services/SourceCodeTranslator';
import LevelUpModal from '../components/LevelUpModal';

type MainNav = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export default function MainScreen() {
  const navigation = useNavigation<MainNav>();
  const { glitch, isScanning, scan, lock, openDoor } = useDetector();
  const { level, xp } = useLevel();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Pulse animation while scanning
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.95, duration: 800, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
    );
    if (isScanning) pulse.start();
    else { pulse.stop(); pulseAnim.setValue(1); }
    return () => pulse.stop();
  }, [isScanning, pulseAnim]);

  // Show level-up modal when level increases
  const prevLevelRef = useRef(level);
  useEffect(() => {
    if (level > prevLevelRef.current) {
      setShowLevelUp(true);
      triggerHaptic('notificationSuccess');
    }
    prevLevelRef.current = level;
  }, [level]);

  const handleOpenDoor = () => {
    const door = openDoor();
    if (door) {
      triggerHaptic('notificationSuccess');
      navigation.navigate('BackDoorExplorer', { wormholeId: door.id });
    } else {
      triggerHaptic('impactLight');
    }
  };

  const handleLock = () => {
    const success = lock();
    triggerHaptic(success ? 'notificationSuccess' : 'impactMedium');
  };

  const handleTranslate = () => {
    const secrets = translateSourceCode();
    // For now, we just show a notification; in a full app, display modal.
    triggerHaptic('selection');
    // secrets can be stored in state and rendered in a modal
  };

  return (
    <Animated.View style={[styles.remoteContainer, { transform: [{ scale: pulseAnim }] }]}>
      <StatusBar hidden />
      <View style={styles.clearanceBadge}>
        <NotificationBar message={`CLEARANCE LEVEL ${level}`} type="info" />
      </View>

      <View style={styles.topPanel}>
        <AnalogMeter label="GLITCH" value={glitch?.intensity ?? 0} />
        <GlitchRadar proximity={glitch?.proximityMeters ?? 999} />
        <AnalogMeter label="WORMHOLE STB" value={glitch ? 75 : 10} />
      </View>

      <WaveformDisplay glitch={glitch} />

      <View style={styles.xpBar}>
        <NotificationBar message={`XP: ${xp} / Next: ${(Math.ceil(xp / 100) * 100)}`} type="info" />
      </View>

      <ButtonPanel
        onScan={scan}
        onLock={handleLock}
        onOpenDoor={handleOpenDoor}
        onSoloLens={() => navigation.navigate('SoloLens')}
        onTranslate={handleTranslate}
        isScanning={isScanning}
        hasGlitch={!!glitch}
      />

      {showLevelUp && <LevelUpModal level={level} onClose={() => setShowLevelUp(false)} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  remoteContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 12,
    paddingTop: 60,
    paddingBottom: 20,
    borderWidth: 2,
    borderColor: '#1f3a3f',
    margin: 8,
    borderRadius: 18,
  },
  clearanceBadge: { position: 'absolute', top: 30, right: 20 },
  topPanel: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  xpBar: { marginTop: 10 },
});
```