import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import HeaderBack from '../../../components/common/headerBack/headerBack';

import { FONT } from '../../../components/constants/font';
import { COLORS } from '../../../components/constants/color';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

export default function AccountRecovery({ navigation }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const recoveryCards = [
    {
      id: 'master-key',
      title: 'Master Recovery Key',
      description:
        'Your 12-word recovery phrase is the only way to restore access if you lose your phone and biometric credentials.',
      type: 'recovery-key',
    },
    {
      id: 'trusted-contact',
      title: 'Trusted Recovery Contact',
      description:
        "Assign a trusted person who can help verify your identity if you're locked out.",
      type: 'contact',
    },
  ];

  const renderCard = item => {
    return (
      <LinearGradient
        key={item.id}
        colors={['#F9F5EB', '#D9A451']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <Title
            text={item.title}
            size="large"
            fontFamily={FONT.TTForseBold}
            color="#1C1917"
            align="center"
          />

          <AppText
            text={item.description}
            size="medium"
            fontFamily={FONT.TTForseRegular}
            color="#1C1917"
            align="center"
            style={styles.description}
          />

          {item.type === 'recovery-key' && (
            <LinearGradient
              colors={['#D4A843', '#9A7828']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.keyContainer}
            >
              <AppText
                text={
                  isRevealed
                    ? 'alpha bravo charlie delta echo foxtrot golf hotel india juliet kilo lima'
                    : '•••• •••• •••• •••• ••••'
                }
                size="medium"
                color="#1C1917"
                align="center"
                style={
                  isRevealed ? styles.revealedKeyText : styles.maskedKeyText
                }
              />
            </LinearGradient>
          )}

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.buttonWrapper}
            onPress={() => {
              if (item.type === 'recovery-key') {
                setIsRevealed(!isRevealed);
              }
            }}
          >
            <LinearGradient
              colors={['#D4A843', '#9A7828']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <AppText
                text={
                  item.type === 'recovery-key'
                    ? isRevealed
                      ? 'Hide Key'
                      : 'Reveal Key'
                    : 'Add Contact'
                }
                size="medium"
                color="#1C1917"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />

      <HeaderBack title="Account Recovery" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {recoveryCards.map(renderCard)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK || '#000',
  },

  ambientGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(220),
  },

  contentContainer: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.small,
    paddingBottom: Responsive.height(40),
  },

  card: {
    borderRadius: 32,
    marginBottom: Responsive.height(24),
    overflow: 'hidden',
  },

  cardContent: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Responsive.height(28),
    alignItems: 'center',
  },

  description: {
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 22,
    opacity: 0.9,
  },

  keyContainer: {
    width: '100%',
    minHeight: Responsive.height(46),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small,
    marginBottom: Spacing.medium,
  },

  maskedKeyText: {
    letterSpacing: 4,
  },

  revealedKeyText: {
    fontSize: FontSize.medium,
    lineHeight: 18,
  },

  buttonWrapper: {
    width: '100%',
  },

  button: {
    height: Responsive.height(46),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
