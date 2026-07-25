import { ActivityIndicator, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

import SearchBar from '../../../components/common/searchBar/searchBar';
import TabItem from '../../../components/vault/tabItem/tabItem';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../components/constants/color';

import AppText from '../../../components/typography/appText/appText';
import { Spacing } from '../../../components/constants/styles';
import Title from '../../../components/typography/title/title';
import StatsGrid from '../../../components/treasures/statsGrid/statsGrid';
import RecentItemCard from '../../../components/treasures/recentItemCard/recentItemCard';
import HeaderWithSubtitle from '../../../components/common/headerWithSubtitle/headerWithSubtitle';
import { useTreasures } from '../../../hooks/useTreasures/useTreasures';

export default function MyTreasures({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('videos');
  const { data, isLoading } = useTreasures();

  const treasures = data?.data?.treasures || [];

  const stats = {
    treasures: 127,
    storage: '2.4 GB',
    legacies: 48,
    collections: 12,
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderWithSubtitle
        navigation={navigation}
        title={'My Treasure'}
        subtitle={'Your Preserved Vault'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Spacing.medium,
          paddingBottom: Spacing.xLarge * 3,
        }}
      >
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <View style={styles.statsGridMatrix}>
          <StatsGrid stats={stats} />
          <Title text={'Categories'} style={{ marginBottom: Spacing.small }} />
          <TabItem selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

          <AppText
            text="RECENTS"
            size="small"
            style={styles.sectionHeaderTracking}
          />
          {isLoading ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 100,
              }}
            >
              <ActivityIndicator size={40} color={COLORS.GOLD} />
            </View>
          ) : (
            <View style={{ gap: Spacing.medium }}>
              {treasures?.map(item => (
                <RecentItemCard
                  key={item?._id}
                  item={item}
                  onPress={() =>
                    navigation.navigate('TreasureDetails', {
                      id: item?._id,
                    })
                  }
                />
              ))}
            </View>
          )}
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

  statsGridMatrix: {
    width: '100%',
    marginBottom: Spacing.medium,
  },

  sectionHeaderTracking: {
    letterSpacing: 1.2,
    fontSize: 12,
    marginBottom: Spacing.medium,
  },
});
