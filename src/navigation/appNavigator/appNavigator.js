import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from '../authStack/authStack';

import { COLORS } from '../../components/constants/color';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.WHITE} barStyle={'dark-content'} />
      <AuthStack />
    </NavigationContainer>
  );
};

export { AppNavigator };
