import React from 'react';
import { StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderWithSubtitle from '../../../components/common/headerWithSubtitle/headerWithSubtitle';
import SearchBar from '../../../components/common/searchBar/searchBar';
import TreeGraph from '../../../components/profile/treeGraph/treeGraph';
import ConnectionDetails from '../../../components/profile/connectionDetails/connectionDetails';
import { Spacing } from '../../../components/constants/styles';

export default function MyFamilyTree() {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithSubtitle
        title={'Family Tree'}
        subtitle={'Connect generations and stories.'}
      />
      <View style={{ paddingHorizontal: Spacing.medium }}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TreeGraph />
        <ConnectionDetails />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingBottom: 140,
  },
});
