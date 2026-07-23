import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from '../../../components/typography/appText/appText';
import Title from '../../../components/typography/title/title';

export default function LabelSection() {
  return (
    <View style={styles.section}>
      <Title text="Labels" />

      <View style={styles.tagsContainer}>
        <View style={styles.tag}>
          <AppText text="Legal" style={styles.tagText} />
        </View>

        <View style={styles.tag}>
          <AppText text="Property" style={styles.tagText} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },

  tagsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },

  tag: {
    backgroundColor: '#EBEFF2',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },

  tagText: {
    color: '#4A5568',
    fontSize: 13,
    fontWeight: '500',
  },
});
