// cameraPermission.js
import { Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

const CAMERA_PERMISSION =
  Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

export const checkCameraPermission = async () => {
  try {
    const status = await check(CAMERA_PERMISSION);

    switch (status) {
      case RESULTS.GRANTED:
        return true;

      case RESULTS.DENIED: {
        const requestStatus = await request(CAMERA_PERMISSION);
        return requestStatus === RESULTS.GRANTED;
      }

      case RESULTS.BLOCKED:
        await openSettings();
        return false;

      case RESULTS.UNAVAILABLE:
      default:
        return false;
    }
  } catch (error) {
    console.log('Camera Permission Error:', error);
    return false;
  }
};
