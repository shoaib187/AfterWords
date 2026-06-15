import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import VaultItem from '../vaultItem/vaultItem'; // Adjust this path to match your file structure
import { Spacing } from '../../constants/styles';

// 1. Realistic Video Memory Sample Data
const vaultItems = [
  {
    id: 'video_1',
    title: 'Words for Sofia on her wedding day',
    recipient: 'Sofia Chen',
    status: 'Scheduled',
    date: 'Dec 25, 2026',
  },
  {
    id: 'video_2',
    title: 'Christmas message 2026',
    recipient: 'All recipients',
    status: 'Scheduled',
    date: 'Dec 24, 2026',
  },
  {
    id: 'video_3',
    title: 'Anniversary Retrospective Video Letter',
    recipient: 'Eleanor Vance',
    status: 'Sealed',
    date: 'Oct 12, 2026',
  },
  {
    id: 'video_4',
    title: 'Advice for my grandchildren',
    recipient: 'Family Records',
    status: 'Sealed',
    date: 'Jan 15, 2027',
  },
];

export default function VideosList() {
  // 2. Render function using your custom VaultItem component with 'video' type
  const renderVaultItem = ({ item }) => {
    return <VaultItem item={item} type="video" />;
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
