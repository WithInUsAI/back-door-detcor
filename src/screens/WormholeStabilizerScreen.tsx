```tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { backDoorManager } from '../services/BackDoorManager';
import { levelSystem } from '../services/LevelSystem';
import { triggerHaptic } from '../utils/haptics';
import { audioManager } from '../utils/audioManager';

type StabilizerRoute = RouteProp<RootStackParamList, 'Stabilizer'>;

export default function WormholeStabilizerScreen() {
  const route = useRoute<StabilizerRoute>();
  const navigation = useNavigation();
  const { wormholeId } = route.params;
  const wormhole = backDoorManager.getDoor(wormholeId);
  const [stability, setStability] = useState(wormhole?.stability ?? 50);
  const [gameOver, setGameOver] = useState(false);
  const dialAngle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!wormhole) {
      navigation.goBack();
      return;
    }
    const interval = setInterval(() => {
      if (gameOver) return;
      setStability(prev => {
        const decay = 1.2;
        const next = Math.max(0, prev - decay);
        if (next <= 0) {
          setGameOver(true);
          triggerHaptic('impactMedium');
          audioManager.play('emergency_seal');
          setTimeout(() => navigation.goBack(), 1500);
        }
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [wormhole, gameOver, navigation]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        triggerHaptic('impactLight');
      },
      onPanResponderMove: (_, gesture) => {
        if (gameOver) return;
        // Moving finger vertically adjusts stability
        const delta = -gesture.dy * 0.2; // up increases stability
        setStability(prev => Math.min(100, Math.max(0, prev + delta)));
        Animated.timing(dialAngle, {
          toValue: delta > 0 ? 30 : -30,
          duration: 50,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderRelease: () => {
        Animated.spring(dialAngle, { toValue: 0, useNativeDriver: true }).start();
      },
    }),
  )?.current;

  const dialTransform = {
    transform: [{ rotate: dialAngle.interpolate({ inputRange: [-30, 30], outputRange: ['-15deg', '15deg'] }) }],
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.title}>WORMHOLE STABILIZER</Text>
      <Animated.View style={[styles.dialContainer, dialTransform]}>
        <View style={styles.dial} />
      </Animated.View>
      <Text style={[styles.stabilityText, { color: stability < 30 ? '#f00' : '#0f0' }]}>
        STABILITY: {stability.toFixed(0)}%
      </Text>
      {gameOver ? (
        <Text style={styles.gameOver}>BACK DOOR COLLAPSED</Text>
      ) : (
        <Text style={styles.instruction}>Slide finger to balance resonance</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001a1a', justifyContent: 'center', alignItems: 'center' },
  title: { color: '#0ff', fontSize: 24, fontFamily: 'monospace', marginBottom: 40 },
  dialContainer: { marginBottom: 30 },
  dial: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#0ff', backgroundColor: '#0a2a2a' },
  stabilityText: { fontSize: 32, fontFamily: 'monospace', marginTop: 20 },
  instruction: { color: '#666', marginTop: 30, fontFamily: 'monospace' },
  gameOver: { color: '#f00', fontSize: 20, fontFamily: 'monospace', marginTop: 30 },
});
```