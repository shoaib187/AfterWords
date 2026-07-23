import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/font';

export default function MenuItem({ icon, title, description, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.rowContainer]}
    >
      <View style={styles.rowLeftWrap}>
        <View style={styles.iconSquareFrame}>
          <Icon name={icon} size={Responsive.width(20)} color={COLORS.GOLD} />
        </View>

        <View style={styles.textStack}>
          <Title text={title} size="small" color={COLORS.WHITE} />

          {!!description && (
            <AppText
              text={description}
              size="small"
              fontFamily={FONT.TTForseRegular}
              color="#A1A1AA"
              style={styles.descriptionSpacing}
            />
          )}
        </View>
      </View>

      <Icon name="chevron-right" size={20} color="rgba(255,255,255,0.3)" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium,
    minHeight: Responsive.height(72),
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    borderRadius: Radius.xLarge,
    marginBottom: Spacing.small,
  },

  rowBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },

  rowLeftWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconSquareFrame: {
    width: Responsive.width(38),
    height: Responsive.width(38),
    borderRadius: Radius.medium,
    backgroundColor: 'rgba(255,255,255,0.04)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },

  textStack: {
    flex: 1,
    justifyContent: 'center',
  },

  descriptionSpacing: {
    marginTop: 2,
  },
});
