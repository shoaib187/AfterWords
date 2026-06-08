import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions';

export const requestAllPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const statuses = await requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        // For Media (Android 13+)
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
      ]);

      console.log('Permission Statuses:', statuses);

      // Simple logic to check if all were granted
      const allGranted = Object.values(statuses).every(
        (status) => status === RESULTS.GRANTED
      );

      if (allGranted) {
        console.log('All permissions granted');
      } else {
        console.log('Some permissions were denied');
      }

      return statuses;
    } catch (error) {
      console.error('Permission Request Error:', error);
    }
  }
};