import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/color';
import { Radius, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/font';

const PhotoPickerModal = ({ isVisible, onClose, onSelect }) => {
  const options = [
    { id: 'camera', label: 'Take Photo', icon: 'camera-outline' },
    { id: 'library', label: 'Choose from Gallery', icon: 'images-outline' },
  ];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      style={styles.modal}
      backdropOpacity={0.5}
    >
      <View style={styles.container}>
        <View style={styles.indicator} />
        <Text style={styles.title}>Upload Photo</Text>

        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionBtn}
            onPress={() => {
              onSelect(option.id);
              onClose();
            }}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name={option.icon} size={22} color={COLORS.PRIMARY} />
            </View>
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: COLORS.WHITE,
    paddingTop: Spacing.small,
    paddingHorizontal: Spacing.large,
    paddingBottom: Spacing.xlarge,
    borderTopLeftRadius: Radius.large,
    borderTopRightRadius: Radius.large,
    alignItems: 'center',
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: COLORS.BORDER,
    borderRadius: Radius.full,
    marginBottom: Spacing.medium,
  },
  title: {
    fontSize: 18,
    fontFamily: FONT.SpaceGroteskBold,
    color: COLORS.TEXT_DARK,
    marginBottom: Spacing.large,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: Spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER + '50',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.medium,
  },
  optionText: {
    fontSize: 16,
    fontFamily: FONT.SpaceGroteskMedium,
    color: COLORS.TEXT_MAIN,
  },
  cancelBtn: {
    marginTop: Spacing.medium,
    paddingVertical: Spacing.small,
  },
  cancelText: {
    color: 'red',
    fontFamily: FONT.SpaceGroteskMedium,
    fontSize: 16,
  },
});

export default PhotoPickerModal;