import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import { WelcomCard } from '../../../components/home/welcomCard/welcomCard';
import { COLORS } from '../../../components/constants/color';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

export default function VaultHome({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GradientBackground />
        <WelcomCard />

        <View style={styles.emptyStateContainer}>
          <View style={styles.vaultIconWrapper}>
            <Ionicons
              name="server"
              size={Responsive.width(55)}
              color={COLORS.MEDIUM_GRAY}
            />
          </View>

          <AppText text="Your Vault is Empty" style={styles.emptyStateTitle} />
          <AppText
            text="Start building your legacy. Tap the plus button below to create your very first memory."
            style={styles.emptyStateDescription}
          />
        </View>

        <View style={styles.arrowIndicatorWrapper}>
          <Ionicons
            name="arrow-down"
            size={Responsive.width(34)}
            color="#C59353"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
    paddingBottom: Responsive.height(140),
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Responsive.height(72),
    paddingHorizontal: Spacing.medium,
  },
  vaultIconWrapper: {
    marginBottom: Spacing.medium,
    opacity: 0.4,
  },
  emptyStateTitle: {
    fontSize: FontSize.xLarge,
    marginBottom: Spacing.small,
  },
  emptyStateDescription: {
    fontSize: FontSize.small,
    textAlign: 'center',
    lineHeight: FontSize.small * 1.6,
  },
  arrowIndicatorWrapper: {
    alignItems: 'center',
    marginTop: Responsive.height(56),
    opacity: 0.8,
  },
});
