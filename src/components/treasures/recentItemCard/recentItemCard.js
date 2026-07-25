import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, { Activity } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MCOIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Radius, Responsive, Spacing } from '../../constants/styles';
import AppText from '../../typography/appText/appText';
import { formatDateTime } from '../../../utils/config';
import { useDeleteTreasure } from '../../../hooks/useTreasures/useTreasures';

const TYPE_ICON_MAP = {
  video: { icon: 'video-outline', color: '#8B5CF6' },
  voice: { icon: 'microphone-outline', color: '#F59E0B' },
  photo: { icon: 'image-outline', color: '#10B981' },
  document: { icon: 'file-document-outline', color: '#3B82F6' },
};

const DEFAULT_TYPE_ICON = { icon: 'file-outline', color: '#8B5CF6' };

const getTypeIconInfo = type =>
  TYPE_ICON_MAP[type?.toLowerCase()] || DEFAULT_TYPE_ICON;

export default function RecentItemCard({ item, onPress }) {
  const { icon, color } = getTypeIconInfo(item?.type);
  const { mutate: deleteTreasure, isPending } = useDeleteTreasure();

  const handleDelete = () => {
    deleteTreasure(
      { id: item?._id },
      {
        onSuccess: () => {},
        onError: error => {
          Alert.alert(
            'Error',
            'This treasure is part of a Legacy Gift and cannot be deleted',
          );
        },
      },
    );
  };

  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={['#FFF8EE', '#D4A45A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.recentItemGradientCard}
      >
        <View style={styles.whiteItemIconCircle}>
          <MCOIcon name={icon} size={Responsive.width(24)} color={color} />
        </View>

        <View style={styles.recentCardContentMeta}>
          <AppText text={item?.type} size="small" color="#71717A" />
          <AppText
            text={item?.title}
            size="medium"
            numberOfLines={1}
            color="#1C1917"
            style={styles.itemTitleGap}
          />
          <AppText
            text={formatDateTime(item?.createdAt)}
            size="small"
            color="#71717A"
            style={styles.itemDateGap}
          />
        </View>

        <View style={styles.usagesFloatingBadge}>
          <AppText text="Used in 2 Legacies" size="tiny" color="#065F46" />
        </View>
        <Pressable style={styles.deleteBtn} onPress={handleDelete}>
          {isPending ? (
            <ActivityIndicator size="small" color="#EF4444" />
          ) : (
            <MCOIcon
              name="delete-outline"
              size={Responsive.width(18)}
              color="#EF4444"
            />
          )}
        </Pressable>
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
  deleteBtn: {
    width: Responsive.width(32),
    height: Responsive.width(32),
    borderRadius: Radius.circle,
    position: 'absolute',
    top: Spacing.small,
    right: Spacing.tiny,
  },
});
