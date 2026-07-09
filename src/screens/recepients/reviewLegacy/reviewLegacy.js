import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../components/constants/color';
import AppText from '../../../components/typography/appText/appText';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../../../components/typography/title/title';
import { Button } from '../../../components/common/button/button';

export default function ReviewLegacy({ navigation }) {
  // Data snapshot mirror representing the overview state in the UI mock
  const legacySummary = {
    stepTitle: 'Legacy Step 3 of 3',
    instruction: 'Please review your delivery instructions before finalizing.',
    treasure: {
      title: 'Advice for my Son',
      type: 'Video',
    },
    recipients: [
      { id: '1', name: 'James Whitfield', relation: 'Son' },
      { id: '2', name: 'Sofia Chen', relation: 'Daughter' },
    ],
    releaseTerms: 'Scheduled for 03-11-2026',
  };

  return (
    <SafeAreaView style={styles.masterContainer}>
      <HeaderBack title={'Review & Save'} />
      <ScrollView
        contentContainerStyle={styles.scrollLayout}
        showsVerticalScrollIndicator={false}
      >
        {/* SUBHEADER INSTRUCTIONS */}
        <View style={styles.instructionTextBlock}>
          <Title text={legacySummary.stepTitle} />
          <AppText
            text={legacySummary.instruction}
            size="medium"
            color={COLORS.GRAY}
          />
        </View>

        {/* STEP SUMMARY STACK */}
        <View style={styles.cardsStackWrapper}>
          {/* CARD 1: THE TREASURE */}
          <LinearGradient
            colors={['#EAD9B5', '#C49753']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientSummaryCard}
          >
            <AppText
              text="1. THE TREASURE"
              size="small"
              weight="bold"
              color="#1C1917"
              style={styles.cardSectionLabel}
            />
            <View style={styles.cardContentRow}>
              <FeatherIcon
                name="video"
                size={20}
                color="rgba(28, 25, 23, 0.6)"
                style={styles.cardIconPadding}
              />
              <View style={styles.textMetaColumn}>
                <AppText
                  text={legacySummary.treasure.title}
                  size="medium"
                  weight="bold"
                  color="#1C1917"
                />
                <AppText
                  text={legacySummary.treasure.type}
                  size="small"
                  color="#44403C"
                  style={styles.metaSubtextGap}
                />
              </View>
            </View>
          </LinearGradient>

          {/* CARD 2: ASSIGNED TO */}
          <LinearGradient
            colors={['#EAD9B5', '#C49753']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientSummaryCard}
          >
            <AppText
              text="2. ASSIGNED TO"
              size="small"
              weight="bold"
              color="#1C1917"
              style={styles.cardSectionLabel}
            />
            {legacySummary.recipients.map((recipient, idx) => (
              <View
                key={recipient.id}
                style={[
                  styles.cardContentRow,
                  idx > 0 && styles.recipientRowGap,
                ]}
              >
                <FeatherIcon
                  name="user"
                  size={20}
                  color="rgba(28, 25, 23, 0.6)"
                  style={styles.cardIconPadding}
                />
                <View style={styles.recipientRowMeta}>
                  <AppText
                    text={recipient.name}
                    size="medium"
                    weight="bold"
                    color="#1C1917"
                  />
                  <AppText
                    text={recipient.relation}
                    size="medium"
                    color="#44403C"
                  />
                </View>
              </View>
            ))}
          </LinearGradient>

          {/* CARD 3: RELEASE TERMS */}
          <LinearGradient
            colors={['#EAD9B5', '#C49753']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientSummaryCard}
          >
            <AppText
              text="3. RELEASE TERMS"
              size="small"
              weight="bold"
              color="#1C1917"
              style={styles.cardSectionLabel}
            />
            <View style={styles.cardContentRow}>
              <FeatherIcon
                name="calendar"
                size={20}
                color="rgba(28, 25, 23, 0.6)"
                style={styles.cardIconPadding}
              />
              <View style={styles.textMetaColumn}>
                <AppText
                  text={legacySummary.releaseTerms}
                  size="medium"
                  weight="bold"
                  color="#1C1917"
                />
              </View>
            </View>
          </LinearGradient>
          <Button
            title="Save Legacy"
            onPress={() =>
              navigation.navigate('TreasureSaved', { isFromLegacy: true })
            }
          />
        </View>
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
    justifyContent: 'between',
    paddingHorizontal: Spacing.medium,
    paddingTop: Platform.OS === 'ios' ? 54 : 20,
    paddingBottom: Spacing.medium,
  },
  backIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCA257',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleTypography: {
    fontFamily: 'Georgia',
    fontSize: 18,
  },
  headerPlaceholderRight: {
    width: 36,
  },
  scrollLayout: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
    paddingBottom: Responsive.height(40),
    flexGrow: 1,
  },
  instructionTextBlock: {
    width: '100%',
    marginBottom: Responsive.height(28),
  },
  stepTitleStyle: {
    fontFamily: 'Georgia',
    marginBottom: Spacing.tiny,
  },
  stepDescStyle: {
    lineHeight: 20,
  },
  cardsStackWrapper: {
    width: '100%',
    marginBottom: Responsive.height(36),
  },
  gradientSummaryCard: {
    width: '100%',
    borderRadius: Radius.xLarge * 1.4,
    padding: Spacing.large,
    marginBottom: Spacing.medium,
  },
  cardSectionLabel: {
    letterSpacing: 0.5,
    color: 'rgba(28, 25, 23, 0.7)',
    marginBottom: Spacing.medium,
  },
  cardContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconPadding: {
    marginRight: Spacing.medium,
  },
  textMetaColumn: {
    justifyContent: 'center',
  },
  metaSubtextGap: {
    marginTop: 2,
  },
  recipientRowGap: {
    marginTop: Spacing.medium - 2,
  },
  recipientRowMeta: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'between',
    alignItems: 'center',
  },
  primarySaveButton: {
    width: '100%',
    height: Responsive.height(54),
    backgroundColor: '#DCA257',
    borderRadius: Radius.large || 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
});
