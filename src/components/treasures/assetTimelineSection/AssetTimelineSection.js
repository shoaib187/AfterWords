import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from '../../../components/typography/appText/appText';
import Title from '../../../components/typography/title/title';

export default function AssetTimelineSection() {
  const timelineItems = [
    {
      id: 1,
      color: '#888888',
      text: 'Uploaded Aug 22, 2026',
    },
    {
      id: 2,
      color: '#38D39F',
      text: 'Assigned to 2 Legacies',
    },
  ];

  return (
    <View style={styles.section}>
      <Title text="Asset Timeline" />

      <View style={styles.cardContainer}>
        {timelineItems.map(item => (
          <View key={item.id} style={styles.timelineRow}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />

            <AppText text={item.text} style={styles.timelineText} />
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

  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  timelineText: {
    color: '#333333',
    fontSize: 13,
    flex: 1,
  },
});
