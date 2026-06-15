import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import VaultItem from '../vaultItem/vaultItem';
import { Spacing } from '../../constants/styles';

// 1. Realistic Voice/Audio Memory Sample Data
const vaultItems = [
  {
    id: 'voice_1',
    title: 'Bedtime story recordings for Lily',
    recipient: 'Lily Vance',
    status: 'Scheduled',
    date: 'Dec 25, 2026',
  },
  {
    id: 'voice_2',
    title: 'Guitar Melody & Audio Letter',
    recipient: 'Sofia Chen',
    status: 'Sealed',
    date: 'Sep 18, 2026',
  },
  {
    id: 'voice_3',
    title: 'Life lessons & career guidance note',
    recipient: 'Marcus Vance',
    status: 'Scheduled',
    date: 'Feb 10, 2027',
  },
  {
    id: 'voice_4',
    title: 'Passing thoughts on Sunday morning',
    recipient: 'Eleanor Vance',
    status: 'Sealed',
    date: 'Jun 01, 2026',
  },
];

export default function VoiceList() {
  // 2. Render function using your custom VaultItem component with 'voice' type
  const renderVaultItem = ({ item }) => {
    return <VaultItem item={item} type="voice" />;
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
