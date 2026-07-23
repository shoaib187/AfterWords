import { ScrollView, View } from 'react-native';
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

const recentItems = [
  {
    id: 1,
    type: 'document',
    title: 'House Deed & Final Will',
    date: 'Sep 22, 2026',
    usages: 'Used in 2 Legacies',
  },
  {
    id: 2,
    type: 'video',
    title: 'Birthday Message',
    date: 'Sep 18, 2026',
    usages: 'Used in 1 Legacy',
  },
  {
    id: 3,
    type: 'collection',
    title: 'Family Memories',
    date: 'Sep 10, 2026',
    usages: '8 Items',
  },
  {
    id: 4,
    type: 'photo',
    title: 'Wedding Album',
    date: 'Aug 30, 2026',
    usages: 'Used in 3 Legacies',
  },
];

export default function MyTreasures({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('videos');

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
          <View style={{ gap: Spacing.medium }}>
            {recentItems.map(item => (
              <RecentItemCard
                key={item.id}
                type={item.type}
                title={item.title}
                date={item.date}
                usages={item.usages}
                onPress={() =>
                  navigation.navigate('TreasureDetails', {
                    type: item.type,
                    title: item.title,
                  })
                }
              />
            ))}
          </View>
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
