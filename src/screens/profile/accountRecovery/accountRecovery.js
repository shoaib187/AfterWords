import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { Button } from '../../../components/common/button/button';
import { SafeAreaView } from 'react-native-safe-area-context';

// Data
const MASTER_KEY_DATA = {
  masterKey: {
    icon: 'key-outline',
    title: 'Master Recovery Key',
    warning: {
      title: 'Critical Warning',
      description:
        'Store this key offline in a physical, secure location. This may be the sole way to recover your zero-knowledge encrypted data if you lose access to your account.',
    },
    revealButton: {
      revealText: 'Reveal Master Key',
      hideText: 'Hide Master Key',
    },
  },
  primaryContact: {
    name: 'Personal Davis',
    role: 'PRIMARY CONTACT',
    icon: 'person-outline',
  },
  secondaryContact: {
    buttonText: 'Add Reconvery Contact',
  },
};

// Reusable Warning Component
const WarningBox = ({ data }) => {
  return (
    <View style={styles.warningContainer}>
      <Ionicons
        name="alert-circle-outline"
        size={Responsive.width(22)}
        color="#E57373"
        style={styles.warningIcon}
      />
      <View style={styles.warningTextContainer}>
        <Title
          text={data.title}
          size="small"
          color="#E57373"
          style={styles.warningTitle}
        />
        <AppText
          text={data.description}
          size="tiny"
          color="#E57373"
          style={styles.warningSubtitle}
        />
      </View>
    </View>
  );
};

// Reusable Master Key Card Component
const MasterKeyCard = ({ data, isRevealed, onToggleReveal }) => {
  return (
    <View style={styles.masterKeyCard}>
      <Ionicons
        name={data.icon}
        size={Responsive.width(36)}
        color={COLORS.GOLD}
        style={styles.keyIcon}
      />

      <Title text={data.title} color={COLORS.WHITE} style={styles.title} />

      <WarningBox data={data.warning} />

      <TouchableOpacity
        style={styles.revealButton}
        onPress={onToggleReveal}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isRevealed ? 'eye-outline' : 'eye-off-outline'}
          size={Responsive.width(22)}
          color={COLORS.WHITE}
          style={styles.revealIcon}
        />
        <AppText
          text={
            isRevealed
              ? data.revealButton.hideText
              : data.revealButton.revealText
          }
          size="medium"
          color={COLORS.WHITE}
          style={styles.revealButtonText}
        />
      </TouchableOpacity>
    </View>
  );
};

// Reusable Contact Card Component
const ContactCard = ({ name, role, icon }) => {
  return (
    <View style={styles.contactCard}>
      <View style={styles.contactAvatarBadge}>
        <Ionicons name={icon} size={Responsive.width(20)} color={COLORS.GOLD} />
      </View>
      <View style={styles.contactInfo}>
        <Title
          text={name}
          size="medium"
          color={COLORS.WHITE}
          style={styles.contactName}
        />
        <AppText
          text={role}
          size="tiny"
          color={COLORS.GOLD}
          style={styles.contactRole}
        />
      </View>
    </View>
  );
};

export default function AccountRecovery({ navigation }) {
  const [keyRevealed, setKeyRevealed] = useState(false);
  const handleToggleReveal = () => {
    setKeyRevealed(prev => !prev);
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Master Recovery Key'} />
      <GradientBackground />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MasterKeyCard
          data={MASTER_KEY_DATA.masterKey}
          isRevealed={keyRevealed}
          onToggleReveal={handleToggleReveal}
        />

        <ContactCard
          name={MASTER_KEY_DATA.primaryContact.name}
          role={MASTER_KEY_DATA.primaryContact.role}
          icon={MASTER_KEY_DATA.primaryContact.icon}
        />

        <Button
          title={MASTER_KEY_DATA.secondaryContact.buttonText}
          onPress={() => navigation.navigate('AddRecoveryContact')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  scrollContent: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
    paddingBottom: Spacing.xLarge,
  },

  /* Master Key Card Container */
  masterKeyCard: {
    backgroundColor: '#231D1070',
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: COLORS.GOLD + '30',
    padding: Spacing.small,
    alignItems: 'center',
    marginBottom: Spacing.xLarge,
  },
  keyIcon: {
    marginBottom: Spacing.small,
  },
  title: {
    marginBottom: Spacing.small,
  },

  /* Critical Warning Box */
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#4A2521',
    borderRadius: Radius.xLarge,
    padding: Spacing.medium,
    marginBottom: Spacing.xLarge,
    width: '100%',
  },
  warningIcon: {
    marginRight: Spacing.small,
    marginTop: Responsive.height(2),
  },
  warningTextContainer: {
    flex: 1,
  },
  warningTitle: {
    marginBottom: Spacing.tiny,
  },
  warningSubtitle: {
    lineHeight: Responsive.height(16),
    opacity: 0.9,
  },

  /* Reveal Button */
  revealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5A4620',
    borderRadius: Radius.circle,
    height: Responsive.height(54),
    width: '100%',
  },
  revealIcon: {
    marginRight: Spacing.small,
  },

  /* Contact Card */
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
    borderRadius: Radius.large,
    borderWidth: 1.5,
    borderColor: '#3B301B',
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.xLarge,
  },
  contactAvatarBadge: {
    width: Responsive.width(42),
    height: Responsive.width(42),
    borderRadius: Radius.small,
    backgroundColor: '#1C160B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    marginBottom: Spacing.tiny,
  },
  contactRole: {
    letterSpacing: Responsive.width(0.8),
  },

  /* Add Secondary Contact Button */
  addContactButton: {
    backgroundColor: COLORS.GOLD,
    borderRadius: Radius.xLarge,
    height: Responsive.height(54),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addContactButtonText: {
    fontWeight: 'bold',
  },
});
