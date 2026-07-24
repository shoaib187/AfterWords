import React from 'react';
import { StyleSheet, View, ScrollView, Platform, Alert } from 'react-native';
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
import { useCreateLegacyGift } from '../../../hooks/useLegacy/useLegacy';

export default function ReviewLegacy({ navigation, route }) {
  const { payload } = route?.params || {};
  const { mutate: createLegacy, isPending } = useCreateLegacyGift();

  console.log('Full payload received:', payload);

  // Remove only 'recipients' from payload, keep everything else including recipientIds
  const cleanPayload = { ...payload };
  delete cleanPayload.recipients; // Remove only the recipients array

  console.log('Clean payload (without recipients):', cleanPayload);

  // Get treasure info from payload
  const treasureTitle = payload?.treasureTitle || 'Untitled Treasure';
  const treasureType = payload?.treasureType || 'Document';

  // Get recipients for display
  const recipients = payload?.recipients || [];

  // Get release rule display text
  const getReleaseRuleDisplay = (releaseType, releaseDate) => {
    if (releaseType === 'estate') {
      return 'Upon Estate activation';
    } else if (releaseType === 'scheduled' && releaseDate) {
      // Format date for display
      const date = new Date(releaseDate);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `Scheduled for ${month}/${day}/${year}`;
    }
    return 'Not specified';
  };

  const releaseType = payload?.releaseType || 'estate';
  const releaseDate = payload?.releaseDate || null;

  const handleCreateLegacy = () => {
    createLegacy(
      { payload: cleanPayload },
      {
        onSuccess: data => {
          navigation.navigate('TreasureSaved', {
            isFromLegacy: true,
            treasureId: data,
          });
        },
        onError: error => {
          console.error('Error creating legacy:', error);

          let errorMessage = 'Failed to create legacy gift. Please try again.';

          if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            if (status === 400) {
              errorMessage =
                data?.message || 'Invalid request. Please check your input.';
            } else if (status === 401) {
              errorMessage = 'Authentication failed. Please login again.';
            } else if (status === 500) {
              errorMessage = 'Server error. Please try again later.';
            } else {
              errorMessage = data?.message || 'Server error occurred';
            }
          } else if (error.request) {
            errorMessage = 'Network error. Please check your connection.';
          }

          Alert.alert('Error', errorMessage);
        },
      },
    );
  };

  const legacySummary = {
    stepTitle: 'Legacy Step 3 of 3',
    instruction: 'Please review your delivery instructions before finalizing.',
    treasure: {
      title: treasureTitle,
      type: treasureType,
    },
    recipients: recipients,
    releaseTerms: getReleaseRuleDisplay(releaseType, releaseDate),
  };

  // Get icon based on treasure type
  const getIconName = type => {
    if (!type) return 'file';
    const lowerType = type.toLowerCase();
    if (lowerType === 'video') return 'video';
    if (lowerType === 'voice') return 'mic';
    if (lowerType === 'photo') return 'image';
    return 'file';
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
                name={getIconName(legacySummary.treasure.type)}
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
                  text={legacySummary.treasure.type || 'Document'}
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
            {Array.isArray(legacySummary.recipients) &&
            legacySummary.recipients.length > 0 ? (
              legacySummary.recipients.map((recipient, idx) => (
                <View
                  key={recipient.id || recipient._id || idx}
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
                      text={recipient.name || 'Unknown'}
                      size="medium"
                      weight="bold"
                      color="#1C1917"
                    />
                    <AppText
                      text={
                        recipient.relationship ||
                        recipient.relation ||
                        'No relation'
                      }
                      size="medium"
                      color="#44403C"
                    />
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.cardContentRow}>
                <FeatherIcon
                  name="users"
                  size={20}
                  color="rgba(28, 25, 23, 0.6)"
                  style={styles.cardIconPadding}
                />
                <AppText
                  text={`${
                    payload?.recipientIds?.length || 0
                  } recipients selected`}
                  size="medium"
                  weight="bold"
                  color="#1C1917"
                />
              </View>
            )}
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
                name={releaseType === 'estate' ? 'shield' : 'calendar'}
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
                {releaseType === 'estate' && (
                  <AppText
                    text="Release upon estate activation"
                    size="small"
                    color="#44403C"
                    style={styles.metaSubtextGap}
                  />
                )}
              </View>
            </View>
          </LinearGradient>

          <Button
            title={isPending ? 'Saving...' : 'Save Legacy'}
            onPress={handleCreateLegacy}
            disabled={isPending}
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
    justifyContent: 'space-between',
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
