import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import {
  FontSize,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import AppText from '../../../components/typography/appText/appText';
import GradientWrapper from '../../../components/common/gradientWrapper/gradientWrapper';
import InputField from '../../../components/common/inputField/inputField';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../../components/common/button/button';
import Title from '../../../components/typography/title/title';

export default function AddExecutor() {
  const [executorType, setExecutorType] = useState('individual'); // 'individual' | 'professional'

  // Form State - Individual
  const [firstName, setFirstName] = useState('Sofia');
  const [lastName, setLastName] = useState('Chen');
  const [individualEmail, setIndividualEmail] = useState('sofia@gmail.com');
  const [individualPhone, setIndividualPhone] = useState('+234****6534637');
  const [relationship, setRelationship] = useState('daughter');

  // Form State - Professional
  const [firmName, setFirmName] = useState('marcus law Firm');
  const [contactPerson, setContactPerson] = useState('Sarah Jenkins, esq.');
  const [proEmail, setProEmail] = useState('sofia@gmail.com');
  const [proPhone, setProPhone] = useState('+234****6534637');

  // Focus states for animations
  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = fieldName => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderBack title={'Add Executor'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GradientWrapper wrapperStyle={styles.banner}>
          <Ionicons
            name="person"
            size={Responsive.width(24)}
            color={COLORS.GOLD}
          />
          <AppText
            text={
              'Invite a trusted family member, close friend, or legal professional to execute your legacy delivery rules.'
            }
            style={styles.bannerText}
          />
          <AppText text={'Executor Type'} style={styles.bannerSubText} />
        </GradientWrapper>

        <Title text={'EXECUTORS TYPE'} style={styles.sectionTitle} />
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              executorType === 'individual'
                ? styles.toggleActive
                : styles.toggleInactive,
            ]}
            onPress={() => setExecutorType('individual')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.toggleText,
                executorType === 'individual'
                  ? styles.toggleTextActive
                  : styles.toggleTextInactive,
              ]}
            >
              Individual
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              executorType === 'professional'
                ? styles.toggleActive
                : styles.toggleInactive,
            ]}
            onPress={() => setExecutorType('professional')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.toggleText,
                executorType === 'professional'
                  ? styles.toggleTextActive
                  : styles.toggleTextInactive,
              ]}
            >
              Professional
            </Text>
          </TouchableOpacity>
        </View>

        {executorType === 'individual' ? (
          <View style={styles.formContainer}>
            <View style={styles.row}>
              <InputField
                label="First Name"
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter first name"
                wrapperStyle={styles.halfColumn}
                isFocused={focusedField === 'firstName'}
                onFocus={() => handleFocus('firstName')}
                onBlur={handleBlur}
              />

              <InputField
                label="Last Name"
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter last name"
                wrapperStyle={styles.halfColumn}
                isFocused={focusedField === 'lastName'}
                onFocus={() => handleFocus('lastName')}
                onBlur={handleBlur}
              />
            </View>

            <InputField
              label="Email"
              value={individualEmail}
              onChangeText={setIndividualEmail}
              placeholder="Enter email address"
              keyboardType="email-address"
              isFocused={focusedField === 'individualEmail'}
              onFocus={() => handleFocus('individualEmail')}
              onBlur={handleBlur}
            />

            <InputField
              label="Phone Number"
              value={individualPhone}
              onChangeText={setIndividualPhone}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              isFocused={focusedField === 'individualPhone'}
              onFocus={() => handleFocus('individualPhone')}
              onBlur={handleBlur}
            />

            <InputField
              label="Relationship"
              value={relationship}
              onChangeText={setRelationship}
              placeholder="Enter relationship"
              isFocused={focusedField === 'relationship'}
              onFocus={() => handleFocus('relationship')}
              onBlur={handleBlur}
            />
          </View>
        ) : (
          /* Form Fields - Professional */
          <View style={styles.formContainer}>
            <InputField
              label="Firm / Practice Name"
              value={firmName}
              onChangeText={setFirmName}
              placeholder="Enter firm name"
              isFocused={focusedField === 'firmName'}
              onFocus={() => handleFocus('firmName')}
              onBlur={handleBlur}
            />

            <InputField
              label="Primary Contact Person"
              value={contactPerson}
              onChangeText={setContactPerson}
              placeholder="Enter contact person"
              isFocused={focusedField === 'contactPerson'}
              onFocus={() => handleFocus('contactPerson')}
              onBlur={handleBlur}
            />

            <InputField
              label="Email"
              value={proEmail}
              onChangeText={setProEmail}
              placeholder="Enter email address"
              keyboardType="email-address"
              isFocused={focusedField === 'proEmail'}
              onFocus={() => handleFocus('proEmail')}
              onBlur={handleBlur}
            />

            <InputField
              label="Phone Number"
              value={proPhone}
              onChangeText={setProPhone}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              isFocused={focusedField === 'proPhone'}
              onFocus={() => handleFocus('proPhone')}
              onBlur={handleBlur}
            />
            <View style={styles.cardContainer}>
              <MaterialCommunityIcons
                name="shield-check-outline"
                size={Responsive.width(28)}
                color={COLORS.GOLD}
                style={styles.icon}
              />
              <AppText
                text={
                  'An encrypted invitation will be sent to this person. They must accept the invitation and verify their identity to become an active executor.'
                }
                style={styles.noticeText}
              />
            </View>
          </View>
        )}
        <Button title="Send Secure Invitation" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  /* Banner Component */
  banner: {
    backgroundColor: '#D1A354',
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 28,
  },
  bannerText: {
    fontSize: FontSize.small,
    color: COLORS.BLACK,
    textAlign: 'center',
    lineHeight: 18,
    marginVertical: Spacing.small,
  },
  bannerSubText: {
    fontSize: FontSize.small,
    color: '#3B2A10',
  },

  /* Section Title */
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    marginBottom: 16,
  },

  /* Toggle Row */
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  toggleButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  toggleActive: {
    backgroundColor: '#C28E38',
    borderColor: '#C28E38',
  },
  toggleInactive: {
    backgroundColor: '#000000',
    borderColor: '#C28E38',
  },
  toggleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  toggleTextInactive: {
    color: '#C28E38',
  },

  /* Form Elements */
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfColumn: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F2F2F',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  icon: {
    marginRight: 14,
  },
  noticeText: {
    color: COLORS.GOLD,
    fontSize: FontSize.small,
    lineHeight: 18,
    width: '30%',
  },
});
