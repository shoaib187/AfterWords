import Register from '../../screens/auth/register/register';
import SecureVault from '../../screens/auth/secure/secure';

import Home from '../../screens/home/home';

import CreateLegacy from '../../screens/legacy/createLeagacy/createLeagacy';

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
import MemorySealedSuccess from '../../screens/recepients/memorySealedSuccess/memorySealedSuccess';

import MyVault from '../../screens/vault/myVault/myVault';
import VaultItemDetail from '../../screens/vault/vaultItemDetail/vaultItemDetail';
import GettingStarted from '../../screens/auth/gettingStarted/gettingStarted';
import Login from '../../screens/auth/login/login';
import MPin from '../../screens/auth/mPin/mPin';
import OnboardingScreen from '../../screens/auth/onboarding/onboarding';
import LegacyInbox from '../../screens/inbox/legacyInbox/legacyInbox';
import SecureAccess from '../../screens/inbox/secureAccess/secureAccess';
import AccountRecovery from '../../screens/profile/accountRecovery/accountRecovery';
import AddNewRecepient from '../../screens/profile/addNewRecepient/addNewRecepient';
import EstateExecutor from '../../screens/profile/estateExecutor/estateExecutor';
import FamilyTree from '../../screens/profile/familyTree/familyTree';
import ProfileSettings from '../../screens/profile/profileSettings/profileSettings';
import SecurityAndPrivacy from '../../screens/profile/securityAndPrivacy/securityAndPrivacy';
import Subscription from '../../screens/profile/subscription/subscription';
import TrustedDelegates from '../../screens/profile/trustedDelegates/trustedDelegates';
import VaultHome from '../../screens/vault/vaultHome/vaultHome';
import GiftsScreen from '../../screens/inbox/giftsScreen/giftsScreen';
import MessageDetails from '../../screens/inbox/messageDetails/messageDetails';
import RecipientDirectory from '../../screens/profile/recipientDirectory/recipientDirectory';

export const screens = {
  // Auth
  GettingStarted,
  Login,
  MPin,
  OnboardingScreen,
  Register,
  SecureVault,

  // Home
  Home,

  // Legacy
  CreateLegacy,

  // Messages
  VideoMessageRecorder,
  VoiceMessageRecorder,
  VoiceMessagePreview,
  PhotoMessage,
  PhotoMessagePreview,
  DocumentMessage,
  FileDetails,

  // Recipients
  AssignRecipients,
  NewRecipient,
  ReviewSummary,
  MemorySealedSuccess,

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
};
