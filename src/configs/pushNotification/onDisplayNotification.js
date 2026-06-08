import notifee, { AndroidImportance } from '@notifee/react-native';

export default async function onDisplayNotification(remoteMessage) {
  try {
    await notifee.requestPermission();

    // 1. Create Channel with Sound enabled
    const channelId = await notifee.createChannel({
      id: 'sound_channel_v2',
      name: 'Default Sound Channel',
      importance: AndroidImportance.HIGH,
      // sound: 'default', // Specifically triggers the default system sound
      sound: 'notification_ding', // File name without .mp3
      badge: true,
    });

    // 2. Display the notification
    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'No Title',
      body: remoteMessage.notification?.body || 'No Body',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        sound: 'notification_ding', // Ensures sound plays on Android
        pressAction: {
          id: 'default',
        },
        smallIcon: 'ic_launcher',
      },
      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true, // Ensures sound plays on iOS foreground
          banner: true,
        },
      },
    });
  } catch (error) {
    console.error('Notifee Display Error:', error);
  }
}