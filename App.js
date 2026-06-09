import React from 'react';
import GettingStarted from './src/screens/auth/gettingStarted/gettingStarted';
import Onboarding from './src/screens/auth/onboarding/onboarding';
import Register from './src/screens/auth/register/register';
import SecureVault from './src/screens/auth/secure/secure';
import Home from './src/screens/home/home';
import CreateLegacy from './src/screens/legacy/createLeagacy/createLeagacy';
import VideoMessageRecorder from './src/screens/message/videoMessage/videoMessage';
import AssignRecipients from './src/screens/recepients/assignRecepients/assignRecepients';
import NewRecipient from './src/screens/recepients/newRecepient/newRecepient';
import ReviewSummary from './src/screens/recepients/reviewSummary/reviewSummary';
import MemorySealedSuccess from './src/screens/recepients/memorySealedSuccess/memorySealedSuccess';
import VoiceMessageRecorder from './src/screens/message/voiceMessageRecorder/voiceMessageRecorder';

export default function App() {
  return <VoiceMessageRecorder />;
}
