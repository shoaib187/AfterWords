import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Title from '../../../components/typography/title/title';
import { FONT } from '../../../components/constants/font';
import AppText from '../../../components/typography/appText/appText';
import { Responsive, Spacing } from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import HeaderBack from '../../../components/common/headerBack/headerBack';

const securitySettings = [
  {
    id: '2fa',
    title: 'Two-Factor Auth',
    icon: 'shield-check-outline',
    iconColor: '#34D399',
    iconBg: 'rgba(52, 211, 153, 0.04)',
  },
  {
    id: 'biometric',
    title: 'Biometric Login',
    subtitle: 'Face ID active',
    icon: 'fingerprint',
    iconColor: '#CD974A',
    iconBg: 'rgba(197, 147, 83, 0.05)',
  },
];

const verificationOptions = [
  {
    id: 'standard',
    title: 'Standard ( SMS )',
  },
  {
    id: 'strict',
    title: 'Strict ( SMS + Q&A )',
  },
];

export default function SecurityAndPrivacy({ navigation }) {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometricLogin, setBiometricLogin] = useState(true);
  const [verificationMode, setVerificationMode] = useState('standard');

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Top Ambient Gold Wash Gradient Backdrop */}
      <LinearGradient
        colors={['rgba(197, 147, 83, 0.28)', 'rgba(0, 0, 0, 0)']}
        style={styles.ambientGlow}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <HeaderBack title={'Security & Privacy'} />
      <ScrollView
        contentContainerStyle={styles.scrollLayout}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.authGroupedCardFrame}>
          <View style={styles.settingsCard}>
            {securitySettings.map((item, index) => {
              const value = item.id === '2fa' ? twoFactorAuth : biometricLogin;

              const setter =
                item.id === '2fa' ? setTwoFactorAuth : setBiometricLogin;

              return (
                <View
                  key={item.id}
                  style={[
                    styles.settingRow,
                    index !== securitySettings.length - 1 && styles.rowBorder,
                  ]}
                >
                  <View style={styles.rowLeftWrap}>
                    <View
                      style={[styles.iconBox, { backgroundColor: item.iconBg }]}
                    >
                      <Icon name={item.icon} size={20} color={item.iconColor} />
                    </View>

                    <View>
                      <Title text={item.title} size="medium" color="#FFF" />

                      {!!item.subtitle && (
                        <AppText
                          text={item.subtitle}
                          size="small"
                          color="#A1A1AA"
                        />
                      )}
                    </View>
                  </View>

                  <Switch
                    value={value}
                    onValueChange={setter}
                    trackColor={{
                      false: '#27272A',
                      true: '#CD974A',
                    }}
                    thumbColor={value ? '#1C1917' : '#71717A'}
                  />
                </View>
              );
            })}
          </View>
        </View>

        {/* Section Segment Title Label */}
        <AppText
          text="RECIPIENT VERIFICATION (HANDOVER)"
          size="tiny"
          fontFamily={FONT.TTForseBold}
          color="#A1A1AA"
          style={styles.sectionTitle}
        />

        {verificationOptions.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => setVerificationMode(item.id)}
            style={[
              styles.optionCard,
              verificationMode === item.id && styles.selectedOption,
            ]}
          >
            <Title text={item.title} size="medium" color="#FFF" />

            {verificationMode === item.id && (
              <Icon
                name="check-circle"
                size={Responsive.width(20)}
                color="#CD974A"
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },

  ambientGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(240),
  },

  scrollLayout: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.large,
    paddingBottom: Responsive.height(40),
  },

  settingsCard: {
    backgroundColor: '#050505',
    borderRadius: 24,
    borderWidth: 0.6,
    borderColor: COLORS.GOLD,
    overflow: 'hidden',
    paddingHorizontal: Spacing.medium + 2,
    marginBottom: Responsive.height(32),
  },

  settingRow: {
    height: Responsive.height(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },

  rowLeftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },

  sectionTitle: {
    letterSpacing: 1.2,
    marginBottom: Spacing.medium,
    paddingLeft: 4,
  },

  optionCard: {
    backgroundColor: '#050505',
    borderRadius: 22,
    borderWidth: 0.6,
    borderColor: COLORS.GOLD,
    height: Responsive.height(76),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.large,
    marginBottom: Spacing.small + 2,
  },

  selectedOption: {
    borderColor: '#CD974A',
    backgroundColor: 'rgba(197,147,83,0.02)',
  },
});
