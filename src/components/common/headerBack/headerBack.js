import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/color';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';
import Title from '../../typography/title/title';
import { useNavigation } from '@react-navigation/native';

export default function HeaderBack({
  title,
  onSettings,
  showBack = true,
  showUsers = false,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrow}
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={FontSize.large + 2}
            color={COLORS.WHITE}
          />
        </TouchableOpacity>
      )}
      {showUsers && (
        <TouchableOpacity style={styles.backArrow} activeOpacity={0.7}>
          <Ionicons
            name="people-outline"
            size={FontSize.large + 2}
            color={COLORS.WHITE}
          />
        </TouchableOpacity>
      )}

      {title && (
        <View style={styles.titleContainer}>
          <Title text={title} numberOfLines={1} />
        </View>
      )}

      {/* 3. Right Section: Empty View to balance the center */}
      {onSettings ? (
        <TouchableOpacity style={styles.backArrow} onPress={onSettings}>
          <Ionicons
            name="settings-outline"
            size={FontSize.large + 2}
            color={COLORS.TEXT_PRIMARY}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Responsive.height(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium,
  },
  backArrow: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: Radius.circle,
    backgroundColor: COLORS.GOLD,
  },
  titleContainer: {
    flex: 1, // Allows the title container to take up middle space
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: Responsive.width(40), // Must match the width of backArrow for perfect centering
  },
});
