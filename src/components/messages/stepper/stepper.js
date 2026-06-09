import { View, StyleSheet } from 'react-native';
import React from 'react';
import AppText from '../../typography/appText/appText';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';
import { COLORS } from '../../constants/color';

export default function Stepper() {
  return (
    <View style={styles.stepperContainer}>
      <View style={styles.stepperLineTrack} />
      <View style={styles.stepperRow}>
        <View style={[styles.stepBadge, styles.stepBadgeCompleted]}>
          <AppText text="1  Pick format" style={styles.stepTextCompleted} />
        </View>
        <View style={[styles.stepBadge, styles.stepBadgeActive]}>
          <AppText text="2  Create" style={styles.stepTextActive} />
        </View>
        <View style={[styles.stepBadge, styles.stepBadgePending]}>
          <AppText text="3  Assign" style={styles.stepTextPending} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepperContainer: {
    marginTop: Responsive.height(16),
    marginBottom: Responsive.height(32),
    justifyContent: 'center',
    position: 'relative',
  },
  stepperLineTrack: {
    position: 'absolute',
    left: Spacing.large || 16,
    right: Spacing.large || 16,
    height: 1,
    backgroundColor: 'rgba(197, 147, 83, 0.3)',
    alignSelf: 'center',
    zIndex: 1,
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  stepBadge: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.small,
    borderRadius: Radius.full || 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepBadgeCompleted: {
    backgroundColor: '#F5EAD9',
    borderColor: '#C59353',
  },
  stepTextCompleted: {
    fontSize: FontSize.small,
    color: '#443322',
  },
  stepBadgeActive: {
    backgroundColor: '#D5A760',
    borderColor: '#C59353',
  },
  stepTextActive: {
    fontSize: FontSize.small,
    color: COLORS.BLACK,
  },
  stepBadgePending: {
    backgroundColor: COLORS.BLACK,
    borderColor: '#443322',
  },
  stepTextPending: {
    fontSize: FontSize.small,
    color: COLORS.GOLD,
  },
});
