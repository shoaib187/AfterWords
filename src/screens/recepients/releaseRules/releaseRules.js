import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import { COLORS } from '../../../components/constants/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../../components/typography/appText/appText';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import Title from '../../../components/typography/title/title';
import { Button } from '../../../components/common/button/button';
import { useCreateLegacyGift } from '../../../hooks/useLegacy/useLegacy';

export default function ReleaseRules({ navigation, route }) {
  const { recipientIds, treasureId, recipients } = route?.params || {};
  const { mutate: createLegacy, isPending } = useCreateLegacyGift();

  const [selectedRule, setSelectedRule] = useState('estate_activation');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');

  console.log(
    'recipientIds',
    recipientIds,
    'treasureId',
    treasureId,
    recipients,
  );

  const handleSelectRule = ruleType => {
    setSelectedRule(ruleType);
  };

  // Format date for display
  const formatDateForDisplay = date => {
    if (!date) return 'mm/dd/yyyy';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Format date for API (YYYY-MM-DD)
  const formatDateForAPI = date => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get tomorrow's date for minimum date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };

  // Check if date is today or in the past
  const isDateTodayOrPast = date => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate <= today;
  };

  const handleDateConfirm = selectedDate => {
    setShowDatePicker(false);

    // Validate that the selected date is not today or in the past
    if (isDateTodayOrPast(selectedDate)) {
      Alert.alert(
        'Invalid Date',
        'Please select a future date. Today and past dates are not allowed.',
        [{ text: 'OK', onPress: () => setShowDatePicker(true) }],
      );
      return;
    }

    if (selectedDate) {
      setScheduledDate(selectedDate);
      setFormattedDate(formatDateForDisplay(selectedDate));
    }
  };

  const handleDateCancel = () => {
    setShowDatePicker(false);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // Condition check to block or pass button submission access
  const isButtonEnabled =
    recipientIds &&
    recipientIds.length > 0 &&
    treasureId &&
    (selectedRule === 'estate_activation' ||
      (selectedRule === 'scheduled' &&
        formattedDate &&
        formattedDate !== 'mm/dd/yyyy' &&
        !isDateTodayOrPast(scheduledDate)));

  const handleCreateLegacy = () => {
    // Validate required fields
    if (!treasureId) {
      Alert.alert('Error', 'Treasure ID is missing');
      return;
    }

    if (!recipientIds || recipientIds.length === 0) {
      Alert.alert('Error', 'Please select at least one recipient');
      return;
    }

    // Validate scheduled date if scheduled rule is selected
    if (selectedRule === 'scheduled') {
      if (!scheduledDate || isDateTodayOrPast(scheduledDate)) {
        Alert.alert(
          'Error',
          'Please select a valid future date (tomorrow or later)',
        );
        return;
      }
    }

    // Prepare payload according to API expectations
    const payload = {
      treasureId: treasureId,
      recipientIds: recipientIds,
      releaseType: selectedRule, // 'estate_activation' or 'scheduled'
      releaseDate:
        selectedRule === 'scheduled' ? formatDateForAPI(scheduledDate) : null,
      recipients,
    };

    if (selectedRule === 'scheduled') {
      const releaseDate = formatDateForAPI(scheduledDate);
      if (!releaseDate) {
        Alert.alert('Error', 'Please select a valid date');
        return;
      }
      payload.releaseDate = releaseDate;
    }
    navigation.navigate('ReviewLegacy', { payload });
  };

  return (
    <SafeAreaView style={styles.masterContainer}>
      <HeaderBack title="Release Rules" />
      <ScrollView
        contentContainerStyle={styles.scrollLayout}
        showsVerticalScrollIndicator={false}
      >
        {/* SUBHEADER INSTRUCTIONS SUMMARY */}
        <View style={styles.instructionTextBlock}>
          <Title text="Legacy Step 2 of 3" size="xxlarge" />
          <AppText
            text="When should AfterWords deliver this treasure to your recipients?"
            size="medium"
            color="#A1A1AA"
            style={styles.stepDescStyle}
          />
        </View>

        {/* RULE OPTIONS HOUSING */}
        <View style={styles.optionsCardsStack}>
          {/* OPTION 1: UPON ESTATE ACTIVATION */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleSelectRule('estate_activation')}
            style={styles.touchableCardWrapper}
          >
            {selectedRule === 'estate_activation' ? (
              <LinearGradient
                colors={['#EAD9B5', '#C49753']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.activeGradientCard}
              >
                <Icon
                  name="shield"
                  size={20}
                  color="#C49753"
                  style={styles.cardIconPosition}
                />
                <View style={styles.cardTextContentColumn}>
                  <AppText
                    text="Upon Estate activation :"
                    size="medium"
                    weight="bold"
                    color="#1C1917"
                  />
                  <AppText
                    text="Released only after your account's verification protocol is officially activated by your Executors"
                    size="small"
                    color="#44403C"
                    style={styles.descriptionLineSpacing}
                  />
                </View>
              </LinearGradient>
            ) : (
              <View style={styles.inactiveBorderCard}>
                <Icon
                  name="shield"
                  size={20}
                  color="#C49753"
                  style={styles.cardIconPosition}
                />
                <View style={styles.cardTextContentColumn}>
                  <AppText
                    text="Upon Estate activation :"
                    size="medium"
                    weight="bold"
                    color="#C49753"
                  />
                  <AppText
                    text="Released only after your account's verification protocol is officially activated by your Executors"
                    size="small"
                    color="rgba(196, 151, 83, 0.7)"
                    style={styles.descriptionLineSpacing}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>

          {/* OPTION 2: TIME-BASED SCHEDULED ACTION */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleSelectRule('scheduled')}
            style={styles.touchableCardWrapper}
          >
            {selectedRule === 'scheduled' ? (
              <LinearGradient
                colors={['#EAD9B5', '#C49753']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.activeGradientCard}
              >
                <Icon
                  name="calendar"
                  size={20}
                  color="#C49753"
                  style={styles.cardIconPosition}
                />
                <View style={styles.cardTextContentColumn}>
                  <AppText
                    text="Time-Based (Scheduled) :"
                    size="medium"
                    weight="bold"
                    color="#1C1917"
                  />
                  <AppText
                    text="Released on a specific future date or milestone, independent of your estate status."
                    size="small"
                    color="#44403C"
                    style={styles.descriptionLineSpacing}
                  />

                  {/* INLINE DATE TRIGGER BADGE ROW */}
                  <TouchableOpacity
                    style={styles.inlineDatePickerBadge}
                    activeOpacity={0.8}
                    onPress={showDatepicker}
                  >
                    <AppText
                      text={formattedDate || 'mm/dd/yyyy'}
                      size="small"
                      weight="bold"
                      color={
                        formattedDate && formattedDate !== 'mm/dd/yyyy'
                          ? '#1C1917'
                          : 'rgba(28, 25, 23, 0.5)'
                      }
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            ) : (
              <View style={styles.inactiveBorderCard}>
                <Icon
                  name="calendar"
                  size={20}
                  color="#C49753"
                  style={styles.cardIconPosition}
                />
                <View style={styles.cardTextContentColumn}>
                  <AppText
                    text="Time-Based (Scheduled) :"
                    size="medium"
                    weight="bold"
                    color="#C49753"
                  />
                  <AppText
                    text="Released on a specific future date or milestone, independent of your estate status."
                    size="small"
                    color="rgba(196, 151, 83, 0.7)"
                    style={styles.descriptionLineSpacing}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>

          {/* Selected recipients summary */}
          {recipientIds && recipientIds.length > 0 && (
            <View style={styles.selectedSummaryContainer}>
              <AppText
                text={`${recipientIds.length} recipient${
                  recipientIds.length > 1 ? 's' : ''
                } selected`}
                size="small"
                color="#C59353"
              />
            </View>
          )}

          <Button
            title={isPending ? 'Creating...' : 'Review Legacy'}
            disabled={!isButtonEnabled || isPending}
            onPress={handleCreateLegacy}
          />
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      <DatePicker
        modal
        open={showDatePicker}
        date={scheduledDate}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
        minimumDate={getTomorrowDate()}
        title="Select Release Date"
        confirmText="Confirm"
        cancelText="Cancel"
        theme="dark"
        textColor="#FFFFFF"
        buttonColor="#C59353"
      />
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
    paddingHorizontal: Spacing.large,
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
    paddingHorizontal: Spacing.large,
    paddingTop: Spacing.medium,
    paddingBottom: Spacing.large,
    flexGrow: 1,
  },
  instructionTextBlock: {
    width: '100%',
    marginBottom: Responsive.height(32),
  },
  stepTitleStyle: {
    fontFamily: 'Georgia',
    marginBottom: Spacing.tiny,
  },
  stepDescStyle: {
    lineHeight: 20,
  },
  optionsCardsStack: {
    width: '100%',
    marginBottom: Responsive.height(40),
  },
  touchableCardWrapper: {
    width: '100%',
    marginBottom: Spacing.medium,
  },
  activeGradientCard: {
    width: '100%',
    borderRadius: Radius.xLarge || 24,
    padding: Spacing.large,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  inactiveBorderCard: {
    width: '100%',
    borderRadius: Radius.large || 24,
    borderWidth: 0.8,
    borderColor: 'rgba(197, 147, 83, 0.4)',
    backgroundColor: 'rgba(13, 13, 13, 0.6)',
    padding: Spacing.large,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardIconPosition: {
    marginTop: 2,
    marginRight: Spacing.medium,
  },
  cardTextContentColumn: {
    flex: 1,
  },
  descriptionLineSpacing: {
    marginTop: 6,
    lineHeight: 18,
  },
  inlineDatePickerBadge: {
    marginTop: Spacing.medium,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small - 2,
    borderRadius: Radius.large || 20,
    alignSelf: 'flex-start',
    minWidth: 120,
    alignItems: 'center',
  },
  selectedSummaryContainer: {
    alignItems: 'center',
    marginVertical: Responsive.height(12),
  },
  primarySubmitButton: {
    width: '100%',
    height: Responsive.height(54),
    borderRadius: Radius.large || 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  btnActiveBackground: {
    backgroundColor: '#DCA257',
  },
  btnDisabledBackground: {
    backgroundColor: '#444446',
  },
});
