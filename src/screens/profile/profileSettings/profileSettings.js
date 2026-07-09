import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
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
import HeaderBack from '../../../components/common/headerBack/headerBack';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import { useAuth } from '../../../configs/authContext/authContext';

export default function ProfileSettings({ navigation }) {
  const { logout } = useAuth();
  const handleNavigation = destination => {
    if (navigation && destination) navigation.navigate(destination);
  };

  // Helper renderer to keep row groupings layout highly scannable
  const renderSettingRow = ({ icon, title, description, onPress, isLast }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.rowContainer, !isLast && styles.rowBottomBorder]}
    >
      <View style={styles.rowLeftWrap}>
        <View style={styles.iconSquareFrame}>
          <Icon
            name={icon}
            size={Responsive.width(20)}
            color="rgba(197, 147, 83, 0.8)"
          />
        </View>
        <View style={styles.textStack}>
          <Title
            text={title}
            size="medium"
            fontFamily={FONT.TTForseSemiBold}
            color="#FFFFFF"
          />
          {description && (
            <AppText
              text={description}
              size="small"
              fontFamily={FONT.TTForseRegular}
              color="#A1A1AA"
              style={styles.descriptionSpacing}
            />
          )}
        </View>
      </View>
      <Icon name="chevron-right" size={20} color="rgba(255, 255, 255, 0.3)" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Profile & Settings'} />
      <GradientBackground />
      <ScrollView
        contentContainerStyle={styles.scrollLayout}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#EEDBB2', '#CD974A']}
          style={styles.profileCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity style={styles.profileCardInner} activeOpacity={0.9}>
            <View style={styles.profileInfoLeft}>
              {/* Monogram Avatar Circle */}
              <View style={styles.avatarCircle}>
                <Title
                  text="E"
                  size="large"
                  fontFamily={FONT.TTForseSemiBold}
                  color="#1C1917"
                />
              </View>

              {/* Profile Details */}
              <View style={styles.profileMetaStack}>
                <Title
                  text="Eleanor Whitfield"
                  size="large"
                  fontFamily={FONT.TTForseBold}
                  color="#1C1917"
                />
                <AppText
                  text="eleanor@whitfield.com"
                  size="small"
                  fontFamily={FONT.TTForseMedium}
                  color="#1C1917"
                  style={styles.emailTextGap}
                />

                {/* Badges Row Layout */}
                <View style={styles.badgeRow}>
                  <View style={styles.premiumBadge}>
                    <AppText
                      text="Premium"
                      size="tiny"
                      fontFamily={FONT.TTForseSemiBold}
                      color="#FFFFFF"
                    />
                  </View>
                  <AppText
                    text="Member since 2023"
                    size="tiny"
                    fontFamily={FONT.TTForseMedium}
                    color="rgba(28, 25, 23, 0.7)"
                    style={styles.memberSinceText}
                  />
                </View>
              </View>
            </View>
            <Icon
              name="chevron-right"
              size={Responsive.width(24)}
              color="#1C1917"
            />
          </TouchableOpacity>
        </LinearGradient>

        {/* SECTION 1: PEOPLE & NETWORK */}
        <View style={styles.sectionBlock}>
          <AppText
            text="PEOPLE & NETWORK"
            size="tiny"
            fontFamily={FONT.TTForseSemiBold}
            color="#A1A1AA"
            style={styles.sectionHeaderLabel}
          />
          <View style={styles.groupedCardFrame}>
            {renderSettingRow({
              icon: 'account-box-multiple-outline',
              title: 'Recipient Directory',
              description: 'Manage your contacts',
              onPress: () => handleNavigation('RecipientDirectory'),
              isLast: false,
            })}
            {renderSettingRow({
              icon: 'vector-triangle',
              title: 'Family Tree',
              description: 'Map descendants & future receivers',
              onPress: () => handleNavigation('FamilyTree'),
              isLast: true,
            })}
          </View>
        </View>

        {/* SECTION 2: NOTIFICATIONS */}
        <View style={styles.sectionBlock}>
          <AppText
            text="NOTIFICATIONS"
            size="tiny"
            fontFamily={FONT.TTForseSemiBold}
            color="#A1A1AA"
            style={styles.sectionHeaderLabel}
          />
          <View style={styles.groupedCardFrame}>
            {renderSettingRow({
              icon: 'shield-account-outline',
              title: 'Legal Executors',
              description: 'Control vault release upon passing',
              onPress: () => handleNavigation('EstateExecutor'),
              isLast: false,
            })}
            {renderSettingRow({
              icon: 'badge-account-outline',
              title: 'Trusted Delegates (POA)',
              description: 'Manage living incapacitation',
              onPress: () => handleNavigation('TrustedDelegates'),
              isLast: true,
            })}
          </View>
        </View>

        {/* SECTION 3: ACCOUNT & SETTING */}
        <View style={styles.sectionBlock}>
          <AppText
            text="ACCOUNT & SETTING"
            size="tiny"
            fontFamily={FONT.TTForseBold}
            color="#A1A1AA"
            style={styles.sectionHeaderLabel}
          />

          <View style={[styles.groupedCardFrame, styles.singleRowContainer]}>
            {renderSettingRow({
              icon: 'shield-lock-outline',
              title: 'Security & Privacy',
              onPress: () => handleNavigation('SecurityAndPrivacy'),
              isLast: true,
            })}
          </View>

          <View style={[styles.groupedCardFrame, styles.singleRowContainer]}>
            {renderSettingRow({
              icon: 'credit-card-outline',
              title: 'Subscription & Storage',
              onPress: () => handleNavigation('Subscription'),
              isLast: true,
            })}
          </View>

          <View style={[styles.groupedCardFrame, styles.singleRowContainer]}>
            {renderSettingRow({
              icon: 'account-key-outline',
              title: 'Account Recovery',
              onPress: () => handleNavigation('AccountRecovery'),
              isLast: true,
            })}
          </View>
        </View>

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
    marginTop: Spacing.small,
  },
  signOutTextShift: {
    marginLeft: Spacing.medium,
  },
});
