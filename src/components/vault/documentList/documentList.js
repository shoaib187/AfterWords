import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import VaultItem from '../vaultItem/vaultItem';
import { Spacing } from '../../constants/styles';

// 1. Realistic Document Sample Data
const vaultItems = [
  {
    id: 'doc_1',
    title: 'Eleanor_Will_2025.pdf',
    recipient: 'Eleanor Vance',
    status: 'Sealed',
    date: 'Jun 15, 2026',
  },
  {
    id: 'doc_2',
    title: 'House Deed & Title Insurance.pdf',
    recipient: 'Family Records',
    status: 'Scheduled',
    date: 'Dec 25, 2026',
  },
  {
    id: 'doc_3',
    title: 'Life Insurance Policy.docx',
    recipient: 'Sofia Chen',
    status: 'Sealed',
    date: 'Jan 01, 2027',
  },
  {
    id: 'doc_4',
    title: 'Trust & Estate Planning.pdf',
    recipient: 'Legal Team',
    status: 'Sealed',
    date: 'Mar 12, 2026',
  },
];

export default function DocumentList() {
  // 2. Render function using your custom VaultItem component with 'document' type
  const renderVaultItem = ({ item }) => {
    return <VaultItem item={item} type="document" />;
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
