import Register from '../../screens/auth/register/register';
import SecureVault from '../../screens/auth/secure/secure';

import Home from '../../screens/home/home';

import CreateTreasure from '../../screens/treasure/createTreasure/createTreasure';

import VideoMessageRecorder from '../../screens/message/videoMessage/videoMessage';
import VoiceMessageRecorder from '../../screens/message/voiceMessageRecorder/voiceMessageRecorder';
import VoiceMessagePreview from '../../screens/message/voiceMessagePreview/voiceMessagePreview';
import PhotoMessage from '../../screens/message/photoMessage/photoMessage';
import PhotoMessagePreview from '../../screens/message/photoMessagePreview/photoMessagePreview';
import DocumentMessage from '../../screens/message/documentMessage/documentMessage';
import FileDetails from '../../screens/message/fileDetails/fileDetails';

import AssignRecipients from '../../screens/recepients/assignRecepients/assignRecepients';
import NewRecipient from '../../screens/recepients/newRecepient/newRecepient';
import ReviewSummary from '../../screens/recepients/reviewSummary/reviewSummary';
import TreasureSaved from '../../screens/recepients/treasureSaved/treasureSaved';

import MyVault from '../../screens/vault/myVault/myVault';
import VaultItemDetail from '../../screens/vault/vaultItemDetail/vaultItemDetail';
import GettingStarted from '../../screens/auth/gettingStarted/gettingStarted';
import Login from '../../screens/auth/login/login';
import MPin from '../../screens/auth/mPin/mPin';
import OnboardingScreen from '../../screens/auth/onboarding/onboarding';
import LegacyInbox from '../../screens/legacy/legacyInbox/legacyInbox';
import SecureAccess from '../../screens/legacy/myLagacies/myLagacies';
import AccountRecovery from '../../screens/profile/accountRecovery/accountRecovery';
import AddNewRecepient from '../../screens/profile/addNewRecepient/addNewRecepient';
import EstateExecutor from '../../screens/profile/estateExecutor/estateExecutor';
import FamilyTree from '../../screens/profile/familyTree/familyTree';
import ProfileSettings from '../../screens/profile/profileSettings/profileSettings';
import SecurityAndPrivacy from '../../screens/profile/securityAndPrivacy/securityAndPrivacy';
import Subscription from '../../screens/profile/subscription/subscription';
import TrustedDelegates from '../../screens/profile/trustedDelegates/trustedDelegates';
import VaultHome from '../../screens/vault/vaultHome/vaultHome';
import GiftsScreen from '../../screens/legacy/giftsScreen/giftsScreen';
import MessageDetails from '../../screens/legacy/messageDetails/messageDetails';
import RecipientDirectory from '../../screens/profile/recipientDirectory/recipientDirectory';
import Roadmap from '../../screens/auth/roadmap/roadmap';
import AddMessageDetails from '../../screens/message/addMessageDetails/addMessageDetails';
import ReleaseRules from '../../screens/recepients/releaseRules/releaseRules';
import ReviewLegacy from '../../screens/recepients/reviewLegacy/reviewLegacy';
import MyLagacies from '../../screens/legacy/myLagacies/myLagacies';
import LegacyDetails from '../../screens/legacy/legacyDetails/legacyDetails';

export const screens = {
  // Auth
  GettingStarted,
  Login,
  MPin,
  OnboardingScreen,
  Register,
  SecureVault,
  Roadmap,

  // Home
  Home,

  // Legacy
  CreateTreasure,

  // Messages
  VideoMessageRecorder,
  VoiceMessageRecorder,
  VoiceMessagePreview,
  PhotoMessage,
  PhotoMessagePreview,
  DocumentMessage,
  FileDetails,
  AddMessageDetails,

  // Recipients
  AssignRecipients,
  NewRecipient,
  ReviewSummary,
  TreasureSaved,
  ReleaseRules,
  ReviewLegacy,

  // Vault
  MyVault,
  VaultItemDetail,
  VaultHome,

  // Inbox
  LegacyInbox,
  SecureAccess,
  GiftsScreen,
  MessageDetails,
  RecipientDirectory,

  // Profile
  AccountRecovery,
  AddNewRecepient,
  EstateExecutor,
  FamilyTree,
  ProfileSettings,
  SecurityAndPrivacy,
  Subscription,
  TrustedDelegates,

  // Legacies
  MyLagacies,
  LegacyDetails,
};
