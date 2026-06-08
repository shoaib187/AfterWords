import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';

export default function GradientBackground({
  size = 200,
  color = '#DCA257',
  opacity = 0.6,
  style,
}) {
  const containerSize = size * 4;

  return (
    <View
      pointerEvents="none"
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
        },
        style,
      ]}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        }}
      />

      <BlurView
        style={[StyleSheet.absoluteFill, {}]}
        blurType="dark"
        blurAmount={Platform.OS === 'ios' ? 30 : 40}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
