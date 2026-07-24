import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Image, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeBiometrics from 'react-native-biometrics';
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
import { useAuth } from '../../../configs/authContext/authContext';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

import { useUser } from '../../../hooks/useUser/useUser';
import { updateBiometricPreference } from '../../../utils/apis/user/api';

const rnBiometrics = new ReactNativeBiometrics();

export default function SecureVault({ navigation }) {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState('');
  const { token } = useAuth();
  const { user, refetch: refetchUser } = useUser();

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  // Sync with user data when it loads
  useEffect(() => {
    if (user) {
      setIsBiometricEnabled(user.biometricEnabled || false);
    }
  }, [user]);

  const checkBiometricAvailability = async () => {
    try {
      // Check if device has biometric hardware and if it's enrolled
      const { available, biometryType } =
        await rnBiometrics.isSensorAvailable();

      if (!available) {
        setIsBiometricAvailable(false);
        console.log('Biometric hardware not available');
        return;
      }

      // Check if biometrics are actually enrolled/setup on the device
      try {
        const { keysExist } = await rnBiometrics.biometricKeysExist();

        if (!keysExist) {
          // No biometric keys exist, but the hardware is available
          setIsBiometricAvailable(true);
        } else {
          setIsBiometricAvailable(true);
        }
      } catch (enrollError) {
        console.log('Error checking biometric keys:', enrollError);
        setIsBiometricAvailable(true);
      }

      // Set biometric type
      let type = '';
      if (biometryType === 'FaceID' || biometryType === 'Face') {
        type = 'Face ID';
      } else if (biometryType === 'TouchID' || biometryType === 'Fingerprint') {
        type = 'Touch ID';
      } else if (biometryType) {
        type = biometryType;
      } else {
        type = Platform.OS === 'ios' ? 'Face ID' : 'Fingerprint';
      }
      setBiometricType(type);

      console.log('Biometric available:', available, 'Type:', type);
    } catch (error) {
      console.log('Biometric check error:', error);
      setIsBiometricAvailable(false);
    }
  };

  const authenticateBiometric = async promptMessage => {
    try {
      const { success, error } = await rnBiometrics.simplePrompt({
        promptMessage:
          promptMessage || `Authenticate with ${biometricType || 'Biometric'}`,
        cancelButtonText: 'Cancel',
        fallbackButtonText: 'Use Password',
      });

      if (success) {
        console.log('Biometric authentication successful');
        return true;
      } else {
        console.log('Biometric authentication failed:', error);
        return false;
      }
    } catch (error) {
      console.log('Biometric authentication error:', error);
      return false;
    }
  };

  const handleBiometricToggle = async value => {
    if (value && !isBiometricAvailable) {
      Alert.alert(
        'Biometric Not Available',
        'Your device does not support biometric authentication. Please set it up in your device settings.',
        [{ text: 'OK' }],
      );
      return;
    }

    // If enabling biometric, authenticate first
    if (value) {
      setLoading(true);
      const isAuthenticated = await authenticateBiometric(
        `Enable ${biometricType || 'Biometric'} for secure access`,
      );
      setLoading(false);

      if (!isAuthenticated) {
        Alert.alert(
          'Authentication Failed',
          `Please authenticate with ${
            biometricType || 'biometric'
          } to enable this feature.`,
          [{ text: 'OK' }],
        );
        return;
      }
    }

    // Update state optimistically
    setIsBiometricEnabled(value);

    // Call API to update preference
    try {
      const response = await updateBiometricPreference(
        { biometricEnabled: value },
        token,
      );

      if (response.success) {
        // Refetch user data to get updated state
        await refetchUser();

        Alert.alert(
          value ? 'Biometric Enabled' : 'Biometric Disabled',
          value
            ? `You can now use ${
                biometricType || 'biometric'
              } to access your vault securely.`
            : 'Biometric login has been disabled.',
          [{ text: 'OK' }],
        );
      } else {
        // Revert if API call fails
        setIsBiometricEnabled(!value);
        Alert.alert(
          'Error',
          response.message || 'Failed to update biometric preference',
        );
      }
    } catch (error) {
      // Revert on error
      setIsBiometricEnabled(!value);
      console.log('Biometric update error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message ||
          'Failed to update biometric preference',
      );
    }
  };

  const handleContinue = async () => {
    // If biometric is enabled, authenticate before proceeding
    if (isBiometricEnabled) {
      setLoading(true);
      const isAuthenticated = await authenticateBiometric(
        `Authenticate to continue`,
      );
      setLoading(false);

      if (!isAuthenticated) {
        Alert.alert(
          'Authentication Required',
          `Please authenticate with ${
            biometricType || 'biometric'
          } to continue.`,
          [{ text: 'OK' }],
        );
        return;
      }
    }

    // Navigate to Roadmap (Estate Readiness)
    navigation?.navigate('Roadmap');
  };

  // Get the biometric icon name
  const getBiometricIcon = () => {
    if (biometricType?.toLowerCase().includes('face')) {
      return 'scan-outline';
    }
    return 'finger-print';
  };

  // Get the biometric display name
  const getBiometricDisplayName = () => {
    if (biometricType) {
      return biometricType;
    }
    if (Platform.OS === 'ios') {
      return 'Face ID';
    }
    return 'Fingerprint';
  };

  return (
    <View style={styles.container}>
      <GradientBackground />
      <HeaderBack showBack={true} title={'Secure your Vault'} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <View style={styles.illustrationWrapper}>
            <View style={styles.innerFingerprintDisc}>
              <Image
                source={require('../../../../assets/png/scanning.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
              />
            </View>
          </View>

          <AppText
            text={`Use ${getBiometricDisplayName()} to access your legacy vault instantly — no password required every time.`}
            align="center"
            style={styles.descriptionText}
          />

          <View style={styles.toggleCard}>
            <View style={styles.cardLeftSection}>
              <View style={styles.cardIconCircle}>
                <Ionicons
                  name={getBiometricIcon()}
                  size={Responsive.width(26)}
                  color={COLORS.GOLD}
                />
              </View>
              <View style={styles.cardTextWrapper}>
                <Title
                  text={`Enable ${getBiometricDisplayName()}`}
                  style={styles.cardTitle}
                />
                <Subtitle
                  text={isBiometricAvailable ? 'Ready to use' : 'Not available'}
                  style={styles.cardSubtitle}
                />
              </View>
            </View>

            <Switch
              value={isBiometricEnabled}
              onValueChange={handleBiometricToggle}
              trackColor={{ false: '#3E3E3E', true: '#C59353' }}
              thumbColor={isBiometricEnabled ? '#FFFFFF' : '#F4F3F4'}
              ios_backgroundColor="#3E3E3E"
              disabled={!isBiometricAvailable || loading}
            />
          </View>

          {!isBiometricAvailable && (
            <AppText
              text="Biometric not available. You can continue without it."
              size="small"
              color={COLORS.GRAY}
              align="center"
              style={{ marginTop: Spacing.medium }}
            />
          )}
        </View>

        <View style={styles.bottomWrapper}>
          <Button
            onPress={handleContinue}
            title="Continue"
            loading={loading}
            disabled={loading}
          />
          {!isBiometricAvailable && (
            <Button
              onPress={() => navigation?.navigate('Roadmap')}
              title="Skip for Now"
              style={styles.skipButton}
              textStyle={styles.skipButtonText}
              variant="outline"
            />
          )}
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
  innerFingerprintDisc: {
    width: Responsive.width(100),
    height: Responsive.width(100),
    borderRadius: Responsive.width(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    marginBottom: Spacing.large,
    textAlign: 'center',
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
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    marginTop: Spacing.medium,
  },
  skipButtonText: {
    color: COLORS.GOLD,
  },
});
