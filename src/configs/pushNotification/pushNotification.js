import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import axios from 'axios';

// render this in app.js or app.tsx

export const usePushNotification = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      // 1. Request permission (iOS only, Android 13+ handles via manifest)
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // 2. Get the FCM Token
        const fcmToken = await messaging().getToken();
        console.log('FCM Token:', fcmToken);

        // 3. Send token to your backend API
        await axios.patch('/api/users/notifications/token', { fcmToken });
      }
    };

    setupNotifications();

    // Listen for foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      alert('A new FCM message arrived! ' + JSON.stringify(remoteMessage.notification));
    });

    return unsubscribe;
  }, []);
};