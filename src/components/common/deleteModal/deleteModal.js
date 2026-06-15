import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';

const ConfirmModal = ({
  visible,
  onClose,
  title = 'Delete Account?',
  description = 'This action is permanent and cannot be undone.',
  buttonText = 'Delete',
  accentColor = '#FF3B30',
  loading = false,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <StatusBar backgroundColor="rgba(0,0,0,0.7)" />

        {/* Main Card with Gradient Border/Background */}
        <LinearGradient
          colors={['#1E1E1E', '#000000']}
          style={styles.modalContainer}
        >
          {/* Subtle decorative gold accent top border */}
          <LinearGradient
            colors={['#EEDBB2', '#C59353']}
            style={styles.topAccentBar}
          />

          <View style={styles.content}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: `${accentColor}15` },
              ]}
            >
              <Ionicons
                name="trash"
                size={Responsive.width(30)}
                color={accentColor}
              />
            </View>

            <Text style={[styles.title, { color: COLORS.WHITE }]}>{title}</Text>
            <Text style={styles.description}>{description}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: accentColor }]}
                onPress={onConfirm}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.confirmText}>{buttonText}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.medium,
  },
  modalContainer: {
    width: '100%',
    borderRadius: 32,
    padding: 1, // Width of the gradient border
  },
  topAccentBar: {
    height: 3,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 10,
  },
  content: {
    backgroundColor: '#0A0A0A',
    borderRadius: 31,
    padding: Spacing.large,
    alignItems: 'center',
    gap: Spacing.medium,
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.small,
  },
  title: {
    fontSize: FontSize.xlarge,
    fontFamily: FONT.SpaceGroteskBold,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    color: '#A1A1AA',
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskRegular,
    marginBottom: Spacing.small,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.medium,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    height: Responsive.height(50),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  cancelText: {
    color: '#FFF',
    fontFamily: FONT.SpaceGroteskMedium,
  },
  confirmButton: {
    flex: 1,
    height: Responsive.height(50),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmText: {
    color: '#FFF',
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskBold,
  },
});

export default ConfirmModal;
