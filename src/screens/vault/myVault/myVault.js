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
import StorageCard from '../../../components/vault/storageCard/storageCard';
import VideosList from '../../../components/vault/videosList/videosList';
import VoiceList from '../../../components/vault/voiceList/voiceList';
import PhotosList from '../../../components/vault/photosList/photosList';
import DocumentList from '../../../components/vault/documentList/documentList';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

export default function MyVault({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('videos');

  const renderItem = () => {
    switch (selectedTab) {
      case 'videos':
        return <VideosList />;
      case 'voice':
        return <VoiceList />;
      case 'photos':
        return <PhotosList />;
      case 'documents':
        return <DocumentList />;

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderBack title={'My Vault'} />

      <View style={styles.safeAreaContainer}>
        <SearchBar value={searchQuery} onChangeText={searchQuery} />
        <TabItem selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <StorageCard />
        {renderItem()}
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
