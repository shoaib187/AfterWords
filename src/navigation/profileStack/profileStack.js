import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileSettings"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="ProfileSettings"
        component={screens.ProfileSettings}
      />
      <Stack.Screen
        name="RecipientDirectory"
        component={screens.RecipientDirectory}
      />
      <Stack.Screen name="NewRecipient" component={screens.NewRecipient} />
      <Stack.Screen name="FamilyTree" component={screens.FamilyTree} />
      <Stack.Screen
        name="AccountRecovery"
        component={screens.AccountRecovery}
      />
      <Stack.Screen name="EstateExecutor" component={screens.EstateExecutor} />
      <Stack.Screen
        name="SecurityAndPrivacy"
        component={screens.SecurityAndPrivacy}
      />
      <Stack.Screen name="Subscription" component={screens.Subscription} />
      <Stack.Screen
        name="TrustedDelegates"
        component={screens.TrustedDelegates}
      />
    </Stack.Navigator>
  );
};

export { ProfileStack };
