import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../../../components/typography/appText/appText';
import { FONT } from '../../../components/constants/font';
import Title from '../../../components/typography/title/title';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    current: true,
    features: [
      '5 GB storage',
      '3 recipients',
      'Text & photos',
      'Basic journal',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: '$9',
    annualPrice: '$6',
    subtitle: 'billed annually',
    badge: 'Most Popular',
    buttonText: 'Start Free Trial',
    premium: true,
    features: [
      '50 GB storage',
      'Unlimited recipients',
      'Video & voice',
      'Executor workflow',
      'Scheduled delivery',
      'Priority support',
    ],
  },
  {
    id: 'family',
    name: 'Family Plan',
    monthlyPrice: '$16',
    annualPrice: '$12',
    subtitle: 'up to 5 members',
    buttonText: 'Upgrade to Family',
    features: [
      '200 GB Shared storage',
      '5 Distinct secure vaults',
      'Everything in Premium',
      'Dedicated support line',
    ],
  },
];

const PlanCard = ({ plan, isAnnual }) => {
  const isPremium = plan.premium;

  const cardContent = (
    <>
      {plan.badge && (
        <View style={styles.badge}>
          <Icon name="star" size={Responsive.width(16)} color="#FFF" />
          <AppText
            text={plan.badge}
            size="tiny"
            fontFamily={FONT.TTForseBold}
            color="#FFF"
            style={{ marginLeft: 4 }}
          />
        </View>
      )}

      <View style={styles.priceRow}>
        <Title
          text={plan.price || (isAnnual ? plan.annualPrice : plan.monthlyPrice)}
          size="xlarge"
          color={isPremium ? '#1C1917' : '#FFFFFF'}
        />

        {!plan.price && (
          <AppText
            text="/mo"
            size="medium"
            color={isPremium ? '#1C1917' : '#A1A1AA'}
            style={styles.perMonthSuffix}
          />
        )}
      </View>

      {!!plan.subtitle && (
        <AppText
          text={plan.subtitle}
          size="tiny"
          color={isPremium ? '#1C1917' : '#A1A1AA'}
          style={styles.billingSubLabel}
        />
      )}

      <Title
        text={plan.name}
        size="large"
        color={isPremium ? '#1C1917' : '#FFFFFF'}
        style={styles.planNamePadding}
      />

      <View style={styles.featureListStack}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureItemRow}>
            <Icon
              name="check"
              size={Responsive.width(16)}
              color={isPremium ? '#1C1917' : '#CD974A'}
              style={styles.checkIconOffset}
            />

            <AppText
              text={feature}
              size="medium"
              color={isPremium ? '#1C1917' : '#E4E4E7'}
            />
          </View>
        ))}
      </View>

      {plan.current ? (
        <TouchableOpacity disabled style={styles.currentPlanButton}>
          <AppText text="Current Plan" size="medium" color="#CD974A" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity activeOpacity={0.8}>
          <LinearGradient
            colors={['#D4A843', '#9A7828']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionButton}
          >
            <AppText
              text={plan.buttonText}
              size="medium"
              fontFamily={FONT.TTForseBold}
              color={isPremium ? '#FFFFFF' : '#1C1917'}
            />
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );

  if (isPremium) {
    return (
      <LinearGradient
        colors={['#EEDBB2', '#CD974A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.planCard, styles.premiumCard]}
      >
        {cardContent}
      </LinearGradient>
    );
  }

  return <View style={[styles.planCard, styles.darkCard]}>{cardContent}</View>;
};

export default function Subscription({ navigation }) {
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />

      <HeaderBack title={'Choose Plan'} />

      <ScrollView
        contentContainerStyle={styles.scrollLayout}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.toggleOuterContainer}>
          <TouchableOpacity
            style={styles.toggleRowPressable}
            onPress={() => setIsAnnual(!isAnnual)}
            activeOpacity={0.9}
          >
            <AppText
              text="Monthly"
              size="medium"
              color={!isAnnual ? '#FFFFFF' : '#A1A1AA'}
            />

            <View
              style={[styles.switchTrack, isAnnual && styles.switchTrackAnnual]}
            >
              <View
                style={[
                  styles.switchThumb,
                  isAnnual && styles.switchThumbAnnual,
                ]}
              />
            </View>

            <AppText
              text="Annual"
              size="medium"
              color={isAnnual ? '#FFFFFF' : '#A1A1AA'}
            />
          </TouchableOpacity>

          <View style={styles.discountBadgeBox}>
            <AppText
              text="Save 33%"
              size="tiny"
              fontFamily={FONT.TTForseBold}
              color="#4ADE80"
            />
          </View>
        </View>

        {plans.map(plan => (
          <PlanCard key={plan.id} plan={plan} isAnnual={isAnnual} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK || '#000000',
  },

  ambientGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(260),
    zIndex: 0,
  },

  scrollLayout: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.small,
    paddingBottom: Responsive.height(50),
  },

  toggleOuterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: Responsive.height(32),
  },

  toggleRowPressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchTrack: {
    width: 48,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#CD974A',
    paddingHorizontal: 2,
    justifyContent: 'center',
    marginHorizontal: Spacing.medium,
  },

  switchTrackAnnual: {
    backgroundColor: '#27272A',
  },

  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1C1917',
    alignSelf: 'flex-start',
  },

  switchThumbAnnual: {
    alignSelf: 'flex-end',
    backgroundColor: '#A1A1AA',
  },

  discountBadgeBox: {
    backgroundColor: 'rgba(74, 222, 128, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: Spacing.small,
  },

  planCard: {
    width: '100%',
    borderRadius: 28,
    padding: Spacing.large + 2,
    marginBottom: Responsive.height(24),
  },

  darkCard: {
    backgroundColor: '#BE8C3557',
    borderWidth: 1,
    borderColor: 'rgba(197,147,83,0.45)',
  },

  premiumCard: {
    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: Spacing.large,
    right: Spacing.large,
    backgroundColor: 'rgba(28,25,23,0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  perMonthSuffix: {
    marginLeft: 2,
  },

  billingSubLabel: {
    opacity: 0.7,
    marginTop: -2,
  },

  planNamePadding: {
    marginTop: 2,
    marginBottom: Spacing.medium,
  },

  featureListStack: {
    marginBottom: Spacing.large + 4,
  },

  featureItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.small + 2,
  },

  checkIconOffset: {
    marginRight: Spacing.medium,
    marginTop: 1,
  },

  currentPlanButton: {
    width: '100%',
    height: Responsive.height(44),
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(197,147,83,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionButton: {
    width: '100%',
    height: Responsive.height(44),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
