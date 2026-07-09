import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppText from '../../../components/typography/appText/appText';
import Subtitle from '../../../components/typography/subtitle/subtitle';
import Title from '../../../components/typography/title/title';
import { COLORS } from '../../../components/constants/color';
import { FONT } from '../../../components/constants/font';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import { Button } from '../../../components/common/button/button';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import VoiceMessageBubble from '../../../components/messages/voiceMessageBubble/voiceMessageBubble';
import DocumentDownloadCard from '../../../components/common/documentDownloadCard/documentDownloadCard';

export default function ReviewSummary({ navigation, route }) {
  const { messageType } = route?.params || {};

  const recipientName = route?.params?.recipientName || 'Advice for my son';
  const noteContent =
    route?.params?.noteContent || 'Thoughts on responsibilty and dicipline';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <HeaderBack title={'Review'} />
      <GradientBackground />

      <View style={styles.topHeaderSpacing}>
        <AppText
          text="READY TO SAVE YOUR TREASURE?"
          size="medium"
          color={COLORS.WHITE}
          align="center"
        />
      </View>

      <View style={{ paddingHorizontal: Spacing.medium }}>
        {/* <Video source={{uri:""}} /> */}
        {messageType === 'photo' && (
          <Image
            source={require('../../../../assets/images/avatar_1.jpg')}
            style={{
              alignSelf: 'center',
              width: '100%',
              height: Responsive.height(200),
              borderRadius: Radius.xLarge,
              marginBottom: Spacing.medium,
            }}
          />
        )}
        {messageType === 'voice' && <VoiceMessageBubble />}
        {messageType === 'document' && (
          <>
            <LinearGradient
              colors={['#EEDBB2', '#C59353']}
              style={styles.attachedFileCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.fileCardLeftRow}>
                <View style={styles.miniFileIconBox}>
                  <Icon
                    name="file-document-outline"
                    size={22}
                    color="#CD974A"
                  />
                </View>
                <View style={styles.fileMetaDetailsColumn}>
                  <AppText
                    text={'Eleanor_Will_2025.pdf'}
                    size="medium"
                    color="#000000"
                    fontFamily={FONT.TTForseSemiBold}
                    numberOfLines={1}
                  />
                  <AppText
                    text={`${'2.4 MB'} · Ready to attach`}
                    size="small"
                    color="rgba(0, 0, 0, 0.6)"
                    fontFamily={FONT.TTForseMedium}
                    style={styles.statusSubtitleSpacing}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.clearCardCrossButton}
                activeOpacity={0.7}
              >
                <Icon
                  name="close"
                  size={Responsive.width(20)}
                  color="#000000"
                />
              </TouchableOpacity>
            </LinearGradient>
          </>
        )}
      </View>

      <LinearGradient
        colors={['#F5EAD9', '#D5A760']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.summaryGradientCard}
      >
        <View style={styles.summarySectionBlock}>
          <Subtitle
            text="Title"
            size="medium"
            color="#1A1105"
            style={styles.serifLabel}
          />
          <Title
            text={recipientName}
            size="large"
            color={COLORS.BLACK}
            fontFamily={FONT.TTForseSemiBold}
          />
        </View>

        <View style={styles.summarySectionBlock}>
          <Subtitle
            text="Label"
            size="medium"
            color="#1A1105"
            style={styles.serifLabel}
          />

          <Title
            text="Life lessons"
            size="medium"
            color={COLORS.BLACK}
            fontFamily={FONT.TTForseSemiBold}
          />
        </View>

        <View style={styles.noMarginBottom}>
          <Subtitle
            text="Description"
            size="medium"
            color={COLORS.BLACK}
            style={styles.serifLabel}
          />
          <Subtitle text={noteContent} size="medium" color={COLORS.BLACK} />
        </View>
      </LinearGradient>

      <View style={{ padding: Spacing.medium }}>
        <Button
          onPress={() => navigation.navigate('TreasureSaved')}
          title="Save Treasure"
        />
      </View>
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
    height: Responsive.height(220),
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.large,
  },
  topHeaderSpacing: {
    marginTop: Responsive.height(48),
    marginBottom: Responsive.height(44),
    alignItems: 'center',
    justifyContent: 'center',
  },
  uppercaseHeaderLabel: {
    letterSpacing: 1.5,
    fontWeight: '700',
  },
  summaryGradientCard: {
    borderRadius: Radius.xLarge * 1.5,
    paddingVertical: Responsive.height(14),
    paddingHorizontal: Spacing.large,
    marginHorizontal: Spacing.medium,
  },
  summarySectionBlock: {
    marginBottom: Spacing.medium,
  },
  noMarginBottom: {
    marginBottom: 0,
  },
  serifLabel: {
    opacity: 0.9,
    marginBottom: 6,
  },
  attachmentInlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineIconSpacing: {
    marginRight: Spacing.tiny + 4,
    marginTop: 1,
  },
  opacityOffset: {
    opacity: 0.75,
  },
  flexSpacer: {
    flex: 1,
  },

  attachedFileCard: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: Spacing.medium + 4,
    paddingHorizontal: Spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Responsive.height(32),
  },
  fileCardLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: Spacing.small,
  },
  miniFileIconBox: {
    width: Responsive.width(42),
    height: Responsive.width(42),
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileMetaDetailsColumn: {
    marginLeft: Spacing.small + 2,
    flex: 1,
  },
  statusSubtitleSpacing: {
    marginTop: 2,
  },
  clearCardCrossButton: {
    width: Responsive.width(28),
    height: Responsive.width(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
