import { View, StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import MCOIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Responsive, Radius, Spacing } from '../../constants/styles';

export default function ReadlineStats({ dataState }) {
  // console.log('dataState', dataState);

  if (!dataState || !dataState.checklist) {
    return (
      <View style={styles.emptyContainer}>
        <AppText text="No estate data available" color={COLORS.WHITE} />
      </View>
    );
  }

  const checklist = dataState.checklist || [];
  const percentage = dataState.percentage || 0;

  const getProgressIcon = () => {
    if (percentage === 100) {
      return 'party-popper';
    } else if (percentage >= 50) {
      return 'progress-star';
    } else {
      return 'progress-wrench';
    }
  };

  return (
    <LinearGradient
      colors={['#EAD9B5', '#C49753']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.readinessCardWrapper}
    >
      <View style={styles.innerCard}>
        <View style={styles.cardHeaderMetrics}>
          <View style={styles.headerLeft}>
            <MCOIcon
              name={getProgressIcon()}
              size={Responsive.width(20)}
              color={COLORS.WHITE}
              style={styles.headerIcon}
            />
            <AppText
              text="Estate Readiness"
              size="medium"
              weight="bold"
              color={COLORS.WHITE}
            />
          </View>
          <View style={styles.percentageContainer}>
            <AppText
              text={`${percentage}%`}
              size="large"
              weight="bold"
              color={COLORS.WHITE}
            />
          </View>
        </View>

        <View style={styles.checklistStackContainer}>
          {checklist.map(item => (
            <View key={item.key} style={styles.checklistRow}>
              <MCOIcon
                name={
                  item.completed
                    ? 'check-circle'
                    : 'checkbox-blank-circle-outline'
                }
                size={Responsive.width(20)}
                color={item.completed ? '#10B981' : 'rgba(255, 255, 255, 0.5)'}
              />
              <AppText
                text={item.label}
                size="small"
                weight={item.completed ? 'bold' : 'regular'}
                color={
                  item.completed ? COLORS.WHITE : 'rgba(255, 255, 255, 0.6)'
                }
                style={[
                  styles.checklistText,
                  item.completed && styles.completedText,
                ]}
              />
            </View>
          ))}
        </View>

        {/* Completion Message */}
        {percentage === 100 && (
          <View style={styles.completionMessage}>
            <MCOIcon name="trophy" size={20} color="#10B981" />
            <AppText
              text="🎉 All steps completed!"
              size="small"
              color="#10B981"
              weight="bold"
            />
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  readinessCardWrapper: {
    width: '100%',
    borderRadius: Radius.large || 24,
    padding: Spacing.small,
    marginVertical: Spacing.small,
  },
  innerCard: {
    backgroundColor: COLORS.GOLD,
    borderRadius: Radius.large,
    padding: Spacing.medium,
  },
  cardHeaderMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.small,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: Spacing.small,
  },
  percentageContainer: {
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: Spacing.medium,
  },
  progressBarTrack: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Radius.tiny,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: Radius.tiny,
  },
  checklistStackContainer: {
    width: '100%',
    marginTop: Spacing.small,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.tiny,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  checklistText: {
    marginLeft: Spacing.medium,
    letterSpacing: 0.3,
    flex: 1,
  },
  completedText: {
    opacity: 1,
  },
  completedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: Spacing.small,
    paddingVertical: 2,
    borderRadius: Radius.tiny,
  },
  completionMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.small,
    padding: Spacing.small,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: Radius.tiny,
    gap: Spacing.small,
  },
  emptyContainer: {
    padding: Spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: Radius.large,
  },
});
