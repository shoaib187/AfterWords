import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';

const STATS = [
  {
    id: 1,
    value: '47',
    label: 'Memories Preserved',
  },
  {
    id: 2,
    value: '8',
    label: 'Scheduled Deliveries',
  },
  {
    id: 3,
    value: '12',
    label: 'Recipients',
  },
  {
    id: 4,
    value: '2',
    label: 'Family Branches',
  },
];

const StatCard = ({ value, label }) => (
  <View style={styles.card}>
    <Title
      text={value}
      size="xLarge"
      color={COLORS.WHITE}
      style={styles.value}
    />

    <AppText text={label} size="small" color="#A1A1AA" numberOfLines={2} />
  </View>
);

const Stats = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <StatCard {...STATS[0]} />
        <StatCard {...STATS[1]} />
      </View>

      <View style={styles.row}>
        <StatCard {...STATS[2]} />
        <StatCard {...STATS[3]} />
      </View>
    </View>
  );
};

export default memo(Stats);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.medium,
  },

  card: {
    width: '48%',
    backgroundColor: '#0A0A0C',
    borderRadius: Radius.large,
    borderWidth: 0.8,
    borderColor: COLORS.GOLD,
    paddingVertical: Responsive.height(18),
    paddingHorizontal: Spacing.medium,
    minHeight: Responsive.height(96),
    justifyContent: 'center',
  },

  value: {
    marginBottom: 6,
  },
});
