import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import GradientWrapper from '../../../components/common/gradientWrapper/gradientWrapper';
import { Button } from '../../../components/common/button/button';

const DELEGATE_DATA = {
  banner: {
    icon: 'heart',
    title: 'Living Assistance',
    description:
      'Delegates are trusted individuals authorized to assist with specific life responsibilities (medical, financial, or family coordination) while you are living.',
  },
  activeDelegate: {
    name: 'Eleanor Whitfield',
    role: 'Spouse - Primary',
    initial: 'E',
  },
  controls: [
    {
      id: 'medical',
      title: 'Medical & Health',
      subtitle: 'Can act on your behalf',
      icon: 'heart-outline',
      iconLibrary: 'Ionicons',
      key: 'medicalAccess',
      defaultValue: true,
    },
    {
      id: 'financial',
      title: 'Financial Matters',
      subtitle: 'Bank & emergency funds',
      icon: 'wallet-outline',
      iconLibrary: 'Ionicons',
      key: 'financialAccess',
      defaultValue: true,
    },
    {
      id: 'legacy',
      title: 'Legacy Memories',
      subtitle: 'View locked Vault content',
      icon: 'archive-outline',
      iconLibrary: 'MaterialCommunityIcons',
      key: 'legacyAccess',
      defaultValue: false,
    },
  ],
};

const DelegateCard = ({ name, role, initial }) => {
  return (
    <View style={styles.delegateCard}>
      <View style={styles.avatarCircle}>
        <AppText
          text={initial}
          size="large"
          color={COLORS.BLACK}
          style={styles.avatarText}
        />
      </View>
      <View style={styles.delegateInfo}>
        <Title
          text={name}
          size="medium"
          color={COLORS.WHITE}
          style={styles.delegateName}
        />
        <AppText
          text={role}
          size="small"
          color="#A0A0A0"
          style={styles.delegateRole}
        />
      </View>
    </View>
  );
};

const ControlItem = ({ control, value, onToggle }) => {
  const renderIcon = () => {
    const IconComponent =
      control.iconLibrary === 'MaterialCommunityIcons'
        ? MaterialCommunityIcons
        : Ionicons;
    return (
      <IconComponent
        name={control.icon}
        size={Responsive.width(20)}
        color={COLORS.GOLD}
      />
    );
  };

  return (
    <View style={styles.controlCard}>
      <View style={styles.iconBadge}>{renderIcon()}</View>
      <View style={styles.controlInfo}>
        <Title
          text={control.title}
          size="small"
          color={COLORS.WHITE}
          style={styles.controlTitle}
        />
        <AppText
          text={control.subtitle}
          size="tiny"
          color="#777777"
          style={styles.controlSubtitle}
        />
      </View>
      <Switch
        value={value}
        onValueChange={() => onToggle(control.key)}
        trackColor={{ false: '#262626', true: COLORS.GOLD }}
        thumbColor={COLORS.WHITE}
      />
    </View>
  );
};

const Banner = ({ data }) => {
  return (
    <GradientWrapper wrapperStyle={styles.banner}>
      <Ionicons
        name={data.icon}
        size={Responsive.width(30)}
        color={COLORS.GOLD}
        style={styles.heartIcon}
      />
      <Title
        text={data.title}
        size="xLarge"
        color={COLORS.BLACK}
        style={styles.bannerTitle}
      />
      <AppText
        text={data.description}
        size="small"
        color="#2C1F0A"
        align="center"
        style={styles.bannerSubtitle}
      />
    </GradientWrapper>
  );
};

const SectionHeader = ({ text }) => {
  return (
    <AppText
      text={text}
      size="small"
      color={COLORS.WHITE}
      style={styles.sectionHeader}
    />
  );
};

export default function TrustedDelegates({ navigation }) {
  const [accessControls, setAccessControls] = useState(() => {
    const initial = {};
    DELEGATE_DATA.controls.forEach(control => {
      initial[control.key] = control.defaultValue;
    });
    return initial;
  });

  const handleToggle = key => {
    setAccessControls(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const activeDelegatesCount = DELEGATE_DATA.activeDelegate ? 1 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Trusted Delegates'} />
      <GradientBackground />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Banner data={DELEGATE_DATA.banner} />
        <SectionHeader text={`ACTIVE DELEGATES (${activeDelegatesCount})`} />
        <DelegateCard {...DELEGATE_DATA.activeDelegate} />
        <SectionHeader text="GRANULAR ACCESS CONTROL" />
        <View style={styles.controlList}>
          {DELEGATE_DATA.controls.map(control => (
            <ControlItem
              key={control.id}
              control={control}
              value={accessControls[control.key]}
              onToggle={handleToggle}
            />
          ))}
        </View>
        <Button
          onPress={() => navigation.navigate('AddTrustedDelegate')}
          style={{ marginTop: Spacing.large }}
          title="Add Trusted Delegate"
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

  /* Header Banner */
  banner: {
    backgroundColor: COLORS.GOLD,
    borderRadius: Radius.xLarge,
    paddingVertical: Spacing.xLarge,
    paddingHorizontal: Spacing.large,
    alignItems: 'center',
    marginBottom: Spacing.xLarge,
  },
  heartIcon: {
    marginBottom: Spacing.tiny,
  },
  bannerTitle: {
    marginBottom: Spacing.small,
  },
  bannerSubtitle: {
    lineHeight: Responsive.height(18),
  },

  /* Section Titles */
  sectionHeader: {
    letterSpacing: Responsive.width(0.8),
    marginBottom: Spacing.medium,
  },

  /* Active Delegate Card */
  delegateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E170C',
    borderRadius: Radius.xLarge,
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.xLarge,
    borderWidth: 1,
    borderColor: '#3B301B',
  },
  avatarCircle: {
    width: Responsive.width(48),
    height: Responsive.width(48),
    borderRadius: Responsive.width(24),
    backgroundColor: COLORS.GOLD,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  avatarText: {
    fontFamily: 'serif',
  },
  delegateInfo: {
    flex: 1,
  },
  delegateName: {
    marginBottom: Spacing.tiny,
  },
  delegateRole: {},

  /* Access Controls */
  controlList: {
    gap: Spacing.small,
  },
  controlCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
    borderRadius: Radius.circle,
    borderWidth: 0.6,
    borderColor: COLORS.GOLD,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    height: Responsive.height(72),
  },
  iconBadge: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    borderRadius: Responsive.width(20),
    backgroundColor: '#1A140B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  controlInfo: {
    flex: 1,
  },
  controlTitle: {
    marginBottom: Spacing.tiny,
  },
  controlSubtitle: {},
});
