import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="GettingStarted"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="GettingStarted" component={screens.GettingStarted} />
      <Stack.Screen name="MPin" component={screens.MPin} />
      <Stack.Screen name="Organization" component={screens.Organization} />
      <Stack.Screen name="Location" component={screens.Location} />
      <Stack.Screen name="Login" component={screens.Login} />
      <Stack.Screen name="EventTypes" component={screens.EventTypes} />
    </Stack.Navigator>
  );
};

export { AuthStack };
