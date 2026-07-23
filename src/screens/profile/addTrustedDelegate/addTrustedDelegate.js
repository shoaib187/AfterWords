import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import GradientWrapper from '../../../components/common/gradientWrapper/gradientWrapper';
import InputField from '../../../components/common/inputField/inputField';
import { Button } from '../../../components/common/button/button';
import { SafeAreaView } from 'react-native-safe-area-context';

const ADD_DELEGATE_DATA = {
  banner: {
    icon: 'heart',
    description:
      'Invite someone to assist with specific life responsibilities while you are living. They will receive a secure email invitation.',
  },
  formFields: {
    sections: [
      {
        id: 'delegateDetails',
        title: 'DELEGATES DETAILS',
        fields: [
          {
            id: 'firstName',
            label: 'First Name',
            key: 'firstName',
            defaultValue: 'Sofia',
            placeholder: 'Enter first name',
            halfWidth: true,
          },
          {
            id: 'lastName',
            label: 'Last Name',
            key: 'lastName',
            defaultValue: 'Chen',
            placeholder: 'Enter last name',
            halfWidth: true,
          },
          {
            id: 'email',
            label: 'Email',
            key: 'email',
            defaultValue: 'sofia@gmail.com',
            placeholder: 'Enter email address',
            keyboardType: 'email-address',
          },
          {
            id: 'phone',
            label: 'Phone Number',
            key: 'phone',
            defaultValue: '+234****6534637',
            placeholder: 'Enter phone number',
            keyboardType: 'phone-pad',
          },
          {
            id: 'relationship',
            label: 'Relationship',
            key: 'relationship',
            defaultValue: 'daughter',
            placeholder: 'Enter relationship',
          },
        ],
      },
    ],
  },
  permissions: {
    title: 'LIVE PERMISSIONS',
    controls: [
      {
        id: 'medical',
        title: 'Medical & Health',
        subtitle: 'Can act on your behalf',
        icon: 'heart-outline',
        key: 'medicalAccess',
        defaultValue: true,
      },
    ],
  },
  privacyNotice: {
    icon: 'lock-closed-outline',
    title: 'Legacy Memories Remain Locked',
    description:
      'By default, delegates have zero access to your preserved memories or scheduled deliveries. You can change this later in their profile.',
  },
  submitButton: {
    text: 'Send Secure Invitation',
  },
};

