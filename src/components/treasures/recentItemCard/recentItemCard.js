import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MCOIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Radius, Responsive, Spacing } from '../../constants/styles';
import AppText from '../../typography/appText/appText';

export default function RecentItemCard({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={['#FFF8EE', '#D4A45A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.recentItemGradientCard}
      >
        <View style={styles.whiteItemIconCircle}>
          <MCOIcon
            name="file-document-outline"
            size={Responsive.width(24)}
            color="#8B5CF6"
          />
        </View>

        <View style={styles.recentCardContentMeta}>
          <AppText text="Document" size="small" color="#71717A" />
          <AppText
            text="Home Deed & Final Will"
            size="medium"
            numberOfLines={1}
            color="#1C1917"
            style={styles.itemTitleGap}
          />
          <AppText
            text="Sep 22, 2026"
            size="small"
            color="#71717A"
            style={styles.itemDateGap}
          />
        </View>

        <View style={styles.usagesFloatingBadge}>
          <AppText text="Used in 2 Legacies" size="tiny" color="#065F46" />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  recentItemGradientCard: {
    width: '100%',
    borderRadius: Radius.large || 24,
    padding: Spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },

  whiteItemIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },

  recentCardContentMeta: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 40,
  },

  itemTitleGap: {
    marginTop: 4,
    marginBottom: 2,
  },

  itemDateGap: {
    marginTop: 2,
  },

  usagesFloatingBadge: {
    position: 'absolute',
    bottom: Spacing.small,
    right: Spacing.small,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: Spacing.medium,
    paddingVertical: 5,
    borderRadius: Radius.large || 12,
  },
});
