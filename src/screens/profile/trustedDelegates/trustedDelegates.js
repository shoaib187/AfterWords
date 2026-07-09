import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Title from '../../../components/typography/title/title';
import { FONT } from '../../../components/constants/font';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import { Responsive, Spacing } from '../../../components/constants/styles';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

export default function TrustedDelegates({ navigation }) {
  const [medicalAccess, setMedicalAccess] = useState(true);
  const [financialAccess, setFinancialAccess] = useState(true);
  const [legacyAccess, setLegacyAccess] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Top Ambient Gold Wash */}
      <GradientBackground />

      <HeaderBack title={'Trusted Delegates (POA)'} />

      <ScrollView
        contentContainerStyle={styles.scrollLayout}
        showsVerticalScrollIndicator={false}
      >
        {/* Delegate Card Block (As seen in Screenshot 2026-06-16 at 5.19.47 AM.png) */}
        <LinearGradient
          colors={['#EEDBB2', '#CD974A']}
          style={styles.delegateCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.delegateCardInner}>
            <View style={styles.avatarCircle}>
              <Title
                text="E"
                size="large"
                fontFamily={FONT.TTForseSemiBold}
                color="#1C1917"
              />
            </View>

            <View style={styles.delegateMetaStack}>
              <Title
                text="Eleanor Whitfield"
                size="large"
                fontFamily={FONT.TTForseSemiBold}
                color="#1C1917"
              />
              <AppText
                text="Spouse\ POA (living POA )"
                size="small"
                fontFamily={FONT.TTForseMedium}
                color="#1C1917"
                style={styles.subLabelOffset}
              />
            </View>
          </View>
        </LinearGradient>

        {/* Section Heading Label */}
        <AppText
          text="GRANULAR ACCESS CONTROL"
          size="tiny"
          fontFamily={FONT.TTForseSemiBold}
          color="#A1A1AA"
          style={styles.sectionHeaderLabel}
        />

        {/* ==========================================
            TOGGLE ACCESS ROW 1: MEDICAL DIRECTIVES
           ========================================== */}
        <View style={styles.controlCardBox}>
          <View style={styles.cardLeftWrap}>
            <View style={styles.iconWrapperSquare}>
              <Icon name="heart" size={22} color="#EF4444" />
            </View>
            <View style={styles.cardTextStack}>
              <Title
                text="Medical Directives"
                size="medium"
                fontFamily={FONT.TTForseBold}
                color="#FFFFFF"
              />
              <AppText
                text="living wills, DNRS"
                size="small"
                fontFamily={FONT.TTForseRegular}
                color="#A1A1AA"
                style={styles.metaTextSpacing}
              />
            </View>
          </View>
          <Switch
            value={medicalAccess}
            onValueChange={setMedicalAccess}
            trackColor={{ false: '#3F3F46', true: '#CD974A' }}
            thumbColor={medicalAccess ? '#1C1917' : '#A1A1AA'}
            ios_backgroundColor="#3F3F46"
          />
        </View>

        {/* ==========================================
            TOGGLE ACCESS ROW 2: FINANCIAL FOLDERS
           ========================================== */}
        <View style={styles.controlCardBox}>
          <View style={styles.cardLeftWrap}>
            <View style={styles.iconWrapperSquare}>
              <Icon name="file-document-outline" size={22} color="#CD974A" />
            </View>
            <View style={styles.cardTextStack}>
              <Title
                text="Financial Folders"
                size="medium"
                fontFamily={FONT.TTForseBold}
                color="#FFFFFF"
              />
              <AppText
                text="Trust, emergency funds"
                size="small"
                fontFamily={FONT.TTForseRegular}
                color="#A1A1AA"
                style={styles.metaTextSpacing}
              />
            </View>
          </View>
          <Switch
            value={financialAccess}
            onValueChange={setFinancialAccess}
            trackColor={{ false: '#3F3F46', true: '#CD974A' }}
            thumbColor={financialAccess ? '#1C1917' : '#A1A1AA'}
            ios_backgroundColor="#3F3F46"
          />
        </View>

        {/* ==========================================
            TOGGLE ACCESS ROW 3: LEGACY MEMORY (DISABLED)
           ========================================== */}
        <View style={[styles.controlCardBox, styles.disabledCardAlpha]}>
          <View style={styles.cardLeftWrap}>
            <View style={styles.iconWrapperSquare}>
              <Icon
                name="lock-outline"
                size={22}
                color="rgba(255, 255, 255, 0.4)"
              />
            </View>
            <View style={styles.cardTextStack}>
              <Title
                text="Legacy Memory"
                size="medium"
                fontFamily={FONT.TTForseBold}
                color="rgba(255, 255, 255, 0.5)"
              />
              <AppText
                text="Locked until passing"
                size="small"
                fontFamily={FONT.TTForseRegular}
                color="#71717A"
                style={styles.metaTextSpacing}
              />
            </View>
          </View>
          <Switch
            value={legacyAccess}
            onValueChange={setLegacyAccess}
            trackColor={{ false: '#27272A', true: '#CD974A' }}
            thumbColor={legacyAccess ? '#1C1917' : '#52525B'}
            ios_backgroundColor="#27272A"
          />
        </View>
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
    height: Responsive.height(200),
    zIndex: 0,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.large,
    height: Responsive.height(64),
    zIndex: 1,
  },
  backCircleButton: {
    width: Responsive.width(36),
    height: Responsive.width(36),
    borderRadius: Responsive.width(18),
    backgroundColor: '#D9A451',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSpacer: {
    width: Responsive.width(36),
  },
  scrollLayout: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
    paddingBottom: Responsive.height(40),
  },
  delegateCardGradient: {
    borderRadius: 28,
    width: '100%',
    marginBottom: Responsive.height(40),
  },
  delegateCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.large,
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
  delegateMetaStack: {
    flex: 1,
    justifyContent: 'center',
  },
  subLabelOffset: {
    marginTop: 3,
  },
  sectionHeaderLabel: {
    letterSpacing: 1.2,
    marginBottom: Spacing.medium,
    paddingLeft: 2,
  },
  controlCardBox: {
    width: '100%',
    backgroundColor: '#050505',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.4)', // Premium dynamic gold outline frame matrix ring
    height: Responsive.height(92),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium + 4,
    marginBottom: Spacing.medium,
  },
  disabledCardAlpha: {
    borderColor: 'rgba(197, 147, 83, 0.15)',
  },
  cardLeftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapperSquare: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  cardTextStack: {
    flex: 1,
    justifyContent: 'center',
  },
  metaTextSpacing: {
    marginTop: 3,
  },
});
