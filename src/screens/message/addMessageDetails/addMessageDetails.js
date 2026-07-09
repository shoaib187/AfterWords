import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import InputField from '../../../components/common/inputField/inputField';
import { Button } from '../../../components/common/button/button';
import { COLORS } from '../../../components/constants/color';
import { Spacing, Responsive } from '../../../components/constants/styles';
import Description from '../../../components/common/description/description';

export default function AddMessageDetails({ navigation, route }) {
  const { messageType } = route?.params || {};
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <GradientBackground />

      <HeaderBack title="Add message details" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Title text={'Add Details'} style={styles.title} />
          <AppText
            text="Help Organize your treasure"
            size="medium"
            color={COLORS.GREY_400}
            style={styles.subtitle}
          />
        </View>
        <View style={styles.formContainer}>
          <InputField
            label="Title"
            placeholder="Advice for ..."
            containerStyle={styles.inputContainer}
          />

          <InputField
            label="Label (optional)"
            placeholder="Life lesson"
            containerStyle={styles.inputContainer}
          />

          <Description
            label="Description (optional)"
            placeholder="Life lesson"
            multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Review Treasure"
            onPress={() => navigation?.navigate('Review', { messageType })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.large,
    paddingBottom: Spacing.xLarge * 2,
  },
  headerContainer: {
    marginTop: Spacing.medium,
    marginBottom: Spacing.xLarge,
  },
  title: {
    marginBottom: Spacing.small,
  },
  subtitle: {
    opacity: 0.7,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: Spacing.medium,
  },
  buttonContainer: {
    marginTop: Spacing.xLarge,
    width: '100%',
  },
  reviewButton: {
    width: '100%',
    backgroundColor: '#DCA257',
    borderRadius: 27,
    height: Responsive.height(54),
  },
});
