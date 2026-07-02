```tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { backDoorManager } from '../services/BackDoorManager';
import { translateSourceCode } from '../services/SourceCodeTranslator';
import { SourceCodeReveal } from '../components/SourceCodeReveal';
import { audioManager } from '../utils/audioManager';
import { levelSystem } from '../services/LevelSystem';
import EmergencySealButton from '../components/EmergencySealButton';

type ExplorerRoute = RouteProp<RootStackParamList, 'BackDoorExplorer'>;

const themeImages: Record<string, any> = {
  rain: require('../../assets/backdoors/rain_city.png'),
  sun: require('../../assets/backdoors/sun_boardwalk.png'),
  night: require('../../assets/backdoors/night_alleys.png'),
  abandoned: require('../../assets/backdoors/abandoned_terminal.png'),
  industrial: require('../../assets/backdoors/industrial.png'),
};

export default function BackDoorExplorerScreen() {
  const route = useRoute<ExplorerRoute>();
  const navigation = useNavigation();
  const { wormholeId } = route.params;
  const wormhole = backDoorManager.getDoor(wormholeId);
  const [secret, setSecret] = useState('');

  useEffect(() => {
    if (!wormhole) {
      navigation.goBack();
      return;
    }
    audioManager.setAmbient(wormhole.dimensionTheme);
    const secrets = translateSourceCode();
    if (secrets.length > 0) setSecret(secrets[0].text);
    levelSystem.addXP(30);
  }, [wormhole, navigation]);

  if (!wormhole) return null;

  return (
    <ImageBackground source={themeImages[wormhole.dimensionTheme]} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.coords}>{wormhole.latitude.toFixed(4)}, {wormhole.longitude.toFixed(4)}</Text>
        <Text style={styles.stability}>WORMHOLE STABILITY: {Math.round(wormhole.stability)}%</Text>
        {secret ? <SourceCodeReveal secret={secret} /> : null}
        <EmergencySealButton onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'flex-end', padding: 24, backgroundColor: 'rgba(0,0,0,0.3)' },
  coords: { color: '#0ff', fontFamily: 'monospace', fontSize: 14, marginBottom: 4 },
  stability: { color: '#f90', fontFamily: 'monospace', fontSize: 12, marginBottom: 20 },
});
```