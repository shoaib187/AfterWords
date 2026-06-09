import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Responsive,
  Spacing,
  FontSize,
  Radius,
} from '../../../components/constants/styles';
import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';

export default function SearchBar({ value, onChangeText, wrapperStyle }) {
  return (
    <View style={[styles.searchBarContainer, wrapperStyle]}>
      <Ionicons
        name="search-outline"
        size={Responsive.width(18)}
        color="rgba(255, 255, 255, 0.4)"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInputField}
        placeholder="Search your Contents..."
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        value={value}
        onChangeText={onChangeText}
        keyboardAppearance="dark"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Radius.large || 12,
    paddingHorizontal: Spacing.medium || 14,
    height: Responsive.height(40),
    marginTop: Responsive.height(8),
    marginBottom: Responsive.height(28),
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInputField: {
    flex: 1,
    color: COLORS.WHITE,
    fontSize: FontSize.medium || 14,
    fontFamily: FONT.TTForseRegular,
    padding: 0,
  },
});
