import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import GradientWrapper from '../../../components/common/gradientWrapper/gradientWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Data
const VERIFICATION_DATA = {
  banner: {
    icon: 'lock-closed-outline',
    title: 'Military-Grade Encryption',
    subtitle:
      'Your memories are encrypted before storage. Only authorized recipients can decrypt them.',
  },
  section: {
    title: 'RECIPIENT VERIFICATION LAYERS',
    description:
      'Choose how recipients must prove their identity before unlocking a delivered legacy.',
  },
  options: [
    {
      id: 'standard',
      title: 'Standard Verification',
      subtitle: 'Email Link + SMS Access Code',
    },
    {
      id: 'strict',
      title: 'Strict Verification',
      subtitle: 'SMS Code + Security Questions',
    },
    {
      id: 'multi_step',
      title: 'Multi-Step Validation',
      subtitle: 'Email + SMS + Identity Document',
    },
    {
      id: 'executor',
      title: 'Executor Confirmation',
      subtitle: 'Executor must manually approve recipient access',
    },
  ],
};

// Reusable Security Banner Component
const SecurityBanner = ({ data }) => {
  return (
    <View style={styles.banner}>
      <Ionicons
        name={data.icon}
        size={Responsive.width(28)}
        color={COLORS.GOLD}
        style={styles.bannerIcon}
      />
      <View style={styles.bannerTextContainer}>
        <Title
          text={data.title}
          size="small"
          color={COLORS.WHITE}
          style={styles.bannerTitle}
        />
        <AppText
          text={data.subtitle}
          size="small"
          color={COLORS.GOLD}
          style={styles.bannerSubtitle}
        />
      </View>
    </View>
  );
};

// Reusable Section Header Component
const SectionHeader = ({ title, description }) => {
  return (
    <>
      <AppText text={title} size="small" color={COLORS.WHITE} />
      <AppText
        text={description}
        size="medium"
        style={styles.sectionDescription}
      />
    </>
  );
};

// Reusable Verification Option Component with Gradient
const VerificationOption = ({ option, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onSelect(option.id)}
      style={styles.optionWrapper}
    >
      {isSelected ? (
        // Selected option with GradientWrapper
        <GradientWrapper wrapperStyle={styles.selectedCard}>
          <View style={styles.optionContent}>
            <View style={styles.optionTextContainer}>
              <Title
                text={option.title}
                size="medium"
                color={COLORS.BLACK}
                style={styles.selectedTitleText}
              />
              <AppText
                text={option.subtitle}
                size="small"
                color="#3B2A10"
                style={styles.selectedSubtitleText}
              />
            </View>
            <View style={styles.iconContainer}>
              <Ionicons
                name="checkmark-circle"
                size={Responsive.width(26)}
                color={COLORS.BLACK}
              />
            </View>
          </View>
        </GradientWrapper>
      ) : (
        // Unselected option with dark outline
        <View style={styles.unselectedCard}>
          <View style={styles.optionContent}>
            <View style={styles.optionTextContainer}>
              <Title
                text={option.title}
                size="medium"
                color={COLORS.WHITE}
                style={styles.unselectedTitleText}
              />
              <AppText
                text={option.subtitle}
                size="small"
                color="#888888"
                style={styles.unselectedSubtitleText}
              />
            </View>
            <View style={styles.iconContainer}>
              <View style={styles.unselectedCircle} />
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function SecurityAndPrivacy() {
  const [selectedOption, setSelectedOption] = useState('strict');

  const handleSelect = id => {
    setSelectedOption(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Security & Privacy'} />
      <GradientBackground />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SecurityBanner data={VERIFICATION_DATA.banner} />
        <SectionHeader
          title={VERIFICATION_DATA.section.title}
          description={VERIFICATION_DATA.section.description}
        />

        <View style={styles.optionsList}>
          {VERIFICATION_DATA.options.map(option => (
            <VerificationOption
              key={option.id}
              option={option}
              isSelected={selectedOption === option.id}
              onSelect={handleSelect}
            />
          ))}
        </View>
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
    paddingHorizontal: Spacing.large,
    paddingTop: Spacing.medium,
    paddingBottom: Spacing.xLarge,
  },

  /* Security Header Banner */
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#261D0C',
    borderRadius: Radius.xLarge,
    borderWidth: 1,
    borderColor: '#3B301B',
    padding: Spacing.large,
    marginBottom: Spacing.xLarge,
  },
  bannerIcon: {
    marginRight: Spacing.medium,
    marginTop: Responsive.height(2),
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    marginBottom: Spacing.tiny,
  },
  bannerSubtitle: {
    lineHeight: Responsive.height(17),
    opacity: 0.9,
  },

  /* Section Title & Subtitle */
  sectionHeader: {
    letterSpacing: Responsive.width(0.8),
    marginBottom: Spacing.tiny,
  },
  sectionDescription: {
    lineHeight: Responsive.height(18),
    marginBottom: Spacing.xLarge,
    fontSize: FontSize.small,
    marginTop: Spacing.small,
  },

  /* Options List */
  optionsList: {
    gap: Spacing.medium,
  },
  optionWrapper: {
    width: '100%',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.large,
    minHeight: Responsive.height(76),
    width: '100%',
  },

  /* Selected Card with Gradient */
  selectedCard: {
    borderRadius: Radius.large,
    padding: 0, // GradientWrapper handles padding
    width: '100%',
  },
  selectedTitleText: {
    color: COLORS.BLACK,
  },
  selectedSubtitleText: {
    color: '#3B2A10',
  },

  /* Unselected Card (Dark Outline) */
  unselectedCard: {
    backgroundColor: COLORS.BLACK,
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    borderRadius: Radius.large,
    width: '100%',
  },
  unselectedTitleText: {
    color: COLORS.WHITE,
  },
  unselectedSubtitleText: {
    color: '#888888',
  },

  /* Option Typography */
  optionTextContainer: {
    flex: 1,
    paddingRight: Spacing.small,
  },

  /* Radio / Check Circle */
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselectedCircle: {
    width: Responsive.width(24),
    height: Responsive.width(24),
    borderRadius: Responsive.width(12),
    borderWidth: 2,
    borderColor: '#666666',
  },
});
