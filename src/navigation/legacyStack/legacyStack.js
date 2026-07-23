import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens';

const Stack = createStackNavigator();

const LegacyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LegacyGifts"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="LegacyGifts" component={screens.LegacyGifts} />
      <Stack.Screen name="GiftDetails" component={screens.GiftDetails} />
      <Stack.Screen name="MessageDetails" component={screens.MessageDetails} />
      <Stack.Screen name="FamilyTree" component={screens.FamilyTree} />
    </Stack.Navigator>
  );
};

export { LegacyStack };
