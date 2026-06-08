import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Radius, Responsive } from '../../constants/styles';
import { COLORS } from '../../constants/color';

export default function SocialLogin() {
  const iconSize = Responsive.font(24);
  return (
    <View style={styles.socialMediaContainer}>
      <TouchableOpacity
        style={styles.socialButton}
        activeOpacity={0.7}
        onPress={() => console.log('Google Login')}
      >
        <Icon name="google" size={iconSize} color="#DB4437" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        activeOpacity={0.7}
        onPress={() => console.log('Facebook Login')}
      >
        <Icon name="facebook" size={iconSize} color="#1877F2" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        activeOpacity={0.7}
        onPress={() => console.log('Apple Login')}
      >
        <Icon name="apple" size={iconSize} color="#000000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  socialButton: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: Radius.circle,
    width: Responsive.width(56),
    height: Responsive.width(56),
    alignItems: 'center',
    justifyContent: 'center',
  },
});