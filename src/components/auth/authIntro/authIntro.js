import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSize, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/font';
import { COLORS } from '../../constants/color';


export default function AuthIntro({ title, subtitle, wrapperStyle }) {
  return (
    <View style={[styles.container, wrapperStyle]}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.subHeading}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.large,
    width: '90%'
  },
  heading: {
    fontSize: FontSize.xxLarge,
    fontFamily: FONT.SpaceGroteskBold,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: Responsive.height(10),
    textAlign: 'center',
  },
  subHeading: {
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskRegular,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    // lineHeight: Responsive.height(22),
    opacity: 0.8,
  },
});