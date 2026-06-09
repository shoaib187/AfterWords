import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

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

export default function ReviewSummary({ navigation, route }) {
  const recipientName = route?.params?.recipientName || 'Sofia Chen';
  const noteContent = route?.params?.noteContent || 'No note added yet';

  const handleFinalSeal = () => {
    console.log('Memory successfully encrypted and saved permanently.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <HeaderBack title={'Review'} />
      <LinearGradient
        colors={['rgba(190, 140, 53, 0.25)', 'rgba(0, 0, 0, 0)']}
        style={styles.headerGlowBackground}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <View style={styles.topHeaderSpacing}>
        <AppText
          text="READY TO SEAL YOUR MEMORY?"
          size="medium"
          color={COLORS.WHITE}
          align="center"
        />
      </View>

      <LinearGradient
        colors={['#F5EAD9', '#D5A760']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.summaryGradientCard}
      >
        <View style={styles.summarySectionBlock}>
          <Subtitle
            text="Recipient"
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
            text="Attachment"
            size="medium"
            color="#1A1105"
            style={styles.serifLabel}
          />
          <View style={styles.attachmentInlineRow}>
            <Ionicons
              name="videocam"
              size={Responsive.width(18)}
              color={COLORS.GOLD}
              style={styles.inlineIconSpacing}
            />
            <Title
              text="Video Message"
              size="medium"
              color={COLORS.BLACK}
              fontFamily={FONT.TTForseSemiBold}
            />
          </View>
        </View>

        <View style={styles.noMarginBottom}>
          <Subtitle
            text="Note"
            size="medium"
            color={COLORS.BLACK}
            style={styles.serifLabel}
          />
          <Subtitle text={noteContent} size="medium" color={COLORS.BLACK} />
        </View>
      </LinearGradient>
      <View style={{ padding: Spacing.medium }}>
        <Button title="Lock Secure & Save Message" />
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
});
