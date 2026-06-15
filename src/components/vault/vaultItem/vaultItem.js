import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import { FontSize, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/font';

export default function VaultItem({ item, type = 'video' }) {
  // Dynamic Type Configuration Matrix
  const typeConfig = (() => {
    switch (type) {
      case 'voice':
      case 'audio':
        return {
          iconName: 'microphone-outline',
          baseColor: '#A855F7', // Premium Purple
        };
      case 'photo':
      case 'image':
        return {
          iconName: 'image-outline',
          baseColor: '#22C55E', // Vibrant Green
        };
      case 'document':
      case 'file':
        return {
          iconName: 'file-document-outline',
          baseColor: COLORS.GOLD || '#F97316',
        };
      case 'video':
      default:
        return {
          iconName: 'video-outline',
          baseColor: '#F43F5E', // Signature Crimson Red
        };
    }
  })();

  return (
    <TouchableOpacity style={styles.vaultItemRow} activeOpacity={0.75}>
      {/* Container badge dynamically colored based on asset type */}
      <View
        style={[
          styles.itemIconContainer,
          {
            borderColor: `${typeConfig.baseColor}33`, // 20% Opacity Border
            backgroundColor: `${typeConfig.baseColor}0A`, // 4% Opacity Fill
          },
        ]}
      >
        <Icon
          name={typeConfig.iconName}
          size={24}
          color={typeConfig.baseColor}
        />
      </View>

      <View style={styles.itemMetaColumn}>
        <AppText
          text={item.title}
          size="medium"
          color={COLORS.WHITE}
          fontFamily={FONT.TTForseMedium}
          numberOfLines={1}
        />

        <View style={styles.infoLineRow}>
          <Icon
            name="account-multiple-outline"
            size={Responsive.width(14)}
            color={COLORS.GRAY || '#A1A1AA'}
          />
          <AppText
            text={item.recipient}
            size="small"
            color={COLORS.GRAY || '#A1A1AA'}
            style={styles.infoLineText}
          />
        </View>

        <View style={styles.infoLineRow}>
          <Icon
            name="lock-outline"
            size={Responsive.width(14)}
            color={COLORS.GRAY || '#A1A1AA'}
          />
          <AppText
            text={`${item.status} · ${item.date}`}
            size="small"
            color={COLORS.GRAY || '#A1A1AA'}
            style={styles.infoLineText}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  itemMetaColumn: {
    flex: 1,
  },
  itemTitleText: {
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
});
