import React from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';

import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import {
  Responsive,
  Radius,
  Spacing,
  FontSize,
} from '../../../components/constants/styles';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import { Button } from '../../../components/common/button/button';
import Title from '../../../components/typography/title/title';

export default function LegacyDetails({ navigation, route }) {
  const details = route?.params?.legacyDetails || {
    title: 'Advice For Michael',
    recipientName: 'Michael Brooks',
    relation: 'Son',
    releaseRule: '1 Year Post-Verification',
    ruleType: 'Estate Activation',
  };

  return (
    <SafeAreaView style={styles.masterContainer}>
      <HeaderBack title={'Legacy Details'} />
      <GradientBackground />
      <ScrollView
        contentContainerStyle={styles.scrollLayout}
        showsVerticalScrollIndicator={false}
      >
        {/* PREMIUM GOLD METADATA CONTAINER CARD */}
        <LinearGradient
          colors={['#FFF8EE', '#D4A45A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.detailsGradientCard}
        >
          <Title
            text={details.title}
            size="xlarge"
            color={COLORS.BLACK}
            style={{ marginBottom: Spacing.medium }}
          />

          <View style={styles.infoMetaRow}>
            <View style={styles.whiteIconCircle}>
              <FeatherIcon
                name="user"
                size={Responsive.width(18)}
                color={COLORS.BLACK}
              />
            </View>
            <View style={styles.textStackColumn}>
              <AppText
                text="DELIVERING TO"
                size="small"
                color={COLORS.BLACK}
                style={styles.sectionLabelTracking}
              />
              <AppText
                text={details.recipientName}
                size="medium"
                color={COLORS.BLACK}
                style={styles.valueMargin}
              />
              <AppText text={details.relation} size="small" color="#52525B" />
            </View>
          </View>

          <View style={styles.infoMetaRow}>
            <View style={styles.whiteIconCircle}>
              <FeatherIcon
                name="clock"
                size={Responsive.width(18)}
                color={COLORS.BLACK}
              />
            </View>
            <View style={styles.textStackColumn}>
              <AppText
                text="RELEASE ASSIGNMENT"
                size="small"
                color={COLORS.BLACK}
                style={styles.sectionLabelTracking}
              />
              <AppText
                text={details.releaseRule}
                size="medium"
                color={COLORS.BLACK}
                style={styles.valueMargin}
              />
              <AppText text={details.ruleType} size="small" color="#52525B" />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.actionsButtonStack}>
          <Button title="Edit Delivery Rules" />
          <Button title="Cancel Delivery" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },

  scrollLayout: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
    paddingBottom: Responsive.height(40),
    flexGrow: 1,
  },
  detailsGradientCard: {
    width: '100%',
    borderRadius: Radius.large || 28,
    paddingHorizontal: Spacing.medium + 4,
    paddingVertical: Responsive.height(16),
    marginBottom: Responsive.height(36),
  },

  infoMetaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Responsive.height(26),
  },
  whiteIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  textStackColumn: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 2,
  },
  sectionLabelTracking: {
    letterSpacing: 0.6,
    fontSize: 11,
  },
  valueMargin: {
    marginTop: 3,
    marginBottom: 2,
  },
  actionsButtonStack: {
    width: '100%',
    gap: Spacing.medium,
  },
});
