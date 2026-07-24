import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../components/constants/color';
import { Spacing } from '../../components/constants/styles';

import { HomeHeader } from '../../components/home/homeHeader/homeHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReadlineStats from '../../components/home/readlineStats/readlineStats';
import LegacySnapshot from '../../components/home/legacySnapshot/legacySnapshot';
import { Button } from '../../components/common/button/button';
import { useDashboardStats, useUser } from '../../hooks/useUser/useUser';

export default function Home({ navigation, dashboardData }) {
  const {
    data: dashboardStats,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useDashboardStats();
  const { user } = useUser();

  const { firstName } = user || {};

  // console.log('data', dashboardStats);
  const { estateReadiness, stats } = dashboardStats?.data || {};
  // console.log('stats', stats);

  return (
    <SafeAreaView style={styles.masterContainer}>
      <HomeHeader firstName={firstName} />
      <ScrollView
        contentContainerStyle={styles.scrollLayout}
        showsVerticalScrollIndicator={false}
      >
        <ReadlineStats dataState={estateReadiness} />
        <LegacySnapshot dataState={stats} navigation={navigation} />
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
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
    paddingBottom: 100,
  },
});
