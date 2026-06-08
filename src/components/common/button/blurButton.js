import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

import { Responsive, FontSize, Radius, Spacing } from '../../constants/styles';
import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';
export const BlurButton = React.memo(({ text, wrapperStyle }) => {
  return (
    <View style={[styles.blurButtonWrapper, wrapperStyle]}>
      <Text style={styles.kmText}>{text} away</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  blurButtonWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: Radius.full,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.3)',

    // Layout
    minWidth: Responsive.width(80),
    paddingHorizontal: Spacing.tiny,
    paddingVertical: Spacing.tiny * 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  kmText: {
    fontFamily: FONT.SpaceGroteskBold,
    color: COLORS.WHITE,
    fontSize: FontSize.tiny,
    letterSpacing: 0.5,
    includeFontPadding: false,
    textAlign: 'center',
  },
});