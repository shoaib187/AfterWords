import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens';

const Stack = createStackNavigator();

const TreasureStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="TreasureHome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="TreasureHome" component={screens.Home} />
      <Stack.Screen name="CreateTreasure" component={screens.CreateTreasure} />
      <Stack.Screen
        name="AddMessageDetails"
        component={screens.AddMessageDetails}
      />
      <Stack.Screen name="Review" component={screens.ReviewSummary} />
      <Stack.Screen
        name="VideoMessagePreview"
        component={screens.VideoMessagePreview}
      />
      <Stack.Screen name="TreasureSaved" component={screens.TreasureSaved} />
      <Stack.Screen
        name="VideoMessageRecorder"
        component={screens.VideoMessageRecorder}
      />
      <Stack.Screen
        name="VoiceMessageRecorder"
        component={screens.VoiceMessageRecorder}
      />
      <Stack.Screen
        name="VoiceMessagePreview"
        component={screens.VoiceMessagePreview}
      />
      <Stack.Screen name="PhotoMessage" component={screens.PhotoMessage} />
      <Stack.Screen
        name="PhotoMessagePreview"
        component={screens.PhotoMessagePreview}
      />
      <Stack.Screen
        name="DocumentMessage"
        component={screens.DocumentMessage}
      />
      <Stack.Screen name="FileDetails" component={screens.FileDetails} />
      <Stack.Screen
        name="AssignRecipients"
        component={screens.AssignRecipients}
      />
      <Stack.Screen name="NewRecepient" component={screens.NewRecipient} />
      {/* Legacy */}
      <Stack.Screen name="ReleaseRules" component={screens.ReleaseRules} />
      <Stack.Screen name="ReviewLegacy" component={screens.ReviewLegacy} />
    </Stack.Navigator>
  );
};

export { TreasureStack };
