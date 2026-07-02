```typescript
import { VisionCameraProxy, Frame } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';

// The native plugin we just created
const plugin = VisionCameraProxy.initFrameProcessorPlugin('EraseLifePlugin', {});

// Store a reference background image (captured once)
let emptyBackground: string | null = null; // base64

export async function captureEmptyBackground(): Promise<string | null> {
  // Use photo capture API to take a picture when no people are in frame.
  // This function is called from the UI before activating the lens.
  // Implementation omitted for brevity, but it returns a base64 image.
  return null;
}

export function soloLensProcessor(frame: Frame) {
  'worklet';
  if (plugin == null) return;
  // Pass the empty background as a parameter
  plugin.call(frame, { background: emptyBackground });
}
```