import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
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

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderBack title={'Add Executor'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Gold Banner Header */}
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

        {/* Executor Type Toggle */}
        <Text style={styles.sectionTitle}>EXECUTORS TYPE</Text>
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

        {/* Form Fields - Individual */}
        {executorType === 'individual' ? (
          <View style={styles.formContainer}>
            <View style={styles.row}>
              <View style={styles.halfColumn}>
                <Text style={styles.fieldLabel}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.halfColumn}>
                <Text style={styles.fieldLabel}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholderTextColor="#666"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={individualEmail}
                onChangeText={setIndividualEmail}
                keyboardType="email-address"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={individualPhone}
                onChangeText={setIndividualPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Relationship</Text>
              <TextInput
                style={styles.input}
                value={relationship}
                onChangeText={setRelationship}
                placeholderTextColor="#666"
              />
            </View>
          </View>
        ) : (
          /* Form Fields - Professional */
          <View style={styles.formContainer}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Firm / Practice Name</Text>
              <TextInput
                style={styles.input}
                value={firmName}
                onChangeText={setFirmName}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Primary Contact Person</Text>
              <TextInput
                style={styles.input}
                value={contactPerson}
                onChangeText={setContactPerson}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={proEmail}
                onChangeText={setProEmail}
                keyboardType="email-address"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={proPhone}
                onChangeText={setProPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#666"
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
  avatarIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3B2A10',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
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
  formContainer: {
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfColumn: {
    flex: 1,
  },
  fieldGroup: {
    width: '100%',
  },
  fieldLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'serif',
    marginBottom: 10,
  },
  input: {
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: '#3B301B',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    fontSize: 14,
  },
});
