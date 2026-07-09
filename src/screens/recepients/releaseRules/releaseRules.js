import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
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

export default function ReleaseRules({ navigation }) {
  const [selectedRule, setSelectedRule] = useState('estate');
  const [scheduledDate, setScheduledDate] = useState('03/11/2026'); // Example filled state

  const handleSelectRule = ruleType => {
    setSelectedRule(ruleType);
  };

  // Condition check to block or pass button submission access
  const isButtonEnabled =
    selectedRule === 'estate' ||
    (selectedRule === 'scheduled' &&
      scheduledDate &&
      scheduledDate !== 'mm/dd/yyyy');

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
            onPress={() => handleSelectRule('estate')}
            style={styles.touchableCardWrapper}
          >
            {selectedRule === 'estate' ? (
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

          {/* OPTION 2: TIME-BASED SCHEDULED ACTION MAP */}
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
                    onPress={() => {
                      // Implement your platform date picker logic trigger context here
                    }}
                  >
                    <AppText
                      text={scheduledDate || 'mm/dd/yyyy'}
                      size="small"
                      weight="bold"
                      color={
                        scheduledDate && scheduledDate !== 'mm/dd/yyyy'
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

          <Button
            title="Review Legacy"
            disabled={!isButtonEnabled}
            onPress={() => navigation?.navigate('ReviewLegacy')}
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
  primarySubmitButton: {
    width: '100%',
    height: Responsive.height(54),
    borderRadius: Radius.large || 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto', // Pushes button layout precisely to structural footer bottom
  },
  btnActiveBackground: {
    backgroundColor: '#DCA257',
  },
  btnDisabledBackground: {
    backgroundColor: '#444446',
  },
});
