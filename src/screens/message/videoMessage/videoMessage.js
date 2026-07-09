import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../../components/typography/appText/appText';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import { FONT } from '../../../components/constants/font';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

export default function VideoMessageRecorder({ navigation }) {
  const [isRecording, setIsRecording] = useState(false);
  // Toggle to switch between live recording mode and the recorded preview state seen in Screenshot 2026-06-08 at 5.02.31 PM.png
  const [isRecorded, setIsRecorded] = useState(true);
  const [noteText, setNoteText] = useState('');
  const recordButtonScale = useRef(new Animated.Value(1)).current;

  const handleRecordTrigger = () => {
    Animated.sequence([
      Animated.spring(recordButtonScale, {
        toValue: 0.9,
        useNativeDriver: true,
        friction: 4,
        tension: 40,
      }),
      Animated.spring(recordButtonScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 4,
        tension: 40,
      }),
    ]).start();

    if (isRecording) {
      setIsRecording(false);
      setIsRecorded(true); // Automatically jump to preview state when recording stops
    } else {
      setIsRecording(true);
    }
  };

  const handleRedo = () => {
    setIsRecorded(false);
    setIsRecording(false);
  };

  const handleNext = () => {
    navigation.navigate('AddMessageDetails');
  };

  return (
    <View style={styles.container}>
      <GradientBackground />

      <HeaderBack title={'Video Message'} />

      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Stepper Wizard Track ── */}
          <View style={styles.stepperContainer}>
            <View style={styles.stepperLineTrack} />
            <View style={styles.stepperRow}>
              <View style={[styles.stepBadge, styles.stepBadgeCompleted]}>
                <AppText
                  text="1  Pick format"
                  style={styles.stepTextCompleted}
                />
              </View>
              <View style={[styles.stepBadge, styles.stepBadgeActive]}>
                <AppText text="2  Create" style={styles.stepTextActive} />
              </View>
              <View style={[styles.stepBadge, styles.stepBadgePending]}>
                <AppText text="3  Assign" style={styles.stepTextPending} />
              </View>
            </View>
          </View>

          {/* ── Dynamic Action Row Context ── */}
          <View style={styles.actionPromptRow}>
            <View style={styles.pinkStatusDot} />
            <AppText
              text={isRecorded ? 'Recorded video' : 'Record or Upload a video'}
              style={styles.actionPromptText}
            />
          </View>

          {/* ── Render Conditional Viewport Layer ── */}
          {!isRecorded ? (
            /* ── Live Camera Recording Workspace Viewport ── */
            <View style={styles.cameraFrameWrapper}>
              <View style={styles.cameraInnerViewport}>
                <View style={styles.viewportBottomLayoutRow}>
                  <AppText text="00:00" style={styles.timestampText} />
                  <View style={styles.previewIndicatorWrapper}>
                    <Ionicons
                      name="videocam"
                      size={16}
                      color="#FFFFFF"
                      style={styles.camIconOffset}
                    />
                    <AppText
                      text="Camera preview"
                      style={styles.cameraPreviewText}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : (
            /* ── Video Recorded Preview Setup Viewport ── */
            <View style={styles.previewContentContainer}>
              <View style={styles.videoPreviewWrapper}>
                {/* Fallback dark container; use your local source URI string inside Image */}
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600',
                  }}
                  style={styles.videoPreviewImage}
                  resizeMode="cover"
                />
                <View style={styles.videoOverlayBlurShield} />

                {/* Central Play Back Trigger Button */}
                <TouchableOpacity
                  style={styles.playCenterButton}
                  activeOpacity={0.85}
                >
                  <Ionicons name="play-circle" size={68} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Title Form Context Section */}
              <AppText
                text="Add a title or a note to go with your video"
                style={styles.noteLabelTitleSerif}
              />

              <View style={styles.noteInputContainer}>
                <TextInput
                  style={styles.noteInputField}
                  placeholder="Write your message here....."
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  multiline
                  value={noteText}
                  onChangeText={setNoteText}
                  keyboardAppearance="dark"
                />
              </View>
            </View>
          )}
        </ScrollView>

        {/* ── Bottom Action Control Center Layer ── */}
        {!isRecorded ? (
          /* Live Shutter Row Control Box */
          <View style={styles.captureControlSection}>
            <Animated.View
              style={{ transform: [{ scale: recordButtonScale }] }}
            >
              <TouchableOpacity
                onPress={handleRecordTrigger}
                activeOpacity={0.9}
                style={styles.outerShutterRing}
              >
                <View
                  style={[
                    styles.innerShutterCore,
                    isRecording && styles.innerShutterCoreActive,
                  ]}
                />
              </TouchableOpacity>
            </Animated.View>
            <AppText
              text={
                isRecording ? 'Tap to stop recording' : 'Tap to start recording'
              }
              style={styles.shutterLabelHint}
            />
          </View>
        ) : (
          /* Redo & Next Action Footer Controls Row */
          <View style={styles.previewActionFooterRow}>
            <TouchableOpacity
              style={styles.redoButtonOutline}
              activeOpacity={0.7}
              onPress={handleRedo}
            >
              <Ionicons
                name="refresh-outline"
                size={16}
                color="#FFFFFF"
                style={styles.redoIconGutter}
              />
              <AppText text="Redo" style={styles.redoButtonText} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButtonSolid}
              activeOpacity={0.85}
              onPress={handleNext}
            >
              <AppText text="Next" style={styles.nextButtonText} />
              <Ionicons
                name="arrow-forward"
                size={16}
                color="#111111"
                style={styles.nextIconGutter}
              />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerGlowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(220),
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: Responsive.height(24),
  },
  stepperContainer: {
    paddingHorizontal: Spacing.medium || 16,
    marginTop: Responsive.height(16),
    marginBottom: Responsive.height(32),
    justifyContent: 'center',
    position: 'relative',
  },
  stepperLineTrack: {
    position: 'absolute',
    left: Spacing.large || 16,
    right: Spacing.large || 16,
    height: 1,
    backgroundColor: 'rgba(197, 147, 83, 0.3)',
    alignSelf: 'center',
    zIndex: 1,
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  stepBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.full || 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepBadgeCompleted: {
    backgroundColor: '#F5EAD9',
    borderColor: '#C59353',
  },
  stepTextCompleted: {
    fontSize: FontSize.small,
    color: '#443322',
  },
  stepBadgeActive: {
    backgroundColor: '#D5A760',
    borderColor: '#C59353',
  },
  stepTextActive: {
    fontSize: FontSize.small,
    color: COLORS.BLACK,
  },
  stepBadgePending: {
    backgroundColor: COLORS.BLACK,
    borderColor: '#443322',
  },
  stepTextPending: {
    fontSize: FontSize.small,
    color: COLORS.GOLD,
  },
  actionPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.medium,
  },
  pinkStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#E57373',
    marginRight: 10,
    shadowColor: '#E57373',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  actionPromptText: {
    color: COLORS.WHITE || '#FFFFFF',
    fontSize: FontSize.small || 13,
    fontFamily: FONT.TTForseSemiBold,
  },
  cameraFrameWrapper: {
    marginHorizontal: Spacing.medium,
    borderRadius: Radius.xLarge || 24,
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.45)',
    backgroundColor: '#0A0A0A',
    height: Responsive.height(380),
    marginBottom: Responsive.height(28),
    overflow: 'hidden',
  },
  cameraInnerViewport: {
    flex: 1,
    padding: Spacing.large || 16,
    justifyContent: 'flex-end',
  },
  viewportBottomLayoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestampText: {
    color: '#FFFFFF',
    fontSize: FontSize.medium || 14,
    fontFamily: FONT.TTForseRegular,
    opacity: 0.8,
  },
  previewIndicatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.75,
  },
  camIconOffset: {
    marginRight: 6,
  },
  cameraPreviewText: {
    color: '#FFFFFF',
    fontSize: FontSize.tiny || 11,
    fontFamily: FONT.TTForseRegular,
  },
  // Preview Elements Added for Screen Matching
  previewContentContainer: {
    paddingHorizontal: Spacing.medium,
  },
  videoPreviewWrapper: {
    width: '100%',
    height: Responsive.height(240),
    borderRadius: Radius.xLarge || 24,
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.45)',
    backgroundColor: '#111111',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Responsive.height(24),
  },
  videoPreviewImage: {
    width: '100%',
    height: '100%',
  },
  videoOverlayBlurShield: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  playCenterButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  noteLabelTitleSerif: {
    fontSize: FontSize.medium || 16,
    color: '#FFFFFF',
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    marginBottom: Spacing.medium || 12,
  },
  noteInputContainer: {
    width: '100%',
    height: Responsive.height(210),
    borderRadius: Radius.xLarge || 20,
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.45)',
    backgroundColor: 'transparent',
    padding: Spacing.medium || 14,
    marginBottom: Responsive.height(16),
  },
  noteInputField: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: FontSize.medium || 14,
    fontFamily: FONT.TTForseRegular,
    textAlignVertical: 'top',
    padding: 0,
  },
  captureControlSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Responsive.height(12),
  },
  outerShutterRing: {
    width: Responsive.width(72),
    height: Responsive.width(72),
    borderRadius: Responsive.width(36),
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.medium || 12,
  },
  innerShutterCore: {
    width: Responsive.width(52),
    height: Responsive.width(52),
    borderRadius: Responsive.width(26),
    backgroundColor: '#E57373',
  },
  innerShutterCoreActive: {
    borderRadius: Radius.medium || 8,
    width: Responsive.width(36),
    height: Responsive.width(36),
  },
  shutterLabelHint: {
    color: '#888888',
    fontSize: FontSize.small || 12,
    fontFamily: FONT.TTForseRegular,
  },
  // Redo & Next Persistent Buttons Layout Action Group Bar
  previewActionFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Responsive.height(12),
    backgroundColor: '#000000',
  },
  redoButtonOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Responsive.height(12),
    paddingHorizontal: Responsive.width(28),
    borderRadius: Radius.full || 30,
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.5)',
    backgroundColor: 'transparent',
  },
  redoIconGutter: {
    marginRight: 6,
  },
  redoButtonText: {
    color: '#FFFFFF',
    fontSize: FontSize.medium || 14,
    fontFamily: FONT.TTForseSemiBold,
    fontWeight: '600',
  },
  nextButtonSolid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Responsive.height(14),
    paddingHorizontal: Responsive.width(38),
    borderRadius: Radius.full || 30,
    backgroundColor: '#C59353',
  },
  nextIconGutter: {
    marginLeft: 6,
  },
  nextButtonText: {
    color: '#111111',
    fontSize: FontSize.medium || 14,
    fontFamily: FONT.TTForseBold,
    fontWeight: '700',
  },
});
