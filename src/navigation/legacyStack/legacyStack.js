import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens';

const Stack = createStackNavigator();

const LegacyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LegacyHome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="LegacyHome" component={screens.MyLagacies} />
      <Stack.Screen name="LegacyDetails" component={screens.LegacyDetails} />
      <Stack.Screen name="GiftsScreen" component={screens.GiftsScreen} />
      <Stack.Screen name="MessageDetails" component={screens.MessageDetails} />
    </Stack.Navigator>
  );
};

export { LegacyStack };
