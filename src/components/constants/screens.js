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

import VaultItemDetail from '../../screens/vault/vaultItemDetail/vaultItemDetail';
import GettingStarted from '../../screens/auth/gettingStarted/gettingStarted';
import Login from '../../screens/auth/login/login';
import MPin from '../../screens/auth/mPin/mPin';
import OnboardingScreen from '../../screens/auth/onboarding/onboarding';
import LegacyInbox from '../../screens/legacy/legacyInbox/legacyInbox';
import AccountRecovery from '../../screens/profile/accountRecovery/accountRecovery';

import FamilyTree from '../../screens/profile/familyTree/familyTree';
import ProfileSettings from '../../screens/profile/profileSettings/profileSettings';
import SecurityAndPrivacy from '../../screens/profile/securityAndPrivacy/securityAndPrivacy';
import Subscription from '../../screens/profile/subscription/subscription';
import TrustedDelegates from '../../screens/profile/trustedDelegates/trustedDelegates';
import VaultHome from '../../screens/vault/vaultHome/vaultHome';
import MessageDetails from '../../screens/legacy/messageDetails/messageDetails';
import RecipientDirectory from '../../screens/profile/recipientDirectory/recipientDirectory';
import Roadmap from '../../screens/auth/roadmap/roadmap';
import AddMessageDetails from '../../screens/message/addMessageDetails/addMessageDetails';
import ReleaseRules from '../../screens/recepients/releaseRules/releaseRules';
import ReviewLegacy from '../../screens/recepients/reviewLegacy/reviewLegacy';
import MyTreasures from '../../screens/treasure/myTreasures/myTreasures';
import TreasureDetails from '../../screens/treasure/treasureDetails/treasureDetails';
import AddToCollections from '../../screens/treasure/addToCollections/addToCollections';
import LegacyGifts from '../../screens/legacy/legacyGifts/legacyGifts';
import GiftDetails from '../../screens/legacy/giftDetails/giftDetails';
import EditProfile from '../../screens/profile/editProfile/editProfile';
import MyFamilyTree from '../../screens/profile/myFamilyTree/myFamilyTree';
import ExploreEncestors from '../../screens/profile/exploreEncestors/exploreEncestors';
import FamilyHistory from '../../screens/profile/familyHistory/familyHistory';
import LegalExecutor from '../../screens/profile/legalExecutor/legalExecutor';
import AddExecutor from '../../screens/profile/addExecutor/addExecutor';

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
  LegacyGifts,
  GiftDetails,

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

  // Treasures
  MyTreasures,
  VaultItemDetail,
  VaultHome,
  TreasureDetails,
  AddToCollections,

  // Inbox
  LegacyInbox,
  MessageDetails,
  RecipientDirectory,

  // Profile
  AccountRecovery,

  FamilyTree,
  ProfileSettings,
  SecurityAndPrivacy,
  Subscription,
  TrustedDelegates,
  EditProfile,
  MyFamilyTree,
  ExploreEncestors,
  FamilyHistory,
  LegalExecutor,
  AddExecutor,
};
