import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import Title from '../../../components/typography/title/title';
import Subtitle from '../../../components/typography/subtitle/subtitle';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { FONT } from '../../../components/constants/font';

export default function VoiceMessageRecorder({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Deep radiant amber-gold top atmospheric ambient wash backdrop */}
      <LinearGradient
        colors={['rgba(197, 147, 83, 0.35)', 'rgba(0, 0, 0, 0)']}
        style={styles.headerGlowBackground}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* ── Header Navigation Row Grid ── */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            style={styles.backCircleButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.75}
          >
            <Icon name="chevron-left" size={24} color={COLORS.BLACK} />
          </TouchableOpacity>
          <Title
            text="Voice Message"
            size="large"
            style={styles.serifHeaderTitle}
          />
          <View style={styles.placeholderWidth} />
        </View>

        {/* ── Flow Progress Timeline Line Tracking Node Indicator ── */}
        <View style={styles.progressRowContainer}>
          <View style={[styles.progressStepCapsule, styles.stepActive]}>
            <AppText
              text="1 Pick format"
              size="tiny"
              color={COLORS.BLACK}
              fontFamily={FONT.TTForseBold}
            />
          </View>
          <View style={styles.progressConnectorLine} />
          <View style={[styles.progressStepCapsule, styles.stepActive]}>
            <AppText
              text="2 Create"
              size="tiny"
              color={COLORS.BLACK}
              fontFamily={FONT.TTForseBold}
            />
          </View>
          <View style={styles.progressConnectorLine} />
          <View style={[styles.progressStepCapsule, styles.stepInactive]}>
            <AppText text="3 Assign" size="tiny" color="#63523B" />
          </View>
        </View>

        {/* ── Subtitle Context Active Label Element ── */}
        <View style={styles.sectionTitleRow}>
          <View style={styles.purpleStatusDot} />
          <AppText
            text="Record your voice"
            size="medium"
            fontFamily={FONT.TTForseBold}
            color={COLORS.WHITE}
          />
        </View>

        {/* ── Massive Audio Hub Core Window ── */}
        <View style={styles.audioHubContainer}>
          <View style={styles.giantCircularTrackRing}>
            <Icon
              name="microphone-outline"
              size={32}
              color="#A78BFA"
              style={styles.micCenterIcon}
            />
            <AppText
              text="Microphone Ready"
              size="medium"
              fontFamily={FONT.TTForseBold}
              color={COLORS.WHITE}
              style={styles.statusLabelText}
            />
            <AppText
              text="00:00"
              size="medium"
              color="#A78BFA"
              style={styles.timerCounterDisplay}
            />
          </View>
        </View>

        {/* ── Capture Trigger Base Core Segment ── */}
        <View style={styles.captureControlBlock}>
          <TouchableOpacity
            style={styles.outerCaptureCircleBorder}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('AssignRecipient')}
          >
            <Icon name="microphone" size={36} color={COLORS.WHITE} />
          </TouchableOpacity>
          <Subtitle
            text="Tap to start recording"
            size="small"
            align="center"
            style={styles.actionPromptLabel}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  headerGlowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(260),
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.large,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.small,
  },
  backCircleButton: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    borderRadius: Radius.circle,
    backgroundColor: '#D5A760',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serifHeaderTitle: {
    fontFamily: 'Georgia',
    fontWeight: '400',
    color: COLORS.WHITE,
  },
  placeholderWidth: {
    width: Responsive.width(40),
  },
  progressRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Responsive.height(32),
  },
  progressStepCapsule: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.small + 2,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  stepActive: {
    backgroundColor: '#F5EAD9',
    borderColor: '#F5EAD9',
  },
  stepInactive: {
    backgroundColor: 'transparent',
    borderColor: '#4A3E2E',
  },
  progressConnectorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#785A32',
    marginHorizontal: 2,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Responsive.height(16),
  },
  purpleStatusDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.circle,
    backgroundColor: '#C084FC',
    marginRight: Spacing.small,
  },
  audioHubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.small,
  },
  giantCircularTrackRing: {
    width: Responsive.width(310),
    height: Responsive.width(310),
    borderRadius: Radius.circle,
    borderWidth: 2,
    borderColor: '#C59353',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
  },
  micCenterIcon: {
    marginBottom: Spacing.small,
  },
  statusLabelText: {
    letterSpacing: 0.3,
    marginBottom: Spacing.tiny,
  },
  timerCounterDisplay: {
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  captureControlBlock: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: Responsive.height(36),
  },
  outerCaptureCircleBorder: {
    width: Responsive.width(72),
    height: Responsive.width(72),
    borderRadius: Radius.circle,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },
  actionPromptLabel: {
    color: '#A1A1AA',
    opacity: 0.85,
    fontSize: 13,
  },
});
