import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import Title from '../../../components/typography/title/title';
import Subtitle from '../../../components/typography/subtitle/subtitle';
import { COLORS } from '../../../components/constants/color';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { Button } from '../../../components/common/button/button';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

export default function TreasureSaved({ navigation, route }) {
  const { isFromLegacy, treasureId } = route?.params || {};
  const id = treasureId?.data?.treasure?._id;
  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />

      <View style={styles.safeArea}>
        <View style={styles.centerContent}>
          <View style={styles.goldSealBadge}>
            <Ionicons
              name="lock-closed"
              size={Responsive.width(32)}
              color="rgba(0, 0, 0, 0.65)"
            />
          </View>

          <Title
            text={isFromLegacy ? 'Legacy Created' : 'Treasure saved.'}
            size="xxLarge"
            align="center"
          />
          <Subtitle
            text={
              isFromLegacy
                ? 'Your legacy has been successfully created.'
                : 'Your treasure has been saved to my treasure.'
            }
            size="medium"
            align="center"
            style={styles.statusDescriptionText}
          />
        </View>

        <View style={styles.footerActionGroup}>
          {isFromLegacy ? (
            <Button
              onPress={() => navigation.navigate('Home')}
              title="Return to my Treasure"
            />
          ) : (
            <>
              <Button
                onPress={() => navigation.navigate('Home')}
                title="Continue Another Treasure"
                rightIcon="arrow-right"
                variant="other"
              />
              <Button
                onPress={() => navigation.navigate('Home')}
                title="Go to My Treasure"
                variant="other"
              />
              <Button
                onPress={() => navigation.navigate('AssignRecipients', { id })}
                title="Create Legacy"
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  radialGlowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.large,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.small,
    marginTop: -Responsive.height(40),
  },
  goldSealBadge: {
    width: Responsive.width(96),
    height: Responsive.width(96),
    borderRadius: Radius.circle,
    backgroundColor: COLORS.GOLD,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Responsive.height(32),
    shadowColor: COLORS.GOLD,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  serifSealedTitle: {
    fontFamily: 'Georgia',
    fontWeight: '500',
    marginBottom: Spacing.large,
  },
  statusDescriptionText: {
    lineHeight: 22,
    marginTop: Spacing.medium,
  },
  footerActionGroup: {
    marginBottom: Spacing.large,
    width: '100%',
    gap: Spacing.medium,
  },
});
