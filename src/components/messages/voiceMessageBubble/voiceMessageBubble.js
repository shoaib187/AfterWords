import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/font';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../../typography/appText/appText';

export default function VoiceMessageBubble({ isPlaying, handlePlayPause }) {
  const renderMockWaveform = () => {
    const bars = [
      12, 18, 14, 24, 20, 16, 22, 14, 18, 24, 12, 16, 20, 14, 22, 18, 24, 14,
      16, 12, 20, 14, 22, 16,
    ];
    return (
      <View style={styles.waveformTrackRow}>
        {bars.map((height, index) => (
          <View
            key={index}
            style={[
              styles.waveformBar,
              {
                height: height,
                // Changes coloring halfway down the stream to simulate active playback tracker indexing
                backgroundColor: index < 10 ? '#4A3515' : COLORS.WHITE,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#EEDBB2', '#C59353']}
      style={styles.audioPlayerCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.playerCardTopRow}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handlePlayPause}
          style={styles.playButtonTrigger}
        >
          <Icon
            name={isPlaying ? 'pause' : 'play'}
            size={Responsive.width(28)}
            color={COLORS.BLACK}
          />
        </TouchableOpacity>

        {renderMockWaveform()}
      </View>

      <View style={styles.playerCardBottomRow}>
        <AppText
          text="1:10"
          size="tiny"
          color="#4A3515"
          fontFamily={FONT.TTForseMedium}
          style={styles.timestampOffset}
        />
        <AppText
          text="4:20 pm"
          size="tiny"
          color="#4A3515"
          fontFamily={FONT.TTForseMedium}
        />
      </View>
    </LinearGradient>
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
    marginBottom: Responsive.height(20),
  },
  pinkStatusDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.circle,
    backgroundColor: '#F43F5E',
    marginRight: Spacing.small,
  },
  audioPlayerCard: {
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
    paddingBottom: Spacing.small,
    marginBottom: Responsive.height(32),
  },
  playerCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButtonTrigger: {
    marginRight: Spacing.small,
  },
  waveformTrackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  waveformBar: {
    width: 3,
    borderRadius: 1.5,
  },
  playerCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: Responsive.width(36),
    marginTop: 2,
  },
  timestampOffset: {
    marginLeft: 2,
  },
  textEditorContainer: {
    flex: 1,
  },
  inputContextLabel: {
    fontFamily: 'Georgia',
    fontSize: 17,
    marginBottom: Spacing.medium,
    lineHeight: 24,
  },
  inputBorderWrapper: {
    width: '100%',
    height: Responsive.height(240),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C59353',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    padding: Spacing.medium,
  },
  richTextAreaInput: {
    flex: 1,
    color: COLORS.WHITE,
    fontSize: 15,
    fontFamily: FONT.TTForseMedium,
    lineHeight: 22,
  },
  footerActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Responsive.height(36),
    marginTop: Spacing.medium,
  },
  redoOutlineButton: {
    width: '45%',
    height: Responsive.height(54),
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(192, 140, 53, 0.5)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  inlineIconSpacing: {
    marginRight: 8,
  },
  nextGoldButton: {
    width: '48%',
    height: Responsive.height(54),
    backgroundColor: '#D5A760',
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineArrowOffset: {
    marginLeft: 6,
    marginTop: 1,
  },
});
