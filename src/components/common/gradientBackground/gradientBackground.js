import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Responsive } from '../../constants/styles';

export default function GradientBackground({}) {
  return (
    <Image
      style={styles.headerGlowBackground}
      source={require('../../../../assets/png/top_gradient.png')}
      resizeMode="contain"
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
    width: '100%',
    opacity: 0.5,
  },
});
