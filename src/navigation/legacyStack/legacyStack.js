import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '../../components/constants/screens';

const Stack = createStackNavigator();

const LeagcyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LegacyHome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="LegacyHome" component={screens.Home} />
      <Stack.Screen name="CreateLegacy" component={screens.CreateLegacy} />
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
      <Stack.Screen name="Review" component={screens.ReviewSummary} />
      <Stack.Screen
        name="MemorySealedSuccess"
        component={screens.MemorySealedSuccess}
      />
    </Stack.Navigator>
  );
};

export { LeagcyStack };
