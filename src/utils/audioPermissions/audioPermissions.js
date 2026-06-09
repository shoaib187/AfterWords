import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const MICROPHONE_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
});

export const checkAudioPermission = async () => {
  try {
    const status = await check(MICROPHONE_PERMISSION);

    switch (status) {
      case RESULTS.GRANTED:
        return true;
      case RESULTS.DENIED:
      case RESULTS.BLOCKED:
      case RESULTS.LIMITED:
      default:
        return false;
    }
  } catch (error) {
    console.error(
      'Error checking audio permission with react-native-permissions:',
      error,
    );
    return false;
  }
};

export const requestAudioPermission = async () => {
  try {
    const status = await request(MICROPHONE_PERMISSION);

    return status === RESULTS.GRANTED;
  } catch (error) {
    console.error(
      'Error requesting audio permission with react-native-permissions:',
      error,
    );
    return false;
  }
};
