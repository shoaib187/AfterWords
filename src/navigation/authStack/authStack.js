import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens';
import { TabNavigator } from '../tabNavigator/tabNavigator';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="GettingStarted"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="GettingStarted" component={screens.GettingStarted} />
      <Stack.Screen name="Onboarding" component={screens.OnboardingScreen} />
      <Stack.Screen name="Register" component={screens.Register} />
      <Stack.Screen name="Login" component={screens.Login} />
      <Stack.Screen name="Secure" component={screens.SecureVault} />
      <Stack.Screen name="MPin" component={screens.MPin} />
      <Stack.Screen name="Roadmap" component={screens.Roadmap} />
      <Stack.Screen name="TabNavigation" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export { AuthStack };
