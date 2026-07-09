import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
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

export default function Register({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('All fields are required');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      const payload = { fullName, email, password };
      navigation.replace('Secure');
    } catch (error) {
      Alert.alert('Registration failed');
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
            <InputField
              label="Full Name"
              value={fullName}
              placeholder="John Doe"
              onChangeText={setFullName}
              placeholderTextColor="#666"
            />

            <InputField
              label="Email"
              value={email}
              placeholder="example@gmail.com"
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#666"
            />

            <InputField
              label="Password"
              value={password}
              placeholder="••••••••"
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#666"
            />

            <Button
              onPress={handleRegister}
              title="Sign Up"
              loading={loading}
              style={{ marginTop: Spacing.xLarge * 2 }}
            />
          </View>

          <View style={styles.footerContainer}>
            <AppText
              text={'By continuing you agree to our terms and conditions'}
              style={styles.footerText}
            />

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
    backgroundColor: '#000000', // Pure obsidian dark mode backdrop
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
    color: '#A17A44', // Premium bronze-gold accent subtitle text
    lineHeight: FontSize.medium * 1.4,
  },
  formContainer: {
    flex: 1,
  },
  footerContainer: {
    marginTop: Responsive.height(40),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerText: {
    fontSize: FontSize.tiny,
    color: '#666666',
    textAlign: 'center',
    lineHeight: FontSize.tiny * 1.4,
    paddingHorizontal: Spacing.medium,
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
    color: '#DCA257', // Accent gold links
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
