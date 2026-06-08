import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../components/constants/color';
import { FONT } from '../../../components/constants/font';
import { FontSize, Radius, Spacing } from '../../constants/styles';

export const InterestChip = ({ label, icon, onPress, selected }) => (
  <Pressable
    onPress={onPress}
    style={[styles.chip, selected && styles.selectedChip]}
  >
    <Ionicons
      name={icon}
      size={16}
      color={selected ? '#fff' : COLORS.TEXT_LIGHT}
    />
    <Text style={[styles.chipText, selected && styles.selectedText]}>
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    paddingHorizontal: Spacing.medium,
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  chipText: {
    marginLeft: 6,
    fontFamily: FONT.SpaceGroteskMedium,
    fontSize: FontSize.small,
    color: COLORS.TEXT_LIGHT,
  },
  selectedChip: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },

  selectedText: {
    color: COLORS.WHITE,
  },
});
