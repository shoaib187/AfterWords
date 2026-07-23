import React from 'react';
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
const SUBSCRIPTION_DATA = {
  currentPlan: {
    label: 'Current Plan',
    title: 'Premium',
    subtitle: 'Preserve More Memories',
    features: [
      'Unlimited Videos & Voice Messages',
      'Advanced Future Scheduling',
      'Multiple Legacy Executors',
      'Family Tree Expansions',
      'Legacy Discovery Registry',
      'Priority Support',
    ],
  },
  plans: [
    {
      id: 'family',
      title: 'Family Plan',
      subtitle: 'Preserve Generations',
      type: 'upgrade',
      buttonText: 'UPGRADE',
      gradient: true,
    },
    {
      id: 'free',
      title: 'Free Plan',
      subtitle: 'Preserve your story',
      type: 'downgrade',
      buttonText: 'DOWNGRADE',
      gradient: false,
    },
  ],
};

// Reusable Feature Item Component
const FeatureItem = ({ text }) => {
  return (
    <View style={styles.featureRow}>
      <Ionicons
        name="checkmark"
        size={Responsive.width(18)}
        color="#B3802A"
        style={styles.checkIcon}
      />
      <AppText
        text={text}
        size="small"
        color="#261B0A"
        style={styles.featureText}
      />
    </View>
  );
};

// Reusable Current Plan Card Component
const CurrentPlanCard = ({ data }) => {
  return (
    <GradientWrapper wrapperStyle={styles.premiumCard}>
      <AppText
        text={data.label}
        size="small"
        color="#3B2A10"
        style={styles.planLabel}
      />
      <Title
        text={data.title}
        size="xxLarge"
        color={COLORS.BLACK}
        style={styles.planTitle}
      />
      <AppText
        text={data.subtitle}
        size="small"
        color="#3B2A10"
        style={styles.planSubtitle}
      />

      <View style={styles.featuresList}>
        {data.features.map((feature, index) => (
          <FeatureItem key={index} text={feature} />
        ))}
      </View>
    </GradientWrapper>
  );
};

// Reusable Plan Option Card Component
const PlanOptionCard = ({ plan, onPress }) => {
  const isUpgrade = plan.type === 'upgrade';
  const subtitleColor = isUpgrade ? COLORS.GOLD : '#777777';
  const buttonStyle = isUpgrade ? styles.upgradeButton : styles.downgradeButton;
  const buttonTextStyle = isUpgrade
    ? styles.upgradeButtonText
    : styles.downgradeButtonText;

  return (
    <View style={styles.planCard}>
      <View style={styles.planInfo}>
        <Title
          text={plan.title}
          size="medium"
          color={COLORS.WHITE}
          style={styles.cardTitle}
        />
        <AppText
          text={plan.subtitle}
          size="small"
          color={subtitleColor}
          style={isUpgrade ? styles.upgradeSubtitle : styles.downgradeSubtitle}
        />
      </View>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => onPress(plan.id)}
        activeOpacity={isUpgrade ? 0.85 : 0.7}
      >
        <AppText
          text={plan.buttonText}
          size="tiny"
          color={isUpgrade ? COLORS.WHITE : '#666666'}
          style={buttonTextStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default function Subscription() {
  const handleUpgrade = planId => {};

  const handleDowngrade = planId => {};

  const handlePlanAction = planId => {
    if (planId === 'family') {
      handleUpgrade(planId);
    } else if (planId === 'free') {
      handleDowngrade(planId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Subscription'} />
      <GradientBackground />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CurrentPlanCard data={SUBSCRIPTION_DATA.currentPlan} />

        {SUBSCRIPTION_DATA.plans.map(plan => (
          <PlanOptionCard
            key={plan.id}
            plan={plan}
            onPress={handlePlanAction}
          />
        ))}
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

  /* Current Plan (Premium) Banner Card */
  premiumCard: {
    borderRadius: Radius.xLarge,
    padding: Spacing.xLarge,
    marginBottom: Spacing.xLarge,
  },
  planLabel: {
    marginBottom: Spacing.tiny,
  },
  planTitle: {
    marginBottom: Spacing.tiny,
  },
  planSubtitle: {
    marginBottom: Spacing.xLarge,
  },

  /* Features Checklist */
  featuresList: {
    gap: Spacing.small,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginRight: Spacing.small,
  },
  featureText: {
    fontWeight: '500',
  },

  /* Common Plan Card Styles */
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    paddingVertical: Spacing.large,
    paddingHorizontal: Spacing.large,
    marginBottom: Spacing.medium,
  },
  planInfo: {
    flex: 1,
  },
  cardTitle: {
    marginBottom: Spacing.tiny,
  },
  upgradeSubtitle: {},
  downgradeSubtitle: {},

  /* Upgrade Button */
  upgradeButton: {
    backgroundColor: COLORS.GOLD,
    borderRadius: Radius.circle,
    paddingVertical: Spacing.tiny + 2,
    paddingHorizontal: Spacing.medium,
  },
  upgradeButtonText: {
    letterSpacing: Responsive.width(0.5),
  },

  /* Downgrade Button */
  downgradeButton: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small,
  },
  downgradeButtonText: {
    letterSpacing: Responsive.width(0.5),
  },
});
