import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { pick } from '@react-native-documents/picker';

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

export default function DocumentMessage({ navigation }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePickDocument = async () => {
    try {
      const result = await pick({
        allowMultiSelection: false,
        type: [
          'application/pdf',
          'image/*',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
      });

      console.log(result);
      setSelectedFile(result[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinue = () => {
    if (!selectedFile) {
      Alert.alert('Please choose a file before continuing');
      return;
    }
    navigation.navigate('FileDetails', { documentFile: selectedFile });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(197, 147, 83, 0.35)', 'rgba(0, 0, 0, 0)']}
        style={styles.headerGlowBackground}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <HeaderBack title={'Document'} />
      <ScrollView>
        <View style={styles.safeAreaContainer}>
          <Stepper />
          <View style={styles.sectionTitleRow}>
            <View style={styles.purpleStatusDot} />
            <AppText
              text="Upload a file or PDF"
              size="medium"
              fontFamily={FONT.TTForseSemiBold}
              color={COLORS.WHITE}
            />
          </View>

          {/* Main Document Browser Interactive Hub Dropzone */}
          <View style={styles.uploadHubContainer}>
            <TouchableOpacity
              style={styles.fileBrowserBox}
              onPress={handlePickDocument}
              activeOpacity={0.85}
            >
              <View style={styles.fileIconCircleBorder}>
                <Icon name="file-document-outline" size={28} color="#D5A760" />
              </View>

              <AppText
                text={selectedFile ? selectedFile.name : 'Browser Files'}
                size="medium"
                fontFamily={FONT.TTForseBold}
                color={COLORS.WHITE}
                style={styles.mainActionLabel}
              />

              <AppText
                text="PDF , JPG, PNG , DOCX"
                size="tiny"
                color="#A1A1AA"
                style={styles.supportedFormatsLabel}
              />
            </TouchableOpacity>
          </View>

          {/* End-To-End Security Info Notice Box Container */}
          <View style={styles.securityNoticeCard}>
            <AppText
              text="Documents uploaded here are encrypted end-to-end. We cannot read your files. Only you and your assigned recipients hold the decryption keys."
              size="small"
              color="#A1A1AA"
              style={styles.securityNoticeText}
            />
          </View>
        </View>
        <View style={styles.footerActionWrapper}>
          <Button
            title={selectedFile ? 'Continue' : 'Choose a file to Continue'}
            onPress={handleContinue}
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
    paddingHorizontal: Spacing.medium,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Responsive.height(16),
    marginBottom: Responsive.height(24),
  },
  purpleStatusDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.circle,
    backgroundColor: '#C084FC',
    marginRight: Spacing.small,
  },
  uploadHubContainer: {
    height: Responsive.height(340),
    width: '100%',
    marginBottom: Responsive.height(24),
  },
  fileBrowserBox: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#C59353',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.large,
  },
  fileIconCircleBorder: {
    width: Responsive.width(56),
    height: Responsive.width(56),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(213, 167, 96, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.medium,
    backgroundColor: 'rgba(213, 167, 96, 0.05)',
  },
  mainActionLabel: {
    marginBottom: 6,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  supportedFormatsLabel: {
    letterSpacing: 0.5,
    opacity: 0.8,
  },
  securityNoticeCard: {
    width: '100%',
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: Spacing.medium + 4,
    paddingHorizontal: Spacing.large,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityNoticeText: {
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: FONT.TTForseMedium,
    opacity: 0.9,
  },
  footerActionWrapper: {
    paddingHorizontal: Spacing.medium,
    marginVertical: Spacing.medium,
  },
});
