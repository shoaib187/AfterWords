import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';

import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { FONT } from '../../../components/constants/font';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import Stepper from '../../../components/messages/stepper/stepper';
import { Button } from '../../../components/common/button/button';

export default function PhotoMessage({ navigation }) {
  const [photoUri, setPhotoUri] = useState(null);

  const handleChoosePhoto = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setPhotoUri(response.assets[0].uri);
      }
    });
  };

  const handleContinue = () => {
    if (!photoUri) {
      console.log('Please select a photo before continuing');
      return;
    }
    navigation.navigate('PhotoMessagePreview', { photoUri });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(197, 147, 83, 0.35)', 'rgba(0, 0, 0, 0)']}
        style={styles.headerGlowBackground}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <HeaderBack title={'New Photo Memory'} />
      <View style={styles.safeAreaContainer}>
        <Stepper />

        <View style={styles.sectionTitleRow}>
          <View style={styles.purpleStatusDot} />
          <AppText
            text="Upload a photo"
            size="medium"
            fontFamily={FONT.TTForseSemiBold}
            color={COLORS.WHITE}
          />
        </View>

        <View style={styles.uploadHubContainer}>
          <TouchableOpacity
            style={styles.giantCircularTrackRing}
            onPress={handleChoosePhoto}
            activeOpacity={0.9}
          >
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                style={styles.selectedPhotoPreview}
              />
            ) : (
              <View style={styles.interactiveInnerContainer}>
                <Icon
                  name="image-outline"
                  size={36}
                  color="#A1A1AA"
                  style={styles.imagePlaceholderIcon}
                />
                <AppText
                  text="Tap to upload a Photo"
                  size="medium"
                  fontFamily={FONT.TTForseBold}
                  color={COLORS.WHITE}
                  style={styles.statusLabelText}
                />
                <AppText
                  text="Upload from Camera Roll"
                  size="small"
                  color="#A78BFA"
                  style={styles.purpleActionLink}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: Spacing.medium }}>
        <Button title={'Continue'} onPress={handleContinue} />
      </View>
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
    zIndex: 0, // Guarantees background elements can't overlap rendering layouts
  },
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Responsive.height(16),
    marginBottom: Responsive.height(16),
  },
  purpleStatusDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.circle,
    backgroundColor: '#C084FC',
    marginRight: Spacing.small,
  },
  uploadHubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  giantCircularTrackRing: {
    width: Responsive.width(310),
    height: Responsive.width(310),
    borderRadius: Radius.circle,
    borderWidth: 2,
    borderColor: '#C59353',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    overflow: 'hidden',
  },
  interactiveInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.medium,
  },
  imagePlaceholderIcon: {
    marginBottom: Spacing.medium,
  },
  statusLabelText: {
    letterSpacing: 0.3,
    marginBottom: Spacing.small,
    textAlign: 'center',
  },
  purpleActionLink: {
    letterSpacing: 0.2,
    textDecorationLine: 'none',
  },
  selectedPhotoPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  footerActionWrapper: {
    paddingHorizontal: Spacing.medium,
    marginBottom: Responsive.height(24), // Perfectly metrics matching alignment parameters
  },
});
