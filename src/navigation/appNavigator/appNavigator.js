import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from '../authStack/authStack';
import { useAuth } from '../../configs/authContext/authContext';
import { TabNavigator } from '../tabNavigator/tabNavigator';
import { StatusBar } from 'react-native';
import { COLORS } from '../../components/constants/color';
import { requestAudioPermission } from '../../utils/audioPermissions/audioPermissions';
import { checkCameraPermission } from '../../utils/cameraPermission/cameraPermission';

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Request permissions after component mounts
    const requestPermissions = async () => {
      try {
        // Request audio permission
        const audioGranted = await requestAudioPermission();
        console.log('Audio permission granted:', audioGranted);

        // Check camera permission (it will request if needed)
        const cameraGranted = await checkCameraPermission();
        console.log('Camera permission granted:', cameraGranted);
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    };

    // Delay permission requests slightly to avoid any race conditions
    const timeoutId = setTimeout(() => {
      requestPermissions();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar animated backgroundColor={COLORS.BLACK} />
      {!isAuthenticated ? <AuthStack /> : <TabNavigator />}
    </NavigationContainer>
  );
};

export { AppNavigator };
