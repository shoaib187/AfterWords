import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Responsive, Spacing, FontSize, Radius } from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import { FONT } from '../../../components/constants/font';

const Description = ({ value, onChangeText, placeholder, label, maxLength = 500 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[
          styles.counter,
          value?.length >= maxLength ? { color: COLORS.ERROR } : null
        ]}>
          {value?.length || 0}/{maxLength}
        </Text>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.TEXT_LIGHT}
          multiline
          numberOfLines={5}
          maxLength={maxLength}
          textAlignVertical="top" // Crucial for Android alignment
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.medium,
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.tiny,
  },
  label: {
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskMedium,
    color: COLORS.TEXT_PRIMARY,
  },
  counter: {
    fontSize: FontSize.small,
    fontFamily: FONT.SpaceGroteskRegular,
    color: COLORS.TEXT_LIGHT,
  },
  inputWrapper: {
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
    minHeight: Responsive.height(120), // Gives it a "box" look
  },
  input: {
    flex: 1,
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskRegular,
    color: COLORS.TEXT_PRIMARY,
    paddingTop: 0, // Fixes Android padding issue
  },
});

export default Description;