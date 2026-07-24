import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import { Button } from '../../../components/common/button/button';
import InputField from '../../../components/common/inputField/inputField';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import AppText from '../../../components/typography/appText/appText';
import {
  FontSize,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import { COLORS } from '../../../components/constants/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { login } from '../../../utils/apis/auth/api';
import { useAuth } from '../../../configs/authContext/authContext';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { saveToken } = useAuth();

  const validateForm = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        email: email.trim().toLowerCase(),
        password: password,
      };
      const response = await login(payload);
      // console.log('res', response);
      // return;
      if (response?.data?.user) {
        saveToken(response?.data?.token);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'TabNavigation' }],
          }),
        );
      }
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error?.response?.data?.message || 'An error occurred during login.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // navigation.navigate('ForgotPassword');
    Alert.alert(
      'Reset Password',
      'Password reset functionality will be available soon.',
      [{ text: 'OK' }],
    );
  };

  return (
    <View style={styles.container}>
      <GradientBackground />
      <SafeAreaView style={styles.safeArea}>
        <HeaderBack showBack={true} title={'Welcome Back'} />
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.welcomeContainer}>
              <AppText text={'Welcome Back'} style={styles.titleText} />
              <AppText
                text={'Access your vault and continue your legacy journey.'}
                style={styles.subtitleText}
              />
            </View>

            <View style={styles.formContainer}>
              <InputField
                label="Email"
                value={email}
                placeholder="example@gmail.com"
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#666"
                required={true}
                validationType="email"
              />

              <InputField
                label="Password"
                value={password}
                placeholder="••••••••"
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#666"
                required={true}
                validationType="password"
                showError={false}
                rightIcon={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons
                      name={showPassword ? 'eye-off' : 'eye'}
                      color={COLORS.WHITE}
                      size={Responsive.width(22)}
                    />
                  </Pressable>
                }
              />

              {/* Forgot Password Link */}
              <TouchableOpacity
                onPress={handleForgotPassword}
                style={styles.forgotPasswordContainer}
              >
                <AppText
                  text={'Forgot Password?'}
                  style={styles.forgotPasswordText}
                />
              </TouchableOpacity>

              <Button
                onPress={handleLogin}
                title="Sign In"
                loading={loading}
                disabled={loading}
                style={{ marginTop: Spacing.xLarge }}
              />
            </View>

            <View style={styles.footerContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <AppText text={'By continuing you agree to our'} size="small" />
                <Pressable>
                  <AppText
                    color={COLORS.GOLD}
                    text={' Terms of Service'}
                    size="small"
                  />
                </Pressable>
                <AppText text={' and'} size="small" />
                <Pressable>
                  <AppText
                    color={COLORS.GOLD}
                    text={' Privacy Policy'}
                    size="small"
                  />
                </Pressable>
              </View>

              <View style={styles.registerRedirectRow}>
                <AppText
                  text={"Don't have a vault? "}
                  style={styles.noAccountText}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                >
                  <AppText
                    text={'Create One'}
                    style={styles.registerLinkText}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.xLarge,
  },
  welcomeContainer: {
    marginTop: Responsive.height(24),
    marginBottom: Responsive.height(32),
  },
  titleText: {
    fontSize: FontSize.xLarge,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: Spacing.tiny,
  },
  subtitleText: {
    fontSize: FontSize.medium,
    fontWeight: '400',
    color: '#A17A44',
    lineHeight: FontSize.medium * 1.4,
  },
  formContainer: {
    flex: 1,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: Spacing.small,
    marginBottom: Spacing.medium,
  },
  forgotPasswordText: {
    fontSize: FontSize.small,
    color: COLORS.GOLD,
    fontWeight: '500',
  },
  footerContainer: {
    marginTop: Responsive.height(40),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  registerRedirectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.large,
  },
  noAccountText: {
    fontSize: FontSize.medium,
    color: '#E0E0E0',
    fontWeight: '400',
  },
  registerLinkText: {
    fontSize: FontSize.medium,
    color: '#DCA257',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
