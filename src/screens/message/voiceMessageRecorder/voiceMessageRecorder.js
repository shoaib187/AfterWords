import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

// Constants
const STATUS = {
  READY: 'ready',
  RECORDING: 'recording',
  COMPLETE: 'complete',
  PLAYING: 'playing',
};

const STATUS_CONFIG = {
  [STATUS.READY]: {
    label: 'Microphone Ready',
    dotColor: '#C084FC',
    icon: 'microphone',
  },
  [STATUS.RECORDING]: {
    label: 'Recording Active...',
    dotColor: '#F43F5E',
    icon: 'microphone-glow',
  },
  [STATUS.COMPLETE]: {
    label: 'Voice Recording Complete',
    dotColor: '#F43F5E',
    icon: 'microphone',
  },
  [STATUS.PLAYING]: {
    label: 'Playing Voice Message Preview',
    dotColor: '#F43F5E',
    icon: 'microphone',
  },
};

// Helper function to format time
const formatTime = seconds => {
  if (!seconds || isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
};

// Helper to get current timestamp
const getCurrentTimestamp = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Helper to get full date
const getFullDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function VoiceMessageRecorder({ navigation }) {
  // State
  const [status, setStatus] = useState(STATUS.READY);
  const [filePath, setFilePath] = useState('');
  const [timerText, setTimerText] = useState('00:00');
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [timestamp, setTimestamp] = useState('');
  const [date, setDate] = useState('');
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [recordingStartTime, setRecordingStartTime] = useState(null);

  const statusRef = useRef(status);
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (statusRef.current === STATUS.RECORDING) {
        stopRecording().catch(console.error);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Start timer for recording
  const startTimer = () => {
    let seconds = 0;
    setRecordingStartTime(Date.now());

    timerIntervalRef.current = setInterval(() => {
      seconds++;
      setRecordingDuration(seconds);
      setTimerText(formatTime(seconds));
    }, 1000);
  };

  // Stop timer
  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  // Reset all states
  const resetRecordingFlow = () => {
    stopTimer();
    setFilePath('');
    setTimerText('00:00');
    setRecordingDuration(0);
    setPlaybackProgress(0);
    setTimestamp('');
    setDate('');
    setRecordingStartTime(null);
    setStatus(STATUS.READY);
  };

  // Handle Start Recording
  const handleStartRecording = async () => {
    try {
      setStatus(STATUS.RECORDING);
      setTimestamp(getCurrentTimestamp());
      setDate(getFullDate());
      startTimer();

      await recordVoice(timeEvent => {
        // Update timer from the recording function
        if (timeEvent.formatted) {
          setTimerText(timeEvent.formatted);
        }
      });
    } catch (error) {
      console.error('Failed to start recording:', error);
      stopTimer();
      setStatus(STATUS.READY);
    }
  };

  // Handle Stop Recording
  const handleStopRecording = async () => {
    try {
      const recordedUrl = await stopRecording();
      stopTimer();
      setFilePath(recordedUrl);

      // Ensure we have the final duration
      if (recordingDuration === 0) {
        setRecordingDuration(70); // Default fallback
        setTimerText('01:10');
      }

      setStatus(STATUS.COMPLETE);
    } catch (error) {
      console.error('Failed to stop recording:', error);
      stopTimer();
      setStatus(STATUS.READY);
    }
  };

  // Handle Play Recording Preview
  const handlePlayRecording = async () => {
    if (!filePath) return;

    try {
      setStatus(STATUS.PLAYING);
      setPlaybackProgress(0);

      await playRecording(
        filePath,
        (currentSec, totalSec) => {
          // Update progress
          const progress = totalSec > 0 ? currentSec / totalSec : 0;
          setPlaybackProgress(Math.min(progress, 1));
        },
        () => {
          // On finish
          setStatus(STATUS.COMPLETE);
          setPlaybackProgress(1);
        },
      );
    } catch (error) {
      console.error('Playback error:', error);
      setStatus(STATUS.COMPLETE);
    }
  };

  // Handle Continue to Preview
  const handleContinuePipeline = () => {
    navigation.navigate('VoiceMessagePreview', {
      audioFilePath: filePath,
      duration: recordingDuration,
      timestamp: timestamp || getCurrentTimestamp(),
      date: date || getFullDate(),
    });
  };

  // Render Status Dot
  const renderStatusDot = () => {
    const isActive = status === STATUS.COMPLETE || status === STATUS.PLAYING;
    return (
      <View
        style={[styles.statusDot, isActive ? styles.pinkDot : styles.purpleDot]}
      />
    );
  };

  // Render Status Icon
  const renderStatusIcon = () => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG[STATUS.READY];
    return (
      <Icon
        name={config.icon}
        size={32}
        color={status === STATUS.RECORDING ? '#F43F5E' : '#A78BFA'}
        style={styles.micIcon}
      />
    );
  };

  // Render Capture Controls
  const renderCaptureControls = () => {
    if (status === STATUS.READY || status === STATUS.RECORDING) {
      const isRecording = status === STATUS.RECORDING;
      return (
        <View style={styles.captureContainer}>
          <TouchableOpacity
            style={[
              styles.captureButton,
              isRecording && styles.recordingButton,
            ]}
            activeOpacity={0.85}
            onPress={isRecording ? handleStopRecording : handleStartRecording}
          >
            <Icon
              name={isRecording ? 'stop' : 'microphone'}
              size={36}
              color={isRecording ? '#F43F5E' : COLORS.WHITE}
            />
          </TouchableOpacity>
          <AppText
            text={
              isRecording ? 'Tap to finish recording' : 'Tap to start recording'
            }
            size="small"
            color="#A1A1AA"
            style={styles.actionLabel}
          />
        </View>
      );
    }

    // Playback and Review Controls
    return (
      <View style={styles.reviewContainer}>
        <View style={styles.playbackContainer}>
          <TouchableOpacity
            style={styles.playbackButton}
            activeOpacity={0.85}
            onPress={handlePlayRecording}
            disabled={status === STATUS.PLAYING}
          >
            <View
              style={[
                styles.playbackInner,
                status === STATUS.PLAYING && styles.playingInner,
              ]}
            />
          </TouchableOpacity>

          {/* Playback Progress Bar */}
          {status === STATUS.PLAYING && (
            <View style={styles.progressContainer}>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${playbackProgress * 100}%` },
                  ]}
                />
              </View>
              <AppText
                text={formatTime(recordingDuration * playbackProgress)}
                size="tiny"
                color="#A1A1AA"
                style={styles.progressTime}
              />
            </View>
          )}
        </View>

        <View style={styles.actionRow}>
          <Button
            onPress={resetRecordingFlow}
            leftIcon="refresh"
            title="Cancel"
            variant="other"
            style={styles.cancelButton}
            flexDirection="row"
            iconColor={COLORS.GOLD}
          />
          <Button
            rightIcon="arrow-right"
            onPress={handleContinuePipeline}
            title="Continue"
            style={styles.continueButton}
            flexDirection="row"
          />
        </View>
      </View>
    );
  };

  // Main Render
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Voice Message'} />
      <GradientBackground />

      <View style={styles.content}>
        {/* Header with Status */}
        <View style={styles.headerRow}>
          {renderStatusDot()}
          <AppText
            text={
              status === STATUS.COMPLETE || status === STATUS.PLAYING
                ? 'Record or Upload a video'
                : 'Record your voice'
            }
            size="medium"
            fontFamily={FONT.TTForseBold}
            color={COLORS.WHITE}
          />
        </View>

        {/* Audio Hub - Circular Display */}
        <View style={styles.audioHub}>
          <View style={styles.circularRing}>
            {renderStatusIcon()}
            <AppText
              text={
                STATUS_CONFIG[status]?.label ||
                STATUS_CONFIG[STATUS.READY].label
              }
              size="medium"
              fontFamily={FONT.TTForseBold}
              color={COLORS.WHITE}
              style={styles.statusLabel}
            />
            <AppText
              text={timerText}
              size="medium"
              color="#A78BFA"
              style={styles.timerDisplay}
            />

            {/* Show timestamp when recording or complete */}
            {(status === STATUS.RECORDING || status === STATUS.COMPLETE) && (
              <AppText
                text={`${timestamp || getCurrentTimestamp()}`}
                size="tiny"
                color="#A1A1AA"
                style={styles.timestampDisplay}
              />
            )}
          </View>
        </View>

        {/* Controls */}
        {renderCaptureControls()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Responsive.height(16),
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.circle,
    marginRight: Spacing.small,
  },
  purpleDot: {
    backgroundColor: '#C084FC',
  },
  pinkDot: {
    backgroundColor: '#F43F5E',
  },
  audioHub: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.small,
  },
  circularRing: {
    width: Responsive.width(310),
    height: Responsive.width(310),
    borderRadius: Radius.circle,
    borderWidth: 2,
    borderColor: '#C59353',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
  },
  micIcon: {
    marginBottom: Spacing.small,
  },
  statusLabel: {
    letterSpacing: 0.3,
    marginBottom: Spacing.tiny,
  },
  timerDisplay: {
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  timestampDisplay: {
    marginTop: Spacing.tiny,
    opacity: 0.7,
  },
  captureContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: Responsive.height(36),
  },
  captureButton: {
    width: Responsive.width(72),
    height: Responsive.width(72),
    borderRadius: Radius.circle,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },
  recordingButton: {
    borderColor: '#F43F5E',
  },
  actionLabel: {
    opacity: 0.85,
    fontSize: 13,
  },
  reviewContainer: {
    marginTop: 'auto',
  },
  playbackContainer: {
    alignItems: 'center',
    marginBottom: Responsive.height(28),
  },
  playbackButton: {
    width: Responsive.width(72),
    height: Responsive.width(72),
    borderRadius: Radius.circle,
    borderWidth: 2,
    borderColor: '#A78BFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playbackInner: {
    width: Responsive.width(52),
    height: Responsive.width(52),
    borderRadius: Radius.circle,
    backgroundColor: '#A78BFA',
  },
  playingInner: {
    opacity: 0.6,
  },
  progressContainer: {
    width: '80%',
    marginTop: Spacing.medium,
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: '#333',
    borderRadius: Radius.tiny,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#A78BFA',
    borderRadius: Radius.tiny,
  },
  progressTime: {
    marginTop: Spacing.tiny,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Responsive.height(36),
    gap: Spacing.medium,
  },
  cancelButton: {
    flex: 1,
  },
  continueButton: {
    flex: 1,
  },
});
