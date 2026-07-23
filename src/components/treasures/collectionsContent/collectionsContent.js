import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';

const COLLECTION_ITEMS = [
  {
    id: '1',
    title: 'The Story of the Pocket Watch',
    subtitle: 'Voice',
    icon: 'microphone-outline',
    color: '#C0392B',
  },
  {
    id: '2',
    title: "Mom's Secret Recipe",
    subtitle: 'Photo',
    icon: 'image-outline',
    color: '#8B5CF6',
  },
];

export default function CollectionContentsSection({
  onAddTreasure,
  onItemPress,
}) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onItemPress?.(item)}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={item.icon} size={22} color={item.color} />
      </View>

      <View style={styles.textContainer}>
        <AppText numberOfLines={1} text={item.title} style={styles.itemTitle} />
        <AppText text={item.subtitle} style={styles.itemSubtitle} />
      </View>

      <Feather name="chevron-right" size={20} color="#000" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Title text="Collection Contents" />

        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={onAddTreasure}
        >
          <Feather name="plus" size={16} color="#FFF" />

          <AppText text="Add Treasure" style={styles.addButtonText} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={COLLECTION_ITEMS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.medium,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  addButton: {
    backgroundColor: '#C8933A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small - 2,
    borderRadius: Radius.circle,
    gap: 6,
  },

  listContainer: {
    gap: 12,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: Radius.xLarge,
    borderWidth: 1.5,
    borderColor: '#D4A359',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: Responsive.width(48),
    height: Responsive.width(48),
    borderRadius: Radius.medium,
    backgroundColor: '#F7EEDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },

  textContainer: {
    flex: 1,
  },

  itemTitle: {
    color: '#000',
  },

  itemSubtitle: {
    color: '#666',
  },
  addButtonText: {
    fontSize: FontSize.tiny,
  },
});
