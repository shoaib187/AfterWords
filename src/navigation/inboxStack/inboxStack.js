import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens';

const Stack = createStackNavigator();

const InboxStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LegacyInbox"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="LegacyInbox" component={screens.LegacyInbox} />
    </Stack.Navigator>
  );
};

export { InboxStack };
