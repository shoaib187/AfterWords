import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../../../components/constants/color';
import { Spacing } from '../../../components/constants/styles';

import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderWithSubtitle from '../../../components/common/headerWithSubtitle/headerWithSubtitle';

import SecurityBanner from '../../../components/profile/securityBanner/securityBanner';
import PrivacyExecutors from '../../../components/profile/privacyExecutors/privacyExecutors';
import ReleaseSteps from '../../../components/profile/releaseSteps/releaseSteps';
import { Button } from '../../../components/common/button/button';

const PERMISSIONS = [
  'Can Verify Death',
  'Can Manage Recipients',
  'Can Publish General Memories',
];

export default function LegalExecutor({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderWithSubtitle
        title="Legal Executors"
        subtitle="Control Vault Release upon passing"
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SecurityBanner />
        <PrivacyExecutors PERMISSIONS={PERMISSIONS} />
        <Text style={styles.sectionHeader}>HOW THE RELEASE WORKS</Text>
        <ReleaseSteps />
        <Button
          onPress={() => navigation.navigate('AddExecutor')}
          title="Add Legacy Executor"
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
    paddingTop: Spacing.large,
    paddingBottom: 110,
  },

  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 28,
    marginBottom: 16,
  },
});
