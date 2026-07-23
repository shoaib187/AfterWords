import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import Intro from '../../../components/legacies/intro/intro';
import LegacyGiftCard from '../../../components/legacies/legacyGiftCard/legacyGiftCard';
import { Spacing } from '../../../components/constants/styles';

export const LEGACY_GIFTS = [
  {
    id: '1',
    title: 'Words For Your Wedding Day',
    trigger: 'Your Wedding Day',
    status: 'PARTIALLY VIEWED',
    statusColor: '#E05A47',
    variant: 'gold',
    icons: ['videocam-outline', 'image-outline', 'document-text-outline'],
    type: '',
  },
  {
    id: '2',
    title: 'The Lake House Legacy',
    trigger: 'Executor Release',
    status: 'COMPLETED',
    statusColor: '#00D66C',
    variant: 'dark',
    icons: ['videocam-outline', 'document-text-outline'],
    type: '',
  },
  {
    id: '3',
    title: 'Brooks Family History',
    trigger: 'One Year After Verification',
    status: 'NOT OPENED',
    statusColor: '#4A90E2',
    variant: 'dark',
    icons: [],
    type: 'family',
  },
];

export default function LegacyGifts({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderBack title={'Legacy Gifts'} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Intro />
        {LEGACY_GIFTS.map(item => (
          <LegacyGiftCard
            key={item.id}
            item={item}
            onPress={() =>
              navigation.navigate('GiftDetails', { type: item?.type })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.large,
    paddingBottom: 80,
  },
});
