import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { FONT } from '../../../components/constants/font';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import VoiceMessageBubble from '../../../components/messages/voiceMessageBubble/voiceMessageBubble';
import { Button } from '../../../components/common/button/button';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

export default function VoiceMessagePreview({ navigation, route }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const { audioFilePath, duration, timestamp, date } = route?.params || {};

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Voice Message'} />
      <GradientBackground />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.sectionTitleRow}>
          <View style={styles.pinkStatusDot} />
          <AppText
            text="Recorded voice Message"
            size="medium"
            fontFamily={FONT.TTForseSemiBold}
            color={COLORS.WHITE}
          />
        </View>

        <VoiceMessageBubble
          path={audioFilePath}
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          duration={duration}
          timestamp={timestamp}
        />

        <View style={styles.footerActionRow}>
          <Button
            style={{ flex: 1 }}
            title="Retake"
            leftIcon="refresh"
            variant={'other'}
            flexDirection="row"
            iconColor={COLORS.GOLD}
            onPress={() => navigation.goBack()}
          />
          <Button
            onPress={() => {
              navigation.navigate('AddMessageDetails', {
                messageType: 'voice',
                audioFilePath,
              });
            }}
            flexDirection="row"
            style={{ flex: 1 }}
            title="Next"
            rightIcon="arrow-right"
          />
        </View>
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
    height: Responsive.height(140),
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    padding: Spacing.medium,
    marginTop: Spacing.small,
  },
  richTextAreaInput: {
    flex: 1,
    color: COLORS.WHITE,
    fontSize: FontSize.medium,
    fontFamily: FONT.TTForseMedium,
    lineHeight: 22,
  },
  footerActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Responsive.height(36),
    marginTop: Spacing.medium,
    gap: Spacing.medium,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
