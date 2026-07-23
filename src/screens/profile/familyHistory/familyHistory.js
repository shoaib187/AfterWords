import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import GradientWrapper from '../../../components/common/gradientWrapper/gradientWrapper';
import { FontSize, Spacing } from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import AppText from '../../../components/typography/appText/appText';
import Title from '../../../components/typography/title/title';

// Structured JSON Timeline Data
const TIMELINE_EVENTS = [
  {
    id: '1',
    year: '1985',
    title: 'Purchased The Family Farm',
    location: 'Garysburg, NC',
    description:
      'Arthur and Eleanor finally closed on the 40-acre property after saving for almost a decade...',
    hasImagePlaceholder: true,
    status: 'active',
  },
  {
    id: '2',
    year: '1968',
    title: 'Arthur & Eleanor Married',
    location: null,
    description:
      'A small ceremony in Chicago during a massive winter blizzard. Only 12 people could make it.',
    hasImagePlaceholder: false,
    status: 'active',
  },
  {
    id: '3',
    year: '1952',
    title: 'Immigration to US',
    location: null,
    description: 'No artifacts preserved for this event yet.',
    hasImagePlaceholder: false,
    status: 'disabled',
  },
];

export default function FamilyHistory() {
  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderBack title={'Family History'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.timelineWrapper}>
          <View style={styles.timelineLine} />
          {TIMELINE_EVENTS.map((event, index) => {
            const isDisabled = event.status === 'disabled';
            const useGradient = index < 2; // First two cards

            const CardContent = (
              <>
                <Title
                  text={event.title}
                  style={[
                    styles.cardTitle,
                    isDisabled
                      ? styles.cardTitleDisabled
                      : styles.cardTitleGold,
                  ]}
                />

                {event.hasImagePlaceholder && (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons name="image-outline" size={42} color="#9E7A35" />
                  </View>
                )}

                {event.location && (
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={16} />
                    <AppText
                      text={event.location}
                      style={styles.locationText}
                    />
                  </View>
                )}

                <AppText
                  text={event.description}
                  style={[
                    styles.cardDescription,
                    isDisabled
                      ? styles.cardDescriptionDisabled
                      : styles.cardDescriptionGold,
                  ]}
                />
              </>
            );

            return (
              <View key={event.id} style={styles.eventRow}>
                <View style={styles.nodeContainer}>
                  <View
                    style={[
                      styles.nodeDot,
                      isDisabled ? styles.nodeDotDisabled : styles.nodeDotGold,
                    ]}
                  />
                </View>

                <View style={styles.eventContent}>
                  <Text style={styles.yearText}>{event.year}</Text>

                  {useGradient ? (
                    <GradientWrapper style={styles.card}>
                      {CardContent}
                    </GradientWrapper>
                  ) : (
                    <View
                      style={[
                        styles.card,
                        isDisabled ? styles.cardDisabled : styles.cardGold,
                      ]}
                    >
                      {CardContent}
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  /* Timeline Structural Layout */
  timelineWrapper: {
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 11, // Centered relative to the 24px wide node dots
    top: 12,
    bottom: 24,
    width: 2,
    backgroundColor: '#6B5426',
  },
  eventRow: {
    flexDirection: 'row',
    marginBottom: 32,
  },

  /* Node Dot Styles */
  nodeContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 16,
    paddingTop: 4,
  },
  nodeDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  nodeDotGold: {
    backgroundColor: '#D1A354',
    borderWidth: 3,
    borderColor: '#3B301B',
  },
  nodeDotDisabled: {
    backgroundColor: '#555555',
    borderWidth: 3,
    borderColor: '#262626',
  },

  /* Event Content & Text */
  eventContent: {
    flex: 1,
  },
  yearText: {
    color: '#D1A354',
    fontSize: 28,
    fontFamily: 'serif',
    marginBottom: 12,
  },

  /* Card Component Styles */
  card: {
    borderRadius: 24,
    padding: 20,
  },
  cardGold: {
    backgroundColor: '#D1A354',
  },
  cardDisabled: {
    backgroundColor: '#4A4A4A',
  },

  /* Card Inner Elements */
  cardTitle: {
    fontSize: FontSize.large,
    marginBottom: Spacing.small,
  },
  cardTitleGold: {
    color: COLORS.BLACK,
  },
  cardTitleDisabled: {
    color: '#A0A0A0',
  },

  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.small,
    gap: 6,
  },
  locationText: {
    color: COLORS.BLACK,
    fontSize: FontSize.medium,
  },

  cardDescription: {
    fontSize: FontSize.small,
    lineHeight: 19,
  },
  cardDescriptionGold: {
    color: '#2C220D',
  },
  cardDescriptionDisabled: {
    color: '#888888',
  },
});
