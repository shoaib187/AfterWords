import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from '../authStack/authStack';
import { useAuth } from '../../configs/authContext/authContext';
import { TabNavigator } from '../tabNavigator/tabNavigator';
import { StatusBar } from 'react-native';
import { COLORS } from '../../components/constants/color';

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.BLACK} />
      {!isAuthenticated ? <AuthStack /> : <TabNavigator />}
    </NavigationContainer>
  );
};

export { AppNavigator };
