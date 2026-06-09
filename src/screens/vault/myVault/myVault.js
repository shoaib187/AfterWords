import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../components/constants/color';
import {
  FontSize,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { FONT } from '../../../components/constants/font';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import SearchBar from '../../../components/common/searchBar/searchBar';
import TabItem from '../../../components/vault/tabItem/tabItem';
import VaultItem from '../../../components/vault/vaultItem/vaultItem';

export default function MyVault({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('videos');
  const filterTabs = [
    { id: 'videos', label: 'Videos', icon: 'video-outline' },
    { id: 'voice', label: 'Voice', icon: 'microphone-outline' },
    { id: 'photos', label: 'Photos', icon: 'image-outline' },
    { id: 'documents', label: 'Documents', icon: 'file-document-outline' },
  ];

  // Vault Feed Content mocking data layout from Screenshot 2026-06-09 at 10.14.38 AM.png
  const vaultItems = [
    {
      id: '1',
      title: 'Words for Sofia on her wedding day',
      recipient: 'Sofia Chen',
      status: 'Scheduled',
      date: 'Dec 25, 2026',
      type: 'videos',
    },
    {
      id: '2',
      title: 'Christmas message 2026',
      recipient: 'All recipients',
      status: 'Scheduled',
      date: 'Dec 24, 2026',
      type: 'videos',
    },
  ];

  const renderVaultItem = ({ item }) => {
    return <VaultItem item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(197, 147, 83, 0.35)', 'rgba(0, 0, 0, 0)']}
        style={styles.headerGlowBackground}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <HeaderBack title={'My Vault'} />

      <View style={styles.safeAreaContainer}>
        <SearchBar value={searchQuery} onChangeText={searchQuery} />
        <TabItem
          filterTabs={filterTabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <FlatList
          data={vaultItems}
          keyExtractor={item => item.id}
          renderItem={renderVaultItem}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  headerGlowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(260),
    zIndex: 0,
  },
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
  },
  listContainer: {
    paddingBottom: Responsive.height(20),
  },
  vaultItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.medium,
  },
  itemIconContainer: {
    width: Responsive.width(52),
    height: Responsive.width(52),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.2)',
    backgroundColor: 'rgba(244, 63, 94, 0.04)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  itemMetaColumn: {
    flex: 1,
  },
  itemTitleText: {
    fontSize: FontSize.medium,
    marginBottom: 4,
  },
  infoLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  infoLineText: {
    fontSize: FontSize.small,
    marginLeft: 6,
    fontFamily: FONT.TTForseRegular,
  },
  listSeparator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    width: '100%',
    marginVertical: 2,
  },
});
