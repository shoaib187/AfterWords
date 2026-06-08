import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Responsive, Spacing, FontSize, Radius } from '../../../components/constants/styles';
import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';

export default function SearchBar({ value, onChangeText, onFilterPress, wrapperStyle }) {
  return (
    <View style={[styles.container, wrapperStyle]}>
      {/* Search Input Section */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name="search-outline"
          size={Responsive.font(20)}
          color={COLORS.TEXT_LIGHT}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search matches..."
          placeholderTextColor={COLORS.TEXT_LIGHT}
          value={value}
          onChangeText={onChangeText}
          autoCorrect={false}
        />
      </View>

      {/* Filter Button Section */}
      <TouchableOpacity
        style={styles.filterBtn}
        onPress={onFilterPress}
        activeOpacity={0.8}
      >
        <Ionicons
          name="options-outline"
          size={Responsive.font(22)}
          color={COLORS.WHITE}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    marginVertical: Spacing.medium,
    gap: Spacing.small,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    height: Responsive.height(45),
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.medium,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  searchIcon: {
    marginRight: Spacing.tiny,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: FONT.SpaceGroteskRegular,
    fontSize: FontSize.medium,
    color: COLORS.TEXT_PRIMARY,
  },
  filterBtn: {
    width: Responsive.width(45),
    height: Responsive.width(45),
    backgroundColor: COLORS.PRIMARY,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});