```tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const AnimatedLine = Animated.createAnimatedComponent(Line);

export default function GlitchRadar({ proximity }: { proximity: number }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 2000, easing: Easing.linear }), -1, false);
  }, [rotation]);

  const animatedProps = useAnimatedProps(() => ({
    transform: `rotate(${rotation.value}, 50, 50)`,
  }));

  const normalized = Math.min(proximity, 999);
  const dotRadius = Math.max(1, (999 - normalized) / 30);
  const dotX = 50 + (normalized / 999) * 40;
  const dotY = 50;

  return (
    <View style={styles.radar}>
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="none" stroke="#1f3a3f" strokeWidth="2" />
        <AnimatedLine x1="50" y1="50" x2="50" y2="5" stroke="#0ff" strokeWidth="1.5" animatedProps={animatedProps} />
        <Circle cx={dotX} cy={dotY} r={dotRadius} fill="#f00" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({ radar: { margin: 8 } });
```