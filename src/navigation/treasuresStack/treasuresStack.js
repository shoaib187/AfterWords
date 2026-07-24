import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens';

const Stack = createStackNavigator();

const TreasuresStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="TreasuresHome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="TreasuresHome" component={screens.MyTreasures} />
      <Stack.Screen
        name="AddToCollections"
        component={screens.AddToCollections}
      />
      <Stack.Screen
        name="TreasureDetails"
        component={screens.TreasureDetails}
      />
      <Stack.Screen name="EditTreasure" component={screens.EditTreasure} />
      <Stack.Screen
        name="VaultItemDetail"
        component={screens.VaultItemDetail}
      />
    </Stack.Navigator>
  );
};

export { TreasuresStack };
