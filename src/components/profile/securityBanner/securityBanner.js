import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import GradientWrapper from '../../common/gradientWrapper/gradientWrapper';
import Title from '../../typography/title/title';
import { FONT } from '../../constants/font';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';
import { COLORS } from '../../constants/color';

const SecurityBanner = () => {
  return (
    <GradientWrapper onPress={() => {}} wrapperStyle={styles.securityBanner}>
      <MaterialCommunityIcons
        name="shield-check-outline"
        size={Responsive.width(36)}
      />

      <Title
        text="Strictly Administrative Access"
        size="medium"
        fontFamily={FONT.TTForseBold}
        style={styles.bannerTitle}
        color={COLORS.BLACK}
      />

      <Text style={styles.bannerSubtitle}>
        Executors verify your passing to unlock your delivery rules.{' '}
        <Text style={styles.boldText}>
          They NEVER have access to your private memories.
        </Text>{' '}
        The content itself remains encrypted, locked, and is delivered directly
        to the intended recipients.
      </Text>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  securityBanner: {
    borderRadius: Radius.xLarge,
    paddingVertical: Spacing.xLarge,
    paddingHorizontal: Spacing.large,
    alignItems: 'center',
    marginBottom: Responsive.height(28),
  },

  bannerTitle: {
    marginTop: Spacing.medium,
    marginBottom: Spacing.small,
    textAlign: 'center',
  },

  bannerSubtitle: {
    color: '#3B2A10',
    fontSize: FontSize.medium,
    fontFamily: FONT.TTForseRegular,
    textAlign: 'center',
    lineHeight: 20,
  },

  boldText: {
    fontFamily: FONT.TTForseBold,
  },
});

export default SecurityBanner;
