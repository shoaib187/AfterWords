import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { Spacing, FontSize } from '../../constants/styles';
import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NetworkIndicator() {
  const insets = useSafeAreaInsets();
  const animation = useSharedValue(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const offline = state.isConnected === false || state.isInternetReachable === false;
      animation.value = withSpring(offline ? 1 : 0, {
        damping: 45,
        stiffness: 100
      });
    });

    return () => unsubscribe();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(animation.value, [0, 1], [-100, 0]) }
      ],
      opacity: animation.value,
    };
  });

  // Calculate height to account for status bar padding on Notch phones
  const paddingTop = Platform.OS === 'ios' ? insets.top : Spacing.small;

  return (
    <Animated.View style={[styles.container, { paddingTop }, animatedStyle]}>
      <Icon name="wifi-off" size={18} color={COLORS.WHITE} style={styles.icon} />
      <Text style={styles.text}>You are currently offline</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.ERROR || '#E74C3C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacing.small,
    zIndex: 99999,
    elevation: 10,
  },
  icon: {
    marginRight: Spacing.small,
  },
  text: {
    color: COLORS.WHITE,
    fontFamily: FONT.SpaceGroteskBold,
    fontSize: FontSize.small,
  },
});