import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Title from '../../../components/typography/title/title';
import { FONT } from '../../../components/constants/font';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import { useAuth } from '../../../configs/authContext/authContext';
import HeaderWithSubtitle from '../../../components/common/headerWithSubtitle/headerWithSubtitle';
import ProfileCard from '../../../components/profile/profileCard/profileCard';
import Stats from '../../../components/profile/stats/stats';
import MenuItem from '../../../components/profile/menuItem/menuItem';

const MENU_SECTIONS = [
  {
    title: 'PROFILE',
    items: [
      {
        icon: 'account-outline',
        title: 'Personal Profile',
        description: 'Manage your profile',
        screen: 'EditProfile',
      },
    ],
  },
  {
    title: 'PEOPLE & NETWORK',
    items: [
      {
        icon: 'account-box-multiple-outline',
        title: 'Recipient Directory',
        description: 'Manage your contacts',
        screen: 'RecipientDirectory',
      },
      {
        icon: 'family-tree',
        title: 'Family Tree',
        description: 'Map descendants & future receivers',
        screen: 'MyFamilyTree',
      },
    ],
  },
  {
    title: 'LEGACY',
    items: [
      {
        icon: 'shield-account-outline',
        title: 'Legal Executors',
        description: 'Control vault release upon passing',
        screen: 'LegalExecutor',
      },
      {
        icon: 'badge-account-outline',
        title: 'Trusted Delegates (POA)',
        description: 'Manage living incapacitation',
        screen: 'TrustedDelegates',
      },
      {
        icon: 'archive-outline',
        title: 'Archive Treasures',
        description: 'Restore your treasures',
        screen: 'ArchieveTreasures',
      },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      {
        icon: 'shield-lock-outline',
        title: 'Security & Privacy',
        screen: 'SecurityAndPrivacy',
      },
      {
        icon: 'credit-card-outline',
        title: 'Subscription & Storage',
        screen: 'Subscription',
      },
      {
        icon: 'account-key-outline',
        title: 'Account Recovery',
        screen: 'AccountRecovery',
      },
    ],
  },
];

export default function ProfileSettings({ navigation }) {
  const { logout } = useAuth();
  const handleNavigation = destination => {
    if (navigation && destination) navigation.navigate(destination);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithSubtitle
        title={'Account'}
        subtitle={'Manage your legacy, security'}
        showRightBtn={false}
      />
      <GradientBackground />
      <ScrollView
        contentContainerStyle={styles.scrollLayout}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard
          name={'Shoaib'}
          email={'example@gmail.com'}
          memberSince={'2007'}
          isPremium={true}
        />

        <Stats />
        {MENU_SECTIONS.map(section => (
          <View key={section.title} style={styles.sectionBlock}>
            <AppText
              text={section.title}
              size="tiny"
              fontFamily={FONT.TTForseSemiBold}
              color="#A1A1AA"
              style={styles.sectionHeaderLabel}
            />

            {section.items.map((item, index) => (
              <MenuItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                isLast={index === section.items.length - 1}
                onPress={() => handleNavigation(item.screen)}
              />
            ))}
          </View>
        ))}

        {/* SIGN OUT ACTION ITEM BLOCK */}
        <TouchableOpacity
          onPress={() => logout()}
          style={styles.signOutBoxButton}
          activeOpacity={0.8}
        >
          <View style={styles.rowLeftWrap}>
            <Icon name="logout" size={Responsive.width(20)} color="#F43F5E" />
            <Title
              text="Sign Out"
              size="medium"
              fontFamily={FONT.TTForseSemiBold}
              color="#F43F5E"
              style={styles.signOutTextShift}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK || '#000000',
  },
  scrollLayout: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
    paddingBottom: Responsive.height(100),
  },
  profileCardGradient: {
    borderRadius: Radius.xLarge,
    width: '100%',
    marginBottom: Responsive.height(36),
  },
  profileCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.medium,
  },
  profileInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarCircle: {
    width: Responsive.width(56),
    height: Responsive.width(56),
    borderRadius: Responsive.width(28),
    backgroundColor: 'rgba(28, 25, 23, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  profileMetaStack: {
    flex: 1,
    justifyContent: 'center',
  },
  emailTextGap: {
    marginTop: 2,
    marginBottom: Spacing.small - 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumBadge: {
    backgroundColor: '#D9A451',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.medium,
    marginRight: Spacing.small,
  },
  memberSinceText: {
    letterSpacing: 0.2,
  },
  sectionBlock: {
    width: '100%',
    marginBottom: Responsive.height(24),
  },
  sectionHeaderLabel: {
    letterSpacing: 1.2,
    marginBottom: Spacing.small,
    paddingLeft: 4,
  },
  groupedCardFrame: {
    width: '100%',
    backgroundColor: '#0A0A0C',
    borderRadius: 20,
    borderWidth: 0.7,
    borderColor: COLORS.GOLD,
    overflow: 'hidden',
  },
  singleRowContainer: {
    marginBottom: Spacing.small, // Handles separation for separate detached settings lines
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium + 2,
    height: Responsive.height(72),
  },
  rowBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.03)',
  },
  rowLeftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconSquareFrame: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  textStack: {
    flex: 1,
    justifyContent: 'center',
  },
  descriptionSpacing: {
    marginTop: 2,
  },
  signOutBoxButton: {
    width: '100%',
    height: Responsive.height(54),
    borderRadius: Radius.large,
    backgroundColor: 'rgba(244, 63, 94, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium + 4,
  },
  signOutTextShift: {
    marginLeft: Spacing.medium,
  },
});
