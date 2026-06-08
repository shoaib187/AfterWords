import React, { useState } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { Button } from '../../../components/common/button/button';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import Title from '../../../components/typography/title/title';
import Subtitle from '../../../components/typography/subtitle/subtitle';

export default function SecureVault({ navigation }) {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <HeaderBack showBack={true} title={'Secure your Vault'} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <View style={styles.illustrationWrapper}>
            <View style={styles.outerRingGraphic}>
              <View style={styles.innerFingerprintDisc}>
                {/* Imgage here */}
              </View>
              {/* verfied badge as well */}
            </View>
          </View>

          <AppText
            text={
              'Use Face ID or Touch ID to access your legacy vault instantly — no password required every time.'
            }
            align="center"
            style={{ marginBottom: Spacing.large }}
          />
          <View style={styles.toggleCard}>
            <View style={styles.cardLeftSection}>
              <View style={styles.cardIconCircle}>
                <Ionicons
                  name="finger-print"
                  size={Responsive.width(26)}
                  color={COLORS.GOLD}
                />
              </View>
              <View style={styles.cardTextWrapper}>
                <Title
                  text={'Enable Biometric login'}
                  style={styles.cardTitle}
                />
                <Subtitle
                  text={'Face ID or Fingerprint'}
                  style={styles.cardSubtitle}
                />
              </View>
            </View>

            <Switch
              value={isBiometricEnabled}
              onValueChange={setIsBiometricEnabled}
              trackColor={{ false: '#3E3E3E', true: '#C59353' }}
              thumbColor={isBiometricEnabled ? '#FFFFFF' : '#F4F3F4'}
              ios_backgroundColor="#3E3E3E"
            />
          </View>
        </View>

        <View style={styles.bottomWrapper}>
          <Button title="Enable Face ID" />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    justifyContent: 'center',
  },
  illustrationWrapper: {
    width: Responsive.width(200),
    height: Responsive.width(200),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Responsive.height(32),
  },
  centerGlowOffset: {
    top: '50%',
    left: '50%',
  },
  outerRingGraphic: {
    width: Responsive.width(130),
    height: Responsive.width(130),
    borderRadius: Responsive.width(65),
    borderWidth: 2,
    borderColor: '#C59353',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerFingerprintDisc: {
    width: Responsive.width(100),
    height: Responsive.width(100),
    borderRadius: Responsive.width(50),
    backgroundColor: '#1E1F24',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.2)',
  },

  toggleCard: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: Radius.full * 3,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIconCircle: {
    width: Responsive.width(44),
    height: Responsive.width(44),
    borderRadius: Responsive.width(22),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  cardTextWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FontSize.medium,
    color: '#111111',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: FontSize.small,
  },
  bottomWrapper: {
    paddingHorizontal: Spacing.medium,
    marginBottom: Responsive.height(40),
  },
});
