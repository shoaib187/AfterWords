import { View, StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import MCOIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Responsive, Radius, Spacing } from '../../constants/styles';

export default function ReadlineStats({ dataState }) {
  const renderChecklistRow = (label, isCompleted) => (
    <View style={styles.checklistRow}>
      <MCOIcon
        name={isCompleted ? 'check-circle-outline' : 'circle-outline'}
        size={Responsive.width(22)}
        color={isCompleted ? '#10B981' : 'rgba(37, 20, 20, 0.4)'}
      />
      <AppText
        text={label.toUpperCase()}
        size="small"
        weight="bold"
        color={isCompleted ? COLORS.WHITE : 'rgba(255, 255, 255, 0.4)'}
        style={styles.checklistText}
      />
    </View>
  );

  return (
    <LinearGradient
      colors={['#EAD9B5', '#C49753']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.readinessCardWrapper}
    >
      <View style={styles.innerCard}>
        <View style={styles.cardHeaderMetrics}>
          <AppText text="Estate Readiness" size="medium" color={COLORS.WHITE} />
          <AppText
            text={`${dataState.readinessPercentage} %`}
            size="medium"
            weight="bold"
            color={COLORS.WHITE}
          />
        </View>

        <View style={styles.checklistStackContainer}>
          {renderChecklistRow(
            'Account Created',
            dataState.checklist.accountCreated,
          )}
          {renderChecklistRow(
            'First Treasure Added',
            dataState.checklist.firstTreasure,
          )}
          {renderChecklistRow(
            'Recipient Added',
            dataState.checklist.recipientAdded,
          )}
          {renderChecklistRow(
            'Executors Complete',
            dataState.checklist.executorsComplete,
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  readinessCardWrapper: {
    width: '100%',
    borderRadius: Radius.large || 24,
    padding: Spacing.medium,
  },
  innerCard: {
    backgroundColor: '#BE8C35',
    borderRadius: Radius.large,
    padding: Spacing.medium,
  },
  cardHeaderMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Fixed: was 'between'
    alignItems: 'center',
    marginBottom: Spacing.large,
  },
  checklistStackContainer: {
    width: '100%',
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.medium - 2,
  },
  checklistText: {
    marginLeft: Spacing.medium,
    letterSpacing: 0.5,
  },
});
