import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/color';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/font';
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
  onFocus,
  onBlur,
  showError = true,
  inputStyle,
  validationType, // 'email' | 'phone' | 'password' | null
  required = false,
  ...props
}) {
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const validateField = text => {
    if (!text && required) {
      setError(`${label} is required`);
      return false;
    }

    if (!text) {
      setError('');
      return true;
    }

    switch (validationType) {
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
          setError('Please enter a valid email address');
          return false;
        }
        break;
      }
      case 'password': {
        // Min 8 chars, at least one uppercase, one lowercase, one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(text)) {
          setError('Min 8 chars with uppercase, lowercase, and number');
          return false;
        }
        break;
      }
      case 'phone': {
        // + optional, 7-15 digits
        const phoneRegex = /^\+?[\d]{7,15}$/;
        const cleanPhone = text.replace(/\s/g, '');
        if (!phoneRegex.test(cleanPhone)) {
          setError('Enter valid phone (7-15 digits, + optional)');
          return false;
        }
        break;
      }
      default:
        break;
    }

    setError('');
    return true;
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
    validateField(value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
    // Clear error on focus so user can correct
    setError('');
  };

  const handleChangeText = text => {
    onChangeText(text);
    // Clear error while typing
    if (error) {
      setError('');
    }
  };

  return (
    <View style={[styles.inputContainer, wrapperStyle, style]}>
      {label && (
        <AppText
          fontFamily={FONT.TTForseRegular}
          text={label}
          style={{ marginBottom: Spacing.tiny }}
        />
      )}

      <View
        style={[
          styles.fieldWrapper,
          {
            opacity: !editable ? 0.5 : 1,
            borderColor: error ? COLORS.RED : COLORS.GOLD,
          },
          inputStyle,
          error && styles.errorBorder,
        ]}
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={COLORS.GRAY}
          style={[styles.input, error && styles.errorText]}
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          selectionColor={COLORS.RED}
          maxLength={maxLength}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
        {renderElement && renderElement()}
      </View>
      {showError && error && (
        <AppText
          text={error}
          style={styles.errorTextStyle}
          color={COLORS.RED}
          size="small"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginBottom: Spacing.small,
  },
  fieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Responsive.height(52),
    backgroundColor: COLORS.DARK_BLUE,
    borderRadius: Radius.xLarge,
    borderWidth: 1,
    paddingHorizontal: Spacing.medium,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: FontSize.medium,
    fontFamily: FONT.TTForseRegular,
    color: COLORS.WHITE,
    paddingVertical: 0,
  },
  iconContainer: {
    marginLeft: Spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorBorder: {
    borderColor: COLORS.RED,
  },
  errorText: {
    color: COLORS.RED,
  },
  errorTextStyle: {
    marginTop: Spacing.tiny,
    marginLeft: Spacing.small,
  },
});
