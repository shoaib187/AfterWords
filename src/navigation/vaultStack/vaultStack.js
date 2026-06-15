import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens';

const Stack = createStackNavigator();

const VaultStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="VaultHome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="VaultHome" component={screens.VaultHome} />
    </Stack.Navigator>
  );
};

export { VaultStack };
