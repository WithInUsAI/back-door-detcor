```typescript
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export function triggerHaptic(type: 'selection' | 'impactLight' | 'impactMedium' | 'notificationSuccess') {
  const options = { enableVibrateFallback: true, ignoreAndroidSystemSettings: false };
  try {
    ReactNativeHapticFeedback.trigger(type, options);
  } catch {}
}
```