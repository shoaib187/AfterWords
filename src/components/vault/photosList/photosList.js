import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import VaultItem from '../vaultItem/vaultItem'; // Adjust this path to match your file structure
import { Spacing } from '../../constants/styles';

// 1. Realistic Photo Memory Sample Data
const vaultItems = [
  {
    id: 'photo_1',
    title: 'Words for Sofia on her wedding day (Cover Picture)',
    recipient: 'Sofia Chen',
    status: 'Scheduled',
    date: 'Dec 25, 2026',
  },
  {
    id: 'photo_2',
    title: 'Family Summer Trip 2024 Album',
    recipient: 'All recipients',
    status: 'Sealed',
    date: 'Aug 14, 2026',
  },
  {
    id: 'photo_3',
    title: 'Graduation Day Portrait',
    recipient: 'Marcus Vance',
    status: 'Sealed',
    date: 'May 20, 2026',
  },
  {
    id: 'photo_4',
    title: 'Old Wallet Memory Polaroid Scan',
    recipient: 'Eleanor Vance',
    status: 'Scheduled',
    date: 'Nov 05, 2026',
  },
];

export default function PhotosList() {
  // 2. Render function using your custom VaultItem component with 'photo' type
  const renderVaultItem = ({ item }) => {
    return <VaultItem item={item} type="photo" />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={vaultItems}
        keyExtractor={item => item.id}
        renderItem={renderVaultItem}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  listSeparator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    width: '100%',
    marginVertical: 2,
  },
});
