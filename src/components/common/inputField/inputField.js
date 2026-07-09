import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../constants/color';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/font';
import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  wrapperStyle,
  rightIcon,
  maxLength,
  renderElement,
  editable = true,
  style,
  isFocused,
  onFocus,
  onBlur,
  inputStyle,
  ...props
}) {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(glowAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(borderAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isFocused]);

  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.GOLD, 'pink'],
  });

  const animatedShadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.9],
  });

  const animatedElevation = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  return (
    <View style={[styles.inputContainer, wrapperStyle, style]}>
      {label && (
        <AppText
          fontFamily={FONT.TTForseRegular}
          text={label}
          style={{ marginBottom: Spacing.tiny }}
        />
      )}

      <Animated.View
        style={[
          styles.fieldWrapper,
          {
            opacity: !editable ? 0.5 : 1,
            borderColor: animatedBorderColor,
            shadowColor: COLORS.WHITE,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: animatedShadowOpacity,
            shadowRadius: 5,
            elevation: animatedElevation,
          },
          inputStyle,
        ]}
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={COLORS.GRAY}
          style={[styles.input]}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          selectionColor={COLORS.RED}
          maxLength={maxLength}
          editable={editable}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
        {renderElement && renderElement()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginBottom: Spacing.small,
  },
  label: {
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskBold,
    color: COLORS.WHITE,
    marginBottom: Responsive.height(6),
  },
  fieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Responsive.height(45),
    backgroundColor: COLORS.DARK_BLUE,
    borderRadius: Radius.xLarge,
    borderWidth: 1,
    paddingHorizontal: Spacing.medium,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskRegular,
    color: COLORS.WHITE,
    paddingVertical: 0,
  },
  iconContainer: {
    marginLeft: Spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
