import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
const TRACK_WIDTH = 50;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 22;
const THUMB_MARGIN = 3;
const TRAVEL = TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN * 2;
import { COLORS } from '../../../components/constants/color';
import { FontSize, Spacing } from '../../../components/constants/styles';
import { FONT } from '../../constants/font';

export default function Toggle({
  value = false,
  onValueChange,
  label,
  description,
  disabled = false,
  iconName = 'moon', // 👈 added
}) {
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, {
      damping: 48,
      stiffness: 280,
    });
  }, [value]);

  const trackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.BORDER, COLORS.PRIMARY],
    );

    return { backgroundColor };
  });

  const thumbStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, TRAVEL]);

    const scale = interpolate(progress.value, [0, 0.5, 1], [1, 1.1, 1]);

    return {
      transform: [{ translateX }, { scale }],
    };
  });

  const handlePress = () => {
    if (disabled) return;
    onValueChange?.(!value);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.wrapper, disabled && styles.disabled]}
    >
      {/* 👇 dynamic icon */}
      {iconName ? (
        <Ionicons
          style={{ marginRight: Spacing.medium }}
          name={iconName}
          size={22}
          color={COLORS.PRIMARY}
        />
      ) : null}

      <View style={styles.labelSection}>
        {label ? (
          <Text
            style={[
              styles.label,
              {
                color: COLORS.TEXT_PRIMARY,
                fontSize: FontSize.medium,
              },
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        ) : null}

        {description ? (
          <Text
            style={[
              styles.description,
              {
                color: COLORS.TEXT_SECONDARY,
                fontSize: FontSize.small,
                marginTop: Spacing.tiny,
              },
            ]}
            numberOfLines={2}
          >
            {description}
          </Text>
        ) : null}
      </View>

      <Animated.View
        style={[
          styles.track,
          {
            width: TRACK_WIDTH,
            height: TRACK_HEIGHT,
            borderRadius: TRACK_HEIGHT / 2,
            borderWidth: !value ? 2 : 0,
            borderColor: '#f9f9f9',
          },
          trackStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: THUMB_SIZE - 2,
              height: THUMB_SIZE - 2,
              borderRadius: THUMB_SIZE / 2,
              marginLeft: THUMB_MARGIN,
            },
            thumbStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  labelSection: {
    flex: 1,
    marginRight: 16,
  },
  label: {
    fontFamily: FONT.SpaceGroteskRegular,
    fontSize: FontSize.medium,
  },
  description: {},
  track: {
    justifyContent: 'center',
  },
  thumb: {
    backgroundColor: '#FFFFFF',
  },
});
