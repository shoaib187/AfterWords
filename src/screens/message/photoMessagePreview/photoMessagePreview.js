import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { FONT } from '../../../components/constants/font';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import Stepper from '../../../components/messages/stepper/stepper';
import { Button } from '../../../components/common/button/button';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

export default function PhotoMessagePreview({ navigation, route }) {
  const [people, setPeople] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [story, setStory] = useState('');

  // Fallback to placeholder image asset if parameter pass is empty
  const photoUri = route?.params?.photoUri || null;

  const handleContinue = () => {
    navigation.navigate('AddMessageDetails', {
      photoUri,
      metaData: { people, date, location, story },
      messageType: 'photo',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderBack title={'New Photo Memory'} />

      <View style={styles.safeAreaContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.sectionTitleRow}>
            <View style={styles.purpleStatusDot} />
            <AppText
              text="Share a photo collection"
              size="medium"
              fontFamily={FONT.TTForseSemiBold}
              color={COLORS.WHITE}
            />
          </View>

          {/* Render Selected Image Preview Window */}
          <View style={styles.imageContainerFrame}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.previewImage} />
            ) : (
              <Image
                source={{
                  uri: 'https://i.pinimg.com/originals/1b/0c/8e/1b0c8e5a9d2a3c9fbbacfa4caa7e7fbb.png',
                }}
                style={styles.previewImage}
              />
            )}
          </View>
        </ScrollView>
      </View>

      {/* Action Footer Button Container */}
      <SafeAreaView style={styles.footerActionWrapper} edges={['bottom']}>
        <Button title={'Continue'} onPress={handleContinue} />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  headerGlowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(260),
    zIndex: 0,
  },
  safeAreaContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Responsive.height(20),
    paddingHorizontal: Spacing.medium,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Responsive.height(16),
    marginBottom: Responsive.height(20),
  },
  purpleStatusDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.circle,
    backgroundColor: '#C084FC',
    marginRight: Spacing.small,
  },
  imageContainerFrame: {
    width: '100%',
    height: Responsive.height(230),
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: Responsive.height(28),
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsHeading: {
    fontSize: FontSize.xLarge,
    color: COLORS.WHITE,
    marginBottom: Responsive.height(20),
  },
  inputFieldBlock: {
    marginBottom: Responsive.height(20),
  },
  fieldLabel: {
    marginBottom: 10,
    paddingLeft: 4,
  },
  singleLineInput: {
    height: Responsive.height(58),
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    color: COLORS.WHITE,
    paddingHorizontal: Spacing.medium,
    fontSize: FontSize.medium,
  },
  splitRowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Responsive.height(20),
  },
  halfWidthBlock: {
    width: '48%',
  },
  multilineStoryInput: {
    width: '100%',
    height: Responsive.height(110),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C59353',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    color: COLORS.WHITE,
    padding: Spacing.medium,
    fontSize: 14,
    fontFamily: FONT.TTForseMedium,
    lineHeight: 20,
  },
  footerActionWrapper: {
    paddingHorizontal: Spacing.medium,
    marginBottom: Responsive.height(20),
  },
});
