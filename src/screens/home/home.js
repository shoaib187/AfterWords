import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../components/constants/color';
import { Spacing } from '../../components/constants/styles';

import { HomeHeader } from '../../components/home/homeHeader/homeHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReadlineStats from '../../components/home/readlineStats/readlineStats';
import LegacySnapshot from '../../components/home/legacySnapshot/legacySnapshot';
import { Button } from '../../components/common/button/button';

export default function Home({ navigation, dashboardData }) {
  const dataState = dashboardData || {
    hasData: true,
    userName: 'Eleanor',
    readinessPercentage: 80,
    checklist: {
      accountCreated: true,
      firstTreasure: true,
      recipientAdded: true,
      executorsComplete: false,
    },
    snapshots: {
      treasures: 127,
      legacies: 48,
      recipients: 12,
      scheduled: 31,
    },
  };

  return (
    <SafeAreaView style={styles.masterContainer}>
      <HomeHeader />
      <ScrollView
        contentContainerStyle={styles.scrollLayout}
        showsVerticalScrollIndicator={false}
      >
        <ReadlineStats dataState={dataState} />
        <LegacySnapshot dataState={dataState} navigation={navigation} />
        <Button
          title={'Create Treasure'}
          onPress={() => navigation.navigate('CreateTreasure')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },

  scrollLayout: {
    paddingHorizontal: Spacing.large,
    paddingTop: Spacing.medium,
    paddingBottom: 100,
  },
});
