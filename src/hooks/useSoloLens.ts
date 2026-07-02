```typescript
import { useState, useCallback, useEffect } from 'react';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { soloLensProcessor, captureEmptyBackground } from '../services/SoloLensProcessor';
import { runOnJS } from 'react-native-reanimated';

export function useSoloLens() {
  const device = useCameraDevice('back');
  const [isActive, setIsActive] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [emptyBgReady, setEmptyBgReady] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  // Capture empty background once before enabling
  const prepareLens = useCallback(async () => {
    const bg = await captureEmptyBackground();
    if (bg) {
      setEmptyBgReady(true);
      setIsActive(true);
    }
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    if (isActive) {
      soloLensProcessor(frame);
    }
  }, [isActive]);

  const toggleLens = useCallback(() => {
    if (!isActive && !emptyBgReady) {
      runOnJS(prepareLens)();
    } else {
      setIsActive(prev => !prev);
    }
  }, [isActive, emptyBgReady, prepareLens]);

  return { device, hasPermission, isActive, frameProcessor, toggleLens };
}
```