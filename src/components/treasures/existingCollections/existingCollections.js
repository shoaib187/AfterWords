import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../constants/color';
import { FontSize, Responsive, Spacing } from '../../constants/styles';
import AppText from '../../typography/appText/appText';
import Title from '../../typography/title/title';
import { FONT } from '../../constants/font';

const EXISTING_COLLECTIONS = [
  {
    id: '1',
    title: "Grandpa's Life Lessons",
    date: 'Sep 04, 2025',
  },
  {
    id: '2',
    title: 'Family Reunion 2026',
    date: 'Jan 04, 2026',
  },
  {
    id: '3',
    title: 'Family Recipes',
    date: 'Jan 04, 2024',
  },
];

export default function ExistingCollections({ onItemPress }) {
  return (
    <View>
      <Title text="Save To Existing" size="small" style={styles.sectionTitle} />

      <View style={styles.existingList}>
        {EXISTING_COLLECTIONS.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.existingCard}
            activeOpacity={0.8}
            onPress={() => onItemPress?.(item)}
          >
            <View style={styles.iconBadge}>
              <MaterialCommunityIcons
                name="archive-outline"
                size={Responsive.width(22)}
                color="#C0392B"
              />
            </View>

            <View style={styles.existingTextContainer}>
              <AppText text={item.title} style={styles.existingTitle} />

              <AppText
                text={`Collection Created ${item.date}`}
                style={styles.existingDate}
              />
            </View>

            <Feather
              name="chevron-right"
              size={Responsive.width(20)}
              color={COLORS.BLACK}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.BLACK,
    marginBottom: Spacing.medium,
  },

  existingList: {
    gap: Spacing.medium,
  },

  existingCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBadge: {
    width: Responsive.width(46),
    height: Responsive.width(46),
    borderRadius: 14,
    backgroundColor: '#F7EEDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },

  existingTextContainer: {
    flex: 1,
  },

  existingTitle: {
    color: COLORS.BLACK,
    fontSize: FontSize.medium,
    marginBottom: 2,
    fontFamily: FONT.TTForseSemiBold,
  },

  existingDate: {
    color: '#666666',
    fontSize: 12,
  },
});
