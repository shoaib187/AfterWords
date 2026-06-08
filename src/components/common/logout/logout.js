import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../button/button';
import { Radius, Spacing, FontSize } from '../../constants/styles';
import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';

export default function LogoutModal({ isVisible, onClose, onLogout }) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      statusBarTranslucent
      animationOut="slideOutDown"
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={styles.container}>
        {/* Swipe Handle */}
        <View style={styles.handle} />

        {/* Icon & Title */}
        <View style={styles.iconCircle}>
          <Ionicons name="log-out-outline" size={32} color={COLORS.PRIMARY} />
        </View>

        <Text style={styles.title}>Logout</Text>
        <Text style={styles.subtitle}>
          You will need to enter your credentials to log back in.
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonWrapper}>
          <Button
            title="Yes, Logout"
            onPress={onLogout}
            style={styles.logoutBtn}
          />

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: Radius.large,
    borderTopRightRadius: Radius.large,
    paddingTop: Spacing.small,
    paddingHorizontal: Spacing.large,
    paddingBottom: Spacing.small,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: COLORS.BORDER,
    borderRadius: Radius.full,
    marginBottom: Spacing.large,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.PRIMARY + '15', // 15% opacity primary
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.medium,
  },
  title: {
    fontSize: 22,
    fontFamily: FONT.SpaceGroteskBold,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: Spacing.small,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: FONT.SpaceGroteskRegular,
    color: COLORS.TEXT_LIGHT,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.xLarge,
  },
  buttonWrapper: {
    width: '100%',
    gap: Spacing.small,
  },
  logoutBtn: {
    backgroundColor: COLORS.PRIMARY,
    width: '100%',
  },
  cancelBtn: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full * 2,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  cancelText: {
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskBold,
    color: COLORS.TEXT_PRIMARY,
  },
});
