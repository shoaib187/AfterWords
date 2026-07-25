import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { login, register } from '../../../utils/apis/auth/api';
import { useAuth } from '../../../configs/authContext/authContext';
import { useToast } from '../../../configs/toastContext/toastContext';

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login: authLogin } = useAuth();
  const { showToast } = useToast();
  const validateForm = () => {
    return email && password && phone;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      showToast('Please fill in all required fields.');
      return;
    }
    try {
      setLoading(true);

      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email?.trim()?.toLowerCase(),
        password: password,
        phone: phone?.trim(),
      };

      const response = await register(payload);
      console.log('res', response);

      if (response) {
        const loginPayload = {
          email,
          password,
        };
        const res = await login(loginPayload);
        console.log('res', res);
        if (res?.data?.token) {
          await authLogin(res?.data?.token);
          navigation.navigate('Secure');
        }
      }
    } catch (error) {
      showToast(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <GradientBackground />
      <SafeAreaView style={styles.safeArea}>
        <HeaderBack showBack={true} title={'Create your vault'} />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.welcomeContainer}>
            <AppText text={'Begin Your Legacy'} style={styles.titleText} />
            <AppText
              text={'Secure your assets, messages, and memories.'}
              style={styles.subtitleText}
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.nameRow}>
              <InputField
                label="First Name"
                value={firstName}
                placeholder="John"
                onChangeText={setFirstName}
                placeholderTextColor="#666"
                containerStyle={styles.nameInput}
                required={true}
                validationType={null}
              />
              <InputField
                label="Last Name"
                value={lastName}
                placeholder="Doe"
                onChangeText={setLastName}
                placeholderTextColor="#666"
                containerStyle={styles.nameInput}
                required={true}
                validationType={null}
              />
            </View>

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

            <InputField
              label="Phone"
              value={phone}
              placeholder="+1 234 567 890"
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#666"
              required={true}
              validationType="phone"
            />

            <Button
              onPress={handleRegister}
              // onPress={() => navigation.navigate('Secure')}
              title="Create Account"
              loading={loading}
              disabled={loading}
              style={{ marginTop: Spacing.xLarge * 2 }}
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

            <View style={styles.loginRedirectRow}>
              <AppText
                text={'Already have a vault? '}
                style={styles.alreadyHaveAccountText}
              />
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <AppText text={'Sign In'} style={styles.loginLinkText} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
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
  nameRow: {
    flexDirection: 'row',
    gap: Spacing.small,
  },
  nameInput: {
    flex: 1,
  },
  footerContainer: {
    marginTop: Responsive.height(40),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginRedirectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.large,
  },
  alreadyHaveAccountText: {
    fontSize: FontSize.medium,
    color: '#E0E0E0',
    fontWeight: '400',
  },
  loginLinkText: {
    fontSize: FontSize.medium,
    color: '#DCA257',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
