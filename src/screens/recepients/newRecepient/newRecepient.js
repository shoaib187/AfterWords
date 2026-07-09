import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import AppText from '../../../components/typography/appText/appText';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import { FONT } from '../../../components/constants/font';
import { Button } from '../../../components/common/button/button';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import InputField from '../../../components/common/inputField/inputField';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

export default function NewRecipient({ navigation }) {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [email, setEmail] = useState('');

  const handleSaveRecipient = () => {
    console.log('Recipient Saved:', { name, relationship, email });
    // Navigate back or update local cache context state
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />

      <HeaderBack title={'New Recipient'} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <InputField
          label={'Name'}
          placeholder="Enter name..."
          value={name}
          onChangeText={setName}
        />
        <InputField
          label={'Relationship'}
          placeholder="e.g daughter, best friend etc"
          value={relationship}
          onChangeText={setRelationship}
        />
        <InputField
          label={'Email Address'}
          placeholder="123@gamil.com"
          value={email}
          onChangeText={setEmail}
          keyboardAppearance="dark"
          keyboardType="email-address"
        />

        <Button title="Save" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerGlowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(220),
  },
  safeArea: {
    flex: 1,
  },
  headerNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small || 12,
  },
  backCircleButton: {
    width: Responsive.width(36),
    height: Responsive.width(36),
    borderRadius: Responsive.width(18),
    backgroundColor: '#C59353',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenHeaderTitleSerif: {
    fontSize: FontSize.xLarge || 22,
    color: COLORS.WHITE || '#FFFFFF',
    fontFamily: 'Georgia',
    fontWeight: '500',
  },
  editButtonPadding: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  editActionText: {
    color: '#FFFFFF',
    fontSize: FontSize.medium || 15,
    fontFamily: FONT.TTForseRegular || 'System',
    opacity: 0.9,
  },
  scrollContainer: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Responsive.height(36),
    paddingBottom: Responsive.height(30),
  },
  inputSectionWrapper: {
    width: '100%',
    marginBottom: Responsive.height(28),
  },
  fieldLabelSerif: {
    fontSize: FontSize.medium || 15,
    color: '#FFFFFF',
    fontFamily: 'Georgia',
    marginBottom: Spacing.medium || 12,
    paddingLeft: 4,
  },
  inputOutlineBox: {
    width: '100%',
    height: Responsive.height(64),
    borderRadius: Radius.xLarge || 20,
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.45)', // Warm gold brand accent stroke alignment
    backgroundColor: 'transparent',
    paddingHorizontal: Spacing.large || 18,
    justifyContent: 'center',
  },
  textInputField: {
    color: '#FFFFFF',
    fontSize: FontSize.medium || 14,
    fontFamily: FONT.TTForseRegular,
    padding: 0, // Kills native styling structural deviations inside Android
  },
  saveActionButton: {
    width: '100%',
    height: Responsive.height(52),
    backgroundColor: '#C59353',
    borderRadius: Radius.full || 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Responsive.height(20),
    shadowColor: '#C59353',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: FontSize.medium || 15,
    fontFamily: FONT.TTForseBold,
    fontWeight: '700',
  },
});
