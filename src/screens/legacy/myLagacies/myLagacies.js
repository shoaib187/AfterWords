import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../components/constants/color';
import LegacyCard from '../../../components/legacies/legacyCard/legacyCard';

import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import Title from '../../../components/typography/title/title';

export default function MyLegacies({ navigation }) {
  // Static mock data representing the list state from the mockup
  const legaciesData = [
    {
      id: '1',
      type: 'Photo',
      title: 'Advice for Michael',
      recipient: 'Michael Brooks',
      releaseTime: '1 Year Post-Verification',
      iconType: 'image-outline',
      isHighlighted: true,
    },
    {
      id: '2',
      type: 'Document',
      title: 'Home Deed & Final Will',
      recipient: 'Sarah Jenkins',
      releaseTime: 'Immediate upon Verification',
      iconType: 'file-document-outline',
      isHighlighted: false,
    },
    {
      id: '3',
      type: 'Audio',
      title: 'Story of How I Met Your Mother',
      recipient: 'Sarah Jenkins',
      releaseTime: 'October 12, 2025',
      iconType: 'microphone-outline',
      isHighlighted: false,
    },
  ];

  const handleCardPress = item => {
    // Navigate to legacy detail screen
    navigation?.navigate('LegacyDetails', { legacyId: item.id });
  };

  return (
    <SafeAreaView style={styles.masterContainer}>
      <GradientBackground />
      <View style={styles.topNavigationHeader}>
        <TouchableOpacity
          style={styles.headerIconButton}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.7}
        >
          <FeatherIcon name="chevron-left" size={Responsive.width(24)} />
        </TouchableOpacity>

        <Title text="My Legacies" />

        <TouchableOpacity
          style={styles.headerIconButton}
          onPress={() => navigation?.navigate('CreateLegacy')}
          activeOpacity={0.7}
        >
          <FeatherIcon
            name="plus"
            size={Responsive.width(24)}
            color="#1C1917"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollLayout}
        showsVerticalScrollIndicator={false}
      >
        {legaciesData?.map(item => (
          <LegacyCard
            key={item.id}
            id={item.id}
            type={item.type}
            title={item.title}
            recipient={item.recipient}
            releaseTime={item.releaseTime}
            iconType={item.iconType}
            isHighlighted={item.isHighlighted}
            onPress={() => handleCardPress(item)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },

  topNavigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium,
    paddingTop: Platform.OS === 'ios' ? 60 : Spacing.medium,
    paddingBottom: Spacing.large,
    zIndex: 1,
  },
  headerIconButton: {
    width: Responsive.width(36),
    height: Responsive.width(36),
    borderRadius: Radius.circle,
    backgroundColor: COLORS.GOLD,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleTypography: {
    fontSize: FontSize.large,
    letterSpacing: 0.5,
  },
  scrollLayout: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.small,
    paddingBottom: Responsive.height(40),
  },
});
