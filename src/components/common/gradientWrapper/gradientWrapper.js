import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Radius, Spacing } from '../../constants/styles';
import { Pressable } from 'react-native';

export default function GradientWrapper({ children, wrapperStyle, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={['#F5EAD9', '#D5A760']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          {
            padding: Spacing.medium,
            borderRadius: Radius.xLarge + 4,
            overflow: 'hidden',
          },
          wrapperStyle,
        ]}
      >
        {children}
      </LinearGradient>
    </Pressable>
  );
}
