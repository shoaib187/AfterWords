import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from '../authStack/authStack';
import { useAuth } from '../../configs/authContext/authContext';
import { TabNavigator } from '../tabNavigator/tabNavigator';

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <TabNavigator />}
    </NavigationContainer>
  );
};

export { AppNavigator };
