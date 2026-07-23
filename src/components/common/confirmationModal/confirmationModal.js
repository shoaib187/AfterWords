import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';

export default function ConfirmationModal({
  visible = false,
  title = 'Archive this Treasure?',
  description = 'This Treasure is not used in any active Legacies. It is safe to archive.',
  cancelText = 'Cancel',
  confirmText = 'Yes, Archive it',
  onCancel,
  onConfirm,
  confirmColor = '#E50914',
  cancelTextColor = '#E50914',
}) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
      navigationBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalCard}>
              <Title text={title} color={COLORS.BLACK} style={styles.title} />

              <AppText
                text={description}
                color="#333333"
                style={styles.description}
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.cancelButton,
                    { borderColor: cancelTextColor },
                  ]}
                  activeOpacity={0.8}
                  onPress={onCancel}
                >
                  <AppText text={cancelText} color={cancelTextColor} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.confirmButton,
                    { backgroundColor: confirmColor },
                  ]}
                  activeOpacity={0.8}
                  onPress={onConfirm}
                >
                  <AppText text={confirmText} color={COLORS.WHITE} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
  },
  modalCard: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: Radius.xLarge * 1.2,
    paddingVertical: Responsive.height(18),
    paddingHorizontal: Spacing.large,
    alignItems: 'center',
    elevation: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.small,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.large,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: Spacing.small,
  },
  button: {
    flex: 1,
    height: Responsive.height(48),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  confirmButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
