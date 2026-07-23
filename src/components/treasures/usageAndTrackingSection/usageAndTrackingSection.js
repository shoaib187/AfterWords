import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Responsive } from '../../../components/constants/styles';
import AppText from '../../../components/typography/appText/appText';
import Title from '../../../components/typography/title/title';

export default function UsageAndTrackingSection() {
  const trackingItems = [
    {
      id: 1,
      text: 'Assigned to Sarah Jenkins (Executor)',
    },
    {
      id: 2,
      text: 'Assigned to Michael Brooks Legacy',
    },
  ];

  return (
    <View style={styles.section}>
      <Title text="Usage & Tracking" />

      <View style={styles.cardContainer}>
        {trackingItems.map(item => (
          <View key={item.id} style={styles.trackingRow}>
            <MaterialCommunityIcons
              name="shield-key-outline"
              size={Responsive.width(18)}
              color="#D4A359"
            />

            <AppText text={item.text} style={styles.trackingText} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },

  cardContainer: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },

  trackingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  trackingText: {
    color: '#333333',
    fontSize: 13,
    flex: 1,
  },
});
