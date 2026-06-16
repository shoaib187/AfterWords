import React from 'react';
import { StyleSheet, View, TouchableOpacity, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Title from '../../typography/title/title';
import { FONT } from '../../constants/font';
import AppText from '../../typography/appText/appText';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import { COLORS } from '../../constants/color';

export default function DeleteConfirmationModal({
  visible,
  onClose,
  onDelete,
  itemName = 'Words for Sofia on her wedding day',
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlayBackdrop}>
        {/* Tap background to cancel safely */}
        <TouchableOpacity
          style={styles.dismissOverlayTouch}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Premium Gold Substrate Alert Panel Wrapper */}
        <LinearGradient
          colors={['#F2E9D2', '#C09043']}
          style={styles.alertCardContainer}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
        >
          {/* Warning Icon Badge Container */}
          <View style={styles.warningBadgeCircle}>
            <Icon name="alert-outline" size={24} color="#DC2626" />
          </View>

          {/* Heading Confirmation Query */}
          <Title
            text="Delete this item?"
            size="large"
            color={COLORS.WHITE}
            align="center"
            style={styles.headingTitleOffset}
          />

          {/* Descriptive Warn text utilizing verbatim layout constraints */}
          <View style={styles.descriptionTextStack}>
            <AppText
              text={` "Selected Item" will be permanently removed from your vault. This cannot be undone.`}
              size="medium"
              fontFamily={FONT.TTForseRegular}
              align="center"
              color={COLORS.DARK_GRAY}
            />
          </View>

          {/* Side-by-Side Action Interactive Buttons Row */}
          <View style={styles.actionButtonsInlineRow}>
            <TouchableOpacity
              style={styles.cancelWhiteButton}
              activeOpacity={0.85}
              onPress={onClose}
            >
              <AppText text="Cancel" size="medium" color="#71717A" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.destructiveDeleteButton}
              activeOpacity={0.85}
              onPress={onDelete}
            >
              <AppText text="Delete" size="medium" color="#991B1B" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlayBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
  },
  dismissOverlayTouch: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  alertCardContainer: {
    width: '100%',
    borderRadius: 36,
    paddingHorizontal: Spacing.large + 4,
    paddingTop: Spacing.xLarge + 12,
    paddingBottom: Spacing.large + 6,
    alignItems: 'center',
  },
  warningBadgeCircle: {
    width: Responsive.width(54),
    height: Responsive.width(54),
    borderRadius: Radius.circle,
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },
  headingTitleOffset: {
    marginBottom: Spacing.medium - 4,
  },
  descriptionTextStack: {
    paddingHorizontal: Spacing.small,
    marginBottom: Spacing.xLarge + 4,
    lineHeight: 20,
  },
  actionButtonsInlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelWhiteButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: Responsive.height(46),
    borderRadius: Radius.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.small + 2,
  },
  destructiveDeleteButton: {
    flex: 1,
    backgroundColor: 'rgba(219, 107, 72, 0.55)', // Custom styled translucent coral tone
    height: Responsive.height(46),
    borderRadius: Radius.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.small + 2,
    borderWidth: 1,
    borderColor: 'rgba(153, 27, 27, 0.15)',
  },
});
