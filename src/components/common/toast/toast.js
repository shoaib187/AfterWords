import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : 0;

const ToastTypes = {
  success: {
    bgColor: '#4caf50',
    icon: 'check-circle',
    iconColor: '#fff',
  },
  error: {
    bgColor: '#f44336',
    icon: 'error',
    iconColor: '#fff',
  },
  warning: {
    bgColor: '#ff9800',
    icon: 'warning',
    iconColor: '#fff',
  },
  info: {
    bgColor: '#2196f3',
    icon: 'info',
    iconColor: '#fff',
  },
};

export default function Toast({
  visible,
  message,
  duration = 3000,
  type = 'success',
  position = 'top',
  customColor,
  icon,
  onHide,
}) {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const isTopPosition = position === 'top';
  const initialPosition = isTopPosition ? -100 : 100;
  const finalPosition = isTopPosition ? STATUS_BAR_HEIGHT : 30;

  // ! STATUS_BAR_HEIGHT + 10 to move a slight bit from top to bottom

  const toastStyle = ToastTypes[type] || ToastTypes.success;
  const backgroundColor = customColor || toastStyle.bgColor;
  const iconName = icon || toastStyle.icon;

  // Add shake animation for error toasts
  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (visible) {
      // Reset animations
      slideAnim.setValue(initialPosition);
      opacityAnim.setValue(0);
      // Shake animation for error type
      if (type === 'error') {
        setTimeout(shake, 300);
      }

      // Entrance animation - FIXED EASING
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: finalPosition,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.2)),
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.2)),
        }),
      ]).start(() => {
        // Auto hide after duration
        setTimeout(() => {
          hideToast();
        }, duration);
      });
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: initialPosition,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }),
    ]).start(() => {
      onHide?.();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toastWrapper,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor,
          top: 0,
          bottom: !isTopPosition ? finalPosition + 10 : undefined,
          transform: [{ translateY: slideAnim }, { translateX: shakeAnim }],
          opacity: opacityAnim,
          shadowColor: backgroundColor,
          elevation: 8,
        },
      ]}
    >
      <Icon
        name={iconName}
        size={24}
        color={toastStyle.iconColor}
        style={styles.icon}
      />

      <Text style={styles.toastText}>{message}</Text>

      <TouchableOpacity
        onPress={hideToast}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon
          name="close"
          size={20}
          color={toastStyle.iconColor}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
    alignItems: 'center',
  },
  toastWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    minHeight: 60,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  icon: {
    marginRight: 12,
  },
  toastText: {
    marginLeft: 8,
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 20,
  },
  closeIcon: {
    marginLeft: 10,
    opacity: 0.8,
  },
});
