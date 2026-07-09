import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Responsive, Radius } from '../../constants/styles';
import { COLORS } from '../../constants/color';
import AppText from '../../typography/appText/appText';

const Button = React.memo(
  ({
    title,
    onPress,
    style,
    disabled,
    textStyle,
    loading,
    variant = 'primary',
    leftIcon,
    rightIcon,
    iconSize = 20,
    iconColor,
  }) => {
    const isPrimary = variant === 'primary';

    const backgroundColor = isPrimary ? COLORS.GOLD : 'transparent';

    const textColor = isPrimary ? COLORS.WHITE || COLORS.BLACK : COLORS.WHITE;

    const finalIconColor = iconColor || textColor;

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled || loading}
        style={[
          styles.btn,
          {
            backgroundColor,
            opacity: loading || disabled ? 0.6 : 1,
            borderWidth: isPrimary ? 0 : 1,
            borderColor: '#BE8C35',
          },
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.BLACK} size={22} />
        ) : (
          <View style={styles.content}>
            {leftIcon && (
              <Icon
                name={leftIcon}
                size={iconSize}
                color={finalIconColor}
                style={styles.icon}
              />
            )}

            <AppText
              text={title}
              color={isPrimary ? textColor : COLORS.GOLD}
              style={textStyle}
              size="medium"
            />

            {rightIcon && (
              <Icon
                name={rightIcon}
                size={iconSize}
                color={isPrimary ? finalIconColor : COLORS.GOLD}
                style={styles.icon}
              />
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  btn: {
    paddingVertical: Responsive.height(10),
    borderRadius: Radius.full * 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: Responsive.height(45),
    width: '100%',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginHorizontal: 6,
  },
});

export { Button };
