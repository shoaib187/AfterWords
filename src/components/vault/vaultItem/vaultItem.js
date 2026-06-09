import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import { FontSize, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/font';

export default function VaultItem({ item }) {
  return (
    <TouchableOpacity style={styles.vaultItemRow} activeOpacity={0.75}>
      <View style={styles.itemIconContainer}>
        <Icon name="video-outline" size={24} color="#F43F5E" />
      </View>

      <View style={styles.itemMetaColumn}>
        <AppText
          text={item.title}
          size="medium"
          color={COLORS.WHITE}
          numberOfLines={1}
        />

        <View style={styles.infoLineRow}>
          <Icon
            name="account-multiple-outline"
            size={Responsive.width(14)}
            color={COLORS.GRAY}
          />
          <AppText
            text={item.recipient}
            size="small"
            color={COLORS.GRAY}
            style={styles.infoLineText}
          />
        </View>

        <View style={styles.infoLineRow}>
          <Icon
            name="lock-outline"
            size={Responsive.width(14)}
            color={COLORS.GRAY}
          />
          <AppText
            text={`${item.status} · ${item.date}`}
            size="small"
            color={COLORS.GRAY}
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
    borderColor: 'rgba(244, 63, 94, 0.2)',
    backgroundColor: 'rgba(244, 63, 94, 0.04)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  itemMetaColumn: {
    flex: 1,
  },
  itemTitleText: {
    fontSize: FontSize.medium,
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
