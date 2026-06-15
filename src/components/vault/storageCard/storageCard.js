import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Radius, Spacing } from '../../constants/styles';
import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';

export default function StorageCard({ usedStorage = 2.4, totalStorage = 10 }) {
  // Dynamically calculate the metric filled percentage for the inner tracker track
  const progressPercent = Math.min((usedStorage / totalStorage) * 100, 100);

  return (
    <LinearGradient
      colors={['#EEDBB2', '#CD974A']}
      style={styles.cardFrame}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.metricsRow}>
        <Title color={COLORS.BLACK} text={'Storage'} />
        <AppText
          text={`${usedStorage} GB of ${totalStorage} GB`}
          color={COLORS.BLACK}
        />
      </View>
      <View style={styles.progressBarTrack}>
        <View
          style={[styles.progressFiller, { width: `${progressPercent}%` }]}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardFrame: {
    width: '100%',
    borderRadius: Radius.large,
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.medium + 4,
    justifyContent: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.small,
  },
  labelText: {},
  usageText: {},
  progressBarTrack: {
    width: '100%',
    height: 6,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(0, 0, 0, 0.05)', // Transparent structural track mask
    overflow: 'hidden',
  },
  progressFiller: {
    height: '100%',
    borderRadius: Radius.full,
    backgroundColor: '#C59353', // Deep premium core gold accent color
  },
});
