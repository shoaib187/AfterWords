import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import { FONT } from '../../../components/constants/font';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

export default function LegacyInbox({ navigation }) {
  const [email, setEmail] = useState('Sofia.chen@gmail.com');
  const [isCodeSent, setIsCodeSent] = useState(false); // Controls card toggling
  const [otp, setOtp] = useState(['7', '4', '9', '', '', '']); // Mocked state matching image

  const inputRefs = useRef([]);

  const handleBack = () => {
    if (isCodeSent) {
      setIsCodeSent(false); // Quick toggle back to edit email if needed
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const handleSendCode = () => {
    if (email.trim().length > 0) {
      setIsCodeSent(true);
    }
  };

  const handleVerifyCode = () => {
    const codeString = otp.join('');
    if (codeString.length === 6) {
      navigation.navigate('GiftsScreen');
    }
  };

  const handleOtpChange = (text, index) => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleanedText;
    setOtp(newOtp);

    // Auto-focus forward if code is entered
    if (cleanedText && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e, index) => {
    // Auto-focus backward on backspace delete triggers
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />

      <HeaderBack title={'Legacy Inbox'} />

      <ScrollView
        contentContainerStyle={styles.scrollContentLayout}
        showsVerticalScrollIndicator={false}
      >
        {/* Core Vault Lock Radial Dial Medallion Graphic Frame */}
        <View style={styles.dialOuterRing}>
          <View style={styles.dialInnerTicksRing}>
            <View style={styles.dialCorePlate}>
              <Title text={'AW'} style={styles.dialInitialsText} />
              <AppText text={'SEALED'} style={styles.dialSubLabelText} />
            </View>
          </View>
        </View>

        {/* Messaging Introduction Typography Cluster */}
        <Title text={'Secure Legacy Access'} size="xLarge" />
        <AppText
          text={
            'james Whitfield has left a secure memory vault for you. Please verify your identity to decrypt and access the contents.'
          }
          style={styles.secureDescriptionText}
        />

        <LinearGradient
          colors={['#EEDBB2', '#CD974A']}
          style={styles.verificationCardFrame}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {!isCodeSent ? (
            <View>
              <AppText
                text={'YOUR EMAIL ADDRESS'}
                style={styles.inputLabelField}
              />
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.emailTextInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email address"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <TouchableOpacity
                style={styles.submitActionButton}
                onPress={handleSendCode}
                activeOpacity={0.9}
              >
                <View style={styles.buttonTextFlexRow}>
                  <Text style={styles.submitButtonText}>
                    Send Verification Code
                  </Text>
                  <Icon
                    name="arrow-right"
                    size={16}
                    color="#1C1917"
                    style={styles.buttonIconGap}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            /* STATE B: Verification Code Frame Input Layout (Screenshot 2026-06-15 at 10.39.06 AM.png) */
            <View>
              <Text style={styles.inputLabelField}>ENTER 6 DIGIT CODE</Text>

              {/* Discrete Square Entry Cell Blocks Row */}
              <View style={styles.otpHorizontalContainer}>
                {otp.map((digit, idx) => (
                  <View key={idx} style={styles.otpCellFrame}>
                    <TextInput
                      ref={el => (inputRefs.current[idx] = el)}
                      style={styles.otpInputField}
                      value={digit}
                      onChangeText={text => handleOtpChange(text, idx)}
                      onKeyPress={e => handleOtpKeyPress(e, idx)}
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                      placeholder="—"
                      placeholderTextColor="rgba(255, 255, 255, 0.8)"
                      textAlign="center"
                    />
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.submitActionButton}
                onPress={handleVerifyCode}
                activeOpacity={0.9}
              >
                <View style={styles.buttonTextFlexRow}>
                  <Text style={styles.submitButtonText}>Verify & Unlock</Text>
                  <Icon
                    name="arrow-right"
                    size={16}
                    color="#1C1917"
                    style={styles.buttonIconGap}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK || '#000000',
  },
  backgroundGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(380),
    zIndex: 0,
  },

  scrollContentLayout: {
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    paddingTop: Responsive.height(40),
    paddingBottom: Spacing.large,
  },
  dialOuterRing: {
    width: Responsive.width(140),
    height: Responsive.width(140),
    borderRadius: Responsive.width(70),
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Responsive.height(32),
  },
  dialInnerTicksRing: {
    width: Responsive.width(124),
    height: Responsive.width(124),
    borderRadius: Responsive.width(62),
    borderWidth: 2,
    borderColor: 'rgba(197, 147, 83, 0.6)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialCorePlate: {
    width: Responsive.width(96),
    height: Responsive.width(96),
    borderRadius: Responsive.width(48),
    backgroundColor: 'rgba(197, 147, 83, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialInitialsText: {
    color: '#D5A760',
    fontSize: 20,
    fontFamily: FONT.TTForseBold,
    letterSpacing: 1,
  },
  dialSubLabelText: {
    color: 'rgba(213, 167, 96, 0.6)',
    fontSize: 10,
    fontFamily: FONT.TTForseMedium,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  secureHeadingText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: FONT.TTForseBold,
    textAlign: 'center',
    marginBottom: Spacing.medium,
  },
  secureDescriptionText: {
    color: '#A1A1AA',
    fontSize: 14,
    fontFamily: FONT.TTForseRegular,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.small,
    marginBottom: Responsive.height(44),
  },
  verificationCardFrame: {
    width: '100%',
    borderRadius: Radius.xLarge,
    padding: Spacing.medium,
  },
  inputLabelField: {
    color: '#1C1917',
    fontSize: 12,
    fontFamily: FONT.TTForseBold,
    letterSpacing: 0.5,
    marginBottom: Spacing.medium + 4,
  },
  inputFieldContainer: {
    width: '100%',
    height: 54,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: Spacing.medium,
    justifyContent: 'center',
    marginBottom: Spacing.large,
  },
  emailTextInput: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: FONT.TTForseMedium,
    padding: 0,
  },
  otpHorizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: Responsive.height(28),
  },
  otpCellFrame: {
    width: '14.5%',
    aspectRatio: 1,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-translucent dark tint overlay mask matching picture grid cell surfaces
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInputField: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FONT.TTForseBold,
    width: '100%',
    height: '100%',
    padding: 0,
  },
  submitActionButton: {
    width: '100%',
    height: 50,
    borderRadius: Radius.circle || 25,
    backgroundColor: '#D9A451',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#1C1917',
    fontSize: 14,
    fontFamily: FONT.TTForseBold,
  },
  buttonIconGap: {
    marginLeft: 6,
  },
});
