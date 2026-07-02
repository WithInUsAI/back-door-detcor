```tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import SoloLensScreen from '../screens/SoloLensScreen';
import BackDoorExplorerScreen from '../screens/BackDoorExplorerScreen';
import WormholeStabilizerScreen from '../screens/WormholeStabilizerScreen';

export type RootStackParamList = {
  Main: undefined;
  SoloLens: undefined;
  BackDoorExplorer: { wormholeId: string };
  Stabilizer: { wormholeId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="SoloLens" component={SoloLensScreen} />
      <Stack.Screen name="BackDoorExplorer" component={BackDoorExplorerScreen} />
      <Stack.Screen name="Stabilizer" component={WormholeStabilizerScreen} />
    </Stack.Navigator>
  );
}
```