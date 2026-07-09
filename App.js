import React, { useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { AuthProvider } from './src/configs/authContext/authContext';
import { AppNavigator } from './src/navigation/appNavigator/appNavigator';
import { Platform } from 'react-native';

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemNavigationBar.setNavigationColor('#000000', 'light')
        .then(() => console.log('Navigation bar color set successfully'))
        .catch(error =>
          console.error('Failed to set navigation bar color:', error),
        );
    }
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
