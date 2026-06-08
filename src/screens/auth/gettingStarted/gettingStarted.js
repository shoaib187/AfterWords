import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../../components/typography/appText/appText';
import Title from '../../../components/typography/title/title';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import { Button } from '../../../components/common/button/button';

export default function GettingStarted() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.safeArea}>
        <View style={styles.centerContainer}>
          {/* <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            /> */}
          <AppText text={'MESSAGE THAT LAST FOREVER'} color={COLORS.GOLD} />
        </View>

        {/* Bottom Area: Description text and CTA Button */}
        <View style={styles.bottomContainer}>
          <AppText
            text={
              'Preserve your most meaningful memories and ensure they reach the right hands, at the right time.'
            }
            style={styles.description}
          />

          <Button title="Begin Your Journey" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Crisp, rich pure black backdrop
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Responsive.height(40),
  },
  logo: {
    width: Responsive.width(160),
    height: Responsive.width(160),
    marginBottom: Spacing.medium,
  },
  brandName: {
    fontSize: FontSize.xxLarge,
    fontWeight: '400',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  brandNameGold: {
    color: '#DCA257',
    fontWeight: '600',
  },
  subTagline: {
    fontSize: FontSize.tiny,
    color: '#A17A44',
    fontWeight: '500',
    letterSpacing: 2,
    marginTop: Spacing.small,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: Responsive.height(40),
  },
  description: {
    fontSize: FontSize.medium,
    color: '#E0E0E0',
    textAlign: 'center',
    lineHeight: FontSize.medium * 1.5,
    marginBottom: Responsive.height(48),
    paddingHorizontal: Spacing.small,
    fontWeight: '400',
  },
  button: {
    width: '100%',
    height: Responsive.height(56),
    backgroundColor: '#C59353',
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: FontSize.large,
    fontWeight: '600',
  },
});
