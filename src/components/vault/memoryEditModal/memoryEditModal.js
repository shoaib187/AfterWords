import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../typography/appText/appText';
import { FONT } from '../../constants/font';
import { Radius, Responsive, Spacing } from '../../constants/styles';

export default function MemoryEditModal({ visible, onClose, onSave }) {
  const [deedTitle, setDeedTitle] = useState(
    'Words for Sofia on her wedding day',
  );
  const [personalNote, setPersonalNote] = useState(
    `"Record the part about the Sunday morning when she was seven — she'll know what I mean. End with the poem."`,
  );
  const [recipient, setRecipient] = useState('Sofia Chen');
  const [status, setStatus] = useState('Sealed');

  const handleSave = () => {
    if (onSave) {
      onSave({ deedTitle, personalNote, recipient, status });
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlayBackdrop}
      >
        <TouchableOpacity
          style={styles.dismissOverlayTouch}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Premium Gold Substrate Card Layer Panel */}
        <LinearGradient
          colors={['#F4EAD4', '#CD974A']}
          style={styles.modalContentCard}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.8, y: 1 }}
        >
          {/* Form Header Context: Memory Property Deed */}
          <View style={styles.inputGroupStack}>
            <AppText
              text="Memory Property Deed"
              size="small"
              fontFamily={FONT.TTForseMedium}
              color="rgba(28, 25, 23, 0.6)"
              style={styles.fieldLabelSpacing}
            />
            <View style={styles.whiteInputBoxField}>
              <TextInput
                value={deedTitle}
                onChangeText={setDeedTitle}
                style={[styles.baseTextInputElement, styles.boldTextOverride]}
                placeholderTextColor="rgba(28, 25, 23, 0.4)"
              />
            </View>
          </View>

          {/* Form Group Context: Personal Note */}
          <View style={styles.inputGroupStack}>
            <AppText
              text="Personal Note"
              size="small"
              fontFamily={FONT.TTForseMedium}
              color="rgba(28, 25, 23, 0.6)"
              style={styles.fieldLabelSpacing}
            />
            <View
              style={[styles.whiteInputBoxField, styles.multilineBoxHeight]}
            >
              <TextInput
                value={personalNote}
                onChangeText={setPersonalNote}
                style={[styles.baseTextInputElement, styles.italicTextOverride]}
                multiline={true}
                numberOfLines={3}
                placeholderTextColor="rgba(28, 25, 23, 0.4)"
              />
            </View>
          </View>

          {/* Inline Row Grid Columns for Recipient and Status fields */}
          <View style={styles.twoColumnGridRow}>
            <View style={styles.gridColumnItem}>
              <AppText
                text="Recipient"
                size="small"
                fontFamily={FONT.TTForseMedium}
                color="rgba(28, 25, 23, 0.6)"
                style={styles.fieldLabelSpacing}
              />
              <View style={styles.whiteInputBoxField}>
                <TextInput
                  value={recipient}
                  onChangeText={setRecipient}
                  style={[
                    styles.baseTextInputElement,
                    styles.centerTextOverride,
                  ]}
                  placeholderTextColor="rgba(28, 25, 23, 0.4)"
                />
              </View>
            </View>

            <View style={styles.gridColumnItem}>
              <AppText
                text="Status"
                size="small"
                fontFamily={FONT.TTForseMedium}
                color="rgba(28, 25, 23, 0.6)"
                style={styles.fieldLabelSpacing}
              />
              <View style={styles.whiteInputBoxField}>
                <TextInput
                  value={status}
                  onChangeText={setStatus}
                  style={[
                    styles.baseTextInputElement,
                    styles.centerTextOverride,
                    styles.mutedTextOverride,
                  ]}
                  placeholderTextColor="rgba(28, 25, 23, 0.4)"
                />
              </View>
            </View>
          </View>

          {/* Matte Solid Contrast Submit Button - Save Change */}
          <TouchableOpacity
            style={styles.submitActionButton}
            activeOpacity={0.8}
            onPress={handleSave}
          >
            <AppText text="Save Change" size="medium" color="#1C1917" />
          </TouchableOpacity>
        </LinearGradient>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlayBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dismissOverlayTouch: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContentCard: {
    width: '92%',
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: Spacing.large,
    paddingTop: Spacing.xLarge + 4,
    paddingBottom: Responsive.height(36),
    marginBottom: Responsive.height(44),
  },
  inputGroupStack: {
    width: '100%',
    marginBottom: Spacing.medium + 2,
  },
  fieldLabelSpacing: {
    marginBottom: Spacing.small - 2,
    paddingLeft: 4,
  },
  whiteInputBoxField: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    minHeight: Responsive.height(50),
    justifyContent: 'center',
    paddingHorizontal: Spacing.medium,
  },
  multilineBoxHeight: {
    minHeight: Responsive.height(96),
    paddingVertical: Spacing.small,
    alignItems: 'flex-start',
  },
  baseTextInputElement: {
    width: '100%',
    fontSize: 14,
    color: '#1C1917',
    padding: 0,
    fontFamily: FONT.TTForseMedium,
  },
  boldTextOverride: {
    color: 'rgba(28, 25, 23, 0.5)',
  },
  italicTextOverride: {
    fontStyle: 'italic',
    lineHeight: 18,
    color: 'rgba(28, 25, 23, 0.8)',
  },
  twoColumnGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: Responsive.height(36),
  },
  gridColumnItem: {
    width: '47%',
  },
  centerTextOverride: {
    textAlign: 'center',
    color: 'rgba(28, 25, 23, 0.5)',
  },
  mutedTextOverride: {
    opacity: 0.6,
  },
  submitActionButton: {
    width: '100%',
    backgroundColor: 'rgba(28, 25, 23, 0.25)',
    height: Responsive.height(44),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
