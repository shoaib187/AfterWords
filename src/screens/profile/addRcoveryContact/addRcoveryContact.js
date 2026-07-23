import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../components/common/button/button';

const ADD_SECONDARY_CONTACT_DATA = {
  banner: {
    icon: 'person',
    description:
      'Assign a secondary trusted individual to help verify your identity if you ever lose access to your account.',
  },
  form: {
    title: 'CONTACT DETAILS',
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
  notice: {
    icon: 'shield-check-outline',
    iconLibrary: 'MaterialCommunityIcons',
    title: 'Strictly Identity Verification',
    description:
      'Recovery contacts cannot access your legacy assets or manage your account. They are only authorized to confirm your identity during a recovery process.',
  },
};

const Banner = ({ data }) => {
  return (
    <GradientWrapper wrapperStyle={styles.banner}>
      <Ionicons
        name={data.icon}
        size={Responsive.width(32)}
        color={COLORS.GOLD}
        style={styles.personIcon}
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

const FormSection = ({ section, formData, setFormData }) => {
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

const SecurityNotice = ({ data }) => {
  const IconComponent =
    data.iconLibrary === 'MaterialCommunityIcons'
      ? MaterialCommunityIcons
      : Ionicons;

  return (
    <View style={styles.noticeCard}>
      <IconComponent
        name={data.icon}
        size={Responsive.width(28)}
        color={COLORS.GOLD}
        style={styles.noticeIcon}
      />
      <View style={styles.noticeTextContainer}>
        <Title
          text={data.title}
          size="small"
          color={COLORS.GOLD}
          style={styles.noticeTitle}
        />
        <AppText
          text={data.description}
          size="small"
          color="#A0A0A0"
          style={styles.noticeSubtitle}
        />
      </View>
    </View>
  );
};

export default function AddRecoveryContact() {
  const [formData, setFormData] = useState(() => {
    const initial = {};
    ADD_SECONDARY_CONTACT_DATA.form.fields.forEach(field => {
      initial[field.key] = field.defaultValue || '';
    });
    return initial;
  });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Add Secondary Contact'} />
      <GradientBackground />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Banner data={ADD_SECONDARY_CONTACT_DATA.banner} />

        <FormSection
          section={ADD_SECONDARY_CONTACT_DATA.form}
          formData={formData}
          setFormData={setFormData}
        />

        <SecurityNotice data={ADD_SECONDARY_CONTACT_DATA.notice} />
        <Button
          style={{ marginTop: Spacing.large }}
          title="Send Secure Invitation"
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
    paddingBottom: Spacing.xLarge,
  },

  /* Banner Header */
  banner: {
    backgroundColor: COLORS.GOLD,
    borderRadius: Radius.xLarge,
    paddingVertical: Spacing.xLarge,
    paddingHorizontal: Spacing.xLarge,
    alignItems: 'center',
    marginBottom: Spacing.xLarge,
  },
  personIcon: {
    marginBottom: Spacing.small,
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

  /* Bottom Notice Card */
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2A2A2A',
    borderRadius: Radius.large,
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.medium,
  },
  noticeIcon: {
    marginRight: Spacing.medium,
    marginTop: Responsive.height(2),
  },
  noticeTextContainer: {
    flex: 1,
  },
  noticeTitle: {
    marginBottom: Spacing.tiny,
  },
  noticeSubtitle: {
    lineHeight: Responsive.height(17),
  },
});