const FormSection = ({
  section,
  formData,
  setFormData,
  focusedField,
  handleFocus,
  handleBlur,
}) => {
  const getFieldValue = key => {
    return formData[key] || '';
  };

  const handleFieldChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Group fields into rows (fields with halfWidth: true)
  const renderFields = () => {
    const fields = section.fields;
    const halfWidthFields = fields.filter(f => f.halfWidth);
    const fullWidthFields = fields.filter(f => !f.halfWidth);

    return (
      <>
        {halfWidthFields.length > 0 && (
          <View style={styles.row}>
            {halfWidthFields.map(field => (
              <InputField
                key={field.id}
                label={field.label}
                value={getFieldValue(field.key)}
                onChangeText={value => handleFieldChange(field.key, value)}
                placeholder={field.placeholder}
                keyboardType={field.keyboardType || 'default'}
                wrapperStyle={styles.halfColumn}
                isFocused={focusedField === field.id}
                onFocus={() => handleFocus(field.id)}
                onBlur={handleBlur}
              />
            ))}
          </View>
        )}
        {fullWidthFields.map(field => (
          <InputField
            key={field.id}
            label={field.label}
            value={getFieldValue(field.key)}
            onChangeText={value => handleFieldChange(field.key, value)}
            placeholder={field.placeholder}
            keyboardType={field.keyboardType || 'default'}
            isFocused={focusedField === field.id}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <AppText
        text={section.title}
        size="small"
        color={COLORS.WHITE}
        style={styles.sectionTitle}
      />
      <View style={styles.formContainer}>{renderFields()}</View>
    </>
  );
};

const PermissionControl = ({ control, value, onToggle }) => {
  return (
    <View style={styles.permissionCard}>
      <View style={styles.iconBadge}>
        <Ionicons
          name={control.icon}
          size={Responsive.width(20)}
          color={COLORS.GOLD}
        />
      </View>
      <View style={styles.permissionInfo}>
        <Title
          text={control.title}
          size="small"
          color={COLORS.WHITE}
          style={styles.permissionTitle}
        />
        <AppText
          text={control.subtitle}
          size="tiny"
          color="#777777"
          style={styles.permissionSubtitle}
        />
      </View>
      <Switch
        value={value}
        onValueChange={() => onToggle(control.key)}
        trackColor={{ false: '#262626', true: COLORS.GOLD }}
        thumbColor={COLORS.WHITE}
      />
    </View>
  );
};

const Banner = ({ data }) => {
  return (
    <GradientWrapper wrapperStyle={styles.banner}>
      <Ionicons
        name={data.icon}
        size={Responsive.width(28)}
        color={COLORS.GOLD}
        style={styles.heartIcon}
      />
      <AppText
        text={data.description}
        size="small"
        color="#261B0A"
        align="center"
        style={styles.bannerText}
      />
    </GradientWrapper>
  );
};

const PrivacyNotice = ({ data }) => {
  return (
    <View style={styles.privacyCard}>
      <Ionicons
        name={data.icon}
        size={Responsive.width(22)}
        color="#E57373"
        style={styles.privacyIcon}
      />
      <View style={styles.privacyTextContainer}>
        <Title
          text={data.title}
          size="small"
          color="#E57373"
          style={styles.privacyTitle}
        />
        <AppText
          text={data.description}
          size="tiny"
          color="#E57373"
          style={styles.privacySubtitle}
        />
      </View>
    </View>
  );
};

export default function AddDelegateScreen() {
  const [formData, setFormData] = useState(() => {
    const initial = {};
    ADD_DELEGATE_DATA.formFields.sections.forEach(section => {
      section.fields.forEach(field => {
        initial[field.key] = field.defaultValue || '';
      });
    });
    return initial;
  });

  // Permission State
  const [permissions, setPermissions] = useState(() => {
    const initial = {};
    ADD_DELEGATE_DATA.permissions.controls.forEach(control => {
      initial[control.key] = control.defaultValue;
    });
    return initial;
  });

  const handlePermissionToggle = key => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSendInvitation = () => {
    console.log('Sending invitation to:', {
      ...formData,
      ...permissions,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Add Delegate'} />
      <GradientBackground />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Banner data={ADD_DELEGATE_DATA.banner} />

        {ADD_DELEGATE_DATA.formFields.sections.map(section => (
          <FormSection
            key={section.id}
            section={section}
            formData={formData}
            setFormData={setFormData}
          />
        ))}

        <AppText
          text={ADD_DELEGATE_DATA.permissions.title}
          size="small"
          color={COLORS.WHITE}
          style={styles.sectionTitle}
        />

        {ADD_DELEGATE_DATA.permissions.controls.map(control => (
          <PermissionControl
            key={control.id}
            control={control}
            value={permissions[control.key]}
            onToggle={handlePermissionToggle}
          />
        ))}

        <PrivacyNotice data={ADD_DELEGATE_DATA.privacyNotice} />

        <Button
          title={ADD_DELEGATE_DATA.submitButton.text}
          onPress={handleSendInvitation}
        />
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
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
    paddingBottom: Responsive.height(120),
  },

  /* Banner Header */
  banner: {
    backgroundColor: COLORS.GOLD,
    borderRadius: Radius.xLarge,
    paddingVertical: Spacing.xLarge,
    paddingHorizontal: Spacing.large,
    alignItems: 'center',
    marginBottom: Spacing.xLarge,
  },
  heartIcon: {
    marginBottom: Spacing.tiny,
  },
  bannerText: {
    lineHeight: Responsive.height(18),
  },

  /* Section Title */
  sectionTitle: {
    letterSpacing: Responsive.width(0.8),
    marginBottom: Spacing.medium,
    marginTop: Spacing.tiny,
  },

  /* Form Elements */
  formContainer: {
    gap: Spacing.medium,
    marginBottom: Spacing.xLarge,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.small,
  },
  halfColumn: {
    flex: 1,
  },

  /* Permission Card */
  permissionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
    borderRadius: Radius.xLarge,
    borderWidth: 1.5,
    borderColor: '#3B301B',
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    height: Responsive.height(68),
    marginBottom: Spacing.xLarge,
  },
  iconBadge: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    borderRadius: Responsive.width(20),
    backgroundColor: '#1A140B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  permissionInfo: {
    flex: 1,
  },
  permissionTitle: {
    marginBottom: Spacing.tiny,
  },
  permissionSubtitle: {},

  /* Privacy Box */
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#381617',
    borderRadius: Radius.large,
    padding: Spacing.medium,
    marginBottom: Spacing.xLarge,
  },
  privacyIcon: {
    marginRight: Spacing.small,
    marginTop: Responsive.height(2),
  },
  privacyTextContainer: {
    flex: 1,
  },
  privacyTitle: {
    marginBottom: Spacing.tiny,
  },
  privacySubtitle: {
    lineHeight: Responsive.height(16),
    opacity: 0.85,
  },

  /* Submit Button */
  submitButton: {
    height: Responsive.height(54),
    borderRadius: Radius.xLarge,
    backgroundColor: COLORS.GOLD,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.tiny,
  },
  submitButtonText: {
    fontWeight: 'bold',
  },

  /* Floating Bottom Navigation Bar */
  bottomNavContainer: {
    position: 'absolute',
    bottom: Spacing.medium,
    left: Spacing.medium,
    right: Spacing.medium,
    height: Responsive.height(64),
    backgroundColor: '#0A0A0A',
    borderRadius: Radius.xLarge,
    borderWidth: 1,
    borderColor: '#262010',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.tiny,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.tiny,
    paddingVertical: Responsive.height(6),
  },
  activeNavItem: {
    backgroundColor: COLORS.GOLD,
    borderRadius: Radius.large,
    paddingHorizontal: Spacing.small,
  },
  navLabel: {
    marginTop: Responsive.height(2),
  },
  activeNavLabel: {
    fontWeight: 'bold',
  },
  fabButton: {
    width: Responsive.width(44),
    height: Responsive.width(44),
    borderRadius: Responsive.width(22),
    backgroundColor: COLORS.GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -Responsive.height(20),
    borderWidth: 3,
    borderColor: COLORS.BLACK,
  },
});
