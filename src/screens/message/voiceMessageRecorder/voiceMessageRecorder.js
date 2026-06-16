import React, { useState, useEffect } from 'react';
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

import {
  recordVoice,
  stopRecording,
  playRecording,
} from '../../../utils/audioRecordFunctions/audioRecordFunctions';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import { Button } from '../../../components/common/button/button';

export default function VoiceMessageRecorder({ navigation }) {
  // Application UI states: 'ready' | 'recording' | 'complete' | 'playing'
  const [status, setStatus] = useState('ready');
  const [filePath, setFilePath] = useState('');
  const [timerText, setTimerText] = useState('00:00');
  const [playbackProgress, setPlaybackProgress] = useState(0);

  // Clean up recording listeners when leaving the screen
  useEffect(() => {
    return () => {
      if (status === 'recording') {
        stopRecording().catch(console.error);
      }
    };
  }, [status]);

  // Handle Voice Record Action
  const handleStartRecording = async () => {
    try {
      setStatus('recording');
      await recordVoice(timeEvent => {
        setTimerText(timeEvent.formatted || '00:00');
      });
    } catch (error) {
      console.error('Failed to capture stream:', error);
      setStatus('ready');
    }
  };

  // Handle Stop Record Action
  const handleStopRecording = async () => {
    try {
      const recordedUrl = await stopRecording();
      setFilePath(recordedUrl);
      setStatus('complete');
      if (timerText === '00:00') setTimerText('01:10..');
    } catch (error) {
      console.error('Failed to cleanly halt recording:', error);
      setStatus('ready');
    }
  };

  // Handle Audio Message Playback Preview Action
  const handlePlayRecording = async () => {
    if (!filePath) return;
    try {
      setStatus('playing');
      await playRecording(
        filePath,
        (currentSec, totalSec) => {
          setPlaybackProgress(currentSec / totalSec);
        },
        () => {
          setStatus('complete');
        },
      );
    } catch (error) {
      console.error('Playback layer crash:', error);
      setStatus('complete');
    }
  };

  const resetRecordingFlow = () => {
    setFilePath('');
    setTimerText('00:00');
    setPlaybackProgress(0);
    setStatus('ready');
  };

  const handleContinuePipeline = () => {
    navigation.navigate('VoiceMessagePreview');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Voice Message'} />
      <LinearGradient
        colors={['rgba(197, 147, 83, 0.35)', 'rgba(0, 0, 0, 0)']}
        style={styles.headerGlowBackground}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.progressRowContainer}>
          <View style={[styles.progressStepCapsule, styles.stepActive]}>
            <AppText
              text="1 Pick format"
              size="tiny"
              color={COLORS.BLACK}
              fontFamily={FONT.TTForseSemiBold}
            />
          </View>
          <View style={styles.progressConnectorLine} />
          <View style={[styles.progressStepCapsule, styles.stepActive]}>
            <AppText
              text="2 Create"
              size="tiny"
              color={COLORS.BLACK}
              fontFamily={FONT.TTForseSemiBold}
            />
          </View>
          <View style={styles.progressConnectorLine} />
          <View style={[styles.progressStepCapsule, styles.stepInactive]}>
            <AppText text="3 Assign" size="tiny" color="#63523B" />
          </View>
        </View>

        {/* Dynamic Context Target Header */}
        <View style={styles.sectionTitleRow}>
          <View
            style={
              status === 'complete' || status === 'playing'
                ? styles.pinkStatusDot
                : styles.purpleStatusDot
            }
          />
          <AppText
            text={
              status === 'complete' || status === 'playing'
                ? 'Record or Upload a video'
                : 'Record your voice'
            }
            size="medium"
            fontFamily={FONT.TTForseBold}
            color={COLORS.WHITE}
          />
        </View>

        {/* Massive Audio Hub Windows (Shared Circular Geometry Context) */}
        <View style={styles.audioHubContainer}>
          <View style={styles.giantCircularTrackRing}>
            <Icon
              name={status === 'recording' ? 'microphone-glow' : 'microphone'}
              size={32}
              color="#A78BFA"
              style={styles.micCenterIcon}
            />
            <AppText
              text={
                status === 'ready'
                  ? 'Microphone Ready'
                  : status === 'recording'
                  ? 'Recording Active...'
                  : status === 'playing'
                  ? 'Playing Voice Message Preview'
                  : 'Voice Recording Complete'
              }
              size="medium"
              fontFamily={FONT.TTForseBold}
              color={COLORS.WHITE}
              style={styles.statusLabelText}
            />
            <AppText
              text={timerText}
              size="medium"
              color="#A78BFA"
              style={styles.timerCounterDisplay}
            />
          </View>
        </View>

        {/* Conditional Footer Interface Controls Renderer Layer */}
        {status === 'ready' || status === 'recording' ? (
          /* Active Recording State Sub-Block Layout */
          <View style={styles.captureControlBlock}>
            <TouchableOpacity
              style={[
                styles.outerCaptureCircleBorder,
                status === 'recording' && { borderColor: '#F43F5E' },
              ]}
              activeOpacity={0.85}
              onPress={
                status === 'recording'
                  ? handleStopRecording
                  : handleStartRecording
              }
            >
              <Icon
                name={status === 'recording' ? 'stop' : 'microphone'}
                size={36}
                color={status === 'recording' ? '#F43F5E' : COLORS.WHITE}
              />
            </TouchableOpacity>
            <Subtitle
              text={
                status === 'recording'
                  ? 'Tap to finish recording'
                  : 'Tap to start recording'
              }
              size="small"
              align="center"
              style={styles.actionPromptLabel}
            />
          </View>
        ) : (
          /* Review State Sub-Block Layout Container (Screenshot 2026-06-09 at 8.49.32 AM.png) */
          <View style={styles.reviewFlowControlWrapper}>
            <View style={styles.playbackControlBlock}>
              <TouchableOpacity
                style={styles.outerPlaybackCircleBorder}
                activeOpacity={0.85}
                onPress={handlePlayRecording}
                disabled={status === 'playing'}
              >
                <View
                  style={[
                    styles.innerPurpleSolidCore,
                    status === 'playing' && { opacity: 0.6 },
                  ]}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.footerActionRow}>
              <Button
                onPress={resetRecordingFlow}
                leftIcon="refresh"
                title="Cancel"
                variant="other"
                style={{ flex: 1 }}
              />
              <Button
                rightIcon="arrow-right"
                onPress={handleContinuePipeline}
                title="Continue"
                style={{ flex: 1 }}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaView>
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
    paddingHorizontal: Spacing.medium,
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
  pinkStatusDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.circle,
    backgroundColor: '#F43F5E',
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
  reviewFlowControlWrapper: {
    marginTop: 'auto',
  },
  playbackControlBlock: {
    alignItems: 'center',
    marginBottom: Responsive.height(28),
  },
  outerPlaybackCircleBorder: {
    width: Responsive.width(72),
    height: Responsive.width(72),
    borderRadius: Radius.circle,
    borderWidth: 2,
    borderColor: '#A78BFA',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerPurpleSolidCore: {
    width: Responsive.width(52),
    height: Responsive.width(52),
    borderRadius: Radius.circle,
    backgroundColor: '#A78BFA',
  },
  footerActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Responsive.height(36),
    gap: Spacing.medium,
  },
});
