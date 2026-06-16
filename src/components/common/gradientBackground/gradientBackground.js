import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Responsive } from '../../constants/styles';

export default function GradientBackground({}) {
  return (
    <LinearGradient
      colors={['rgba(197, 147, 83, 0.35)', 'rgba(0, 0, 0, 0)']}
      style={styles.headerGlowBackground}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    />
  );
}

const styles = StyleSheet.create({
  headerGlowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(260),
    zIndex: 0,
  },
});
