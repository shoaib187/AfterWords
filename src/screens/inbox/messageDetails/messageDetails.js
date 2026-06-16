import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Responsive, Spacing } from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import { FONT } from '../../../components/constants/font';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import DocumentDownloadCard from '../../../components/common/documentDownloadCard/documentDownloadCard';

export default function MessageDetails({ navigation, route }) {
  const { type } = route?.params;
  console.log('type', type);

  const handlePlayVideo = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(197, 147, 83, 0.2)', 'rgba(0, 0, 0, 0)']}
        style={styles.ambientGlow}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <HeaderBack title={'Message Details'} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {type === 'documents' ? (
          <DocumentDownloadCard />
        ) : (
          <View style={styles.videoCardFrame}>
            <ImageBackground
              source={{
                uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
              }}
              style={styles.videoPreviewImage}
              imageStyle={styles.imageRadius}
            >
              {/* Centered Play Button Hub */}
              <TouchableOpacity
                style={styles.playButtonCircle}
                onPress={handlePlayVideo}
                activeOpacity={0.85}
              >
                <Icon
                  name="play"
                  size={Responsive.width(42)}
                  color="#FFFFFF"
                  style={styles.playIconOffset}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}

        {/* Title Content Block */}
        <View style={styles.titleMetaContainer}>
          <Title text={'Advice for your wedding day'} size="xLarge" />
          <AppText text={'Recorded Oct 24, 2025'} color={COLORS.GOLD} />
        </View>

        <View style={styles.messageBodyContainer}>
          <AppText
            text={
              'I might not be there in person, but I wanted to make sure you had these thoughts on your special day. I am so unbelievably proud of the woman you’ve become. Remember to always communicate, even when it’s hard...'
            }
            style={styles.proseParagraphText}
          />
        </View>

        {/* Traditional Complimentary Sign-off Block */}
        <View style={styles.signatureContainer}>
          <AppText text={'With Love'} style={styles.withLoveLabel} />
          <Title text={'James Whitfield'} style={styles.signerNameText} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK || '#000000',
  },
  ambientGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(240),
    zIndex: 0,
  },
  scrollContent: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.small,
    paddingBottom: Responsive.height(40),
  },
  videoCardFrame: {
    width: '100%',
    aspectRatio: 1.38, // Perfectly maintains the image framing dimension matrix
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#C59353', // Signature fine metallic gold frame border edge
    backgroundColor: '#121214',
    overflow: 'hidden',
    marginBottom: Responsive.height(36),
  },
  videoPreviewImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageRadius: {
    borderRadius: 26,
  },
  playButtonCircle: {
    width: Responsive.width(68),
    height: Responsive.width(68),
    borderRadius: Responsive.width(34),
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(4px)',
  },
  playIconOffset: {
    marginLeft: 4, // Centers the vector triangle within the container geometrically
  },
  titleMetaContainer: {
    width: '100%',
    marginBottom: Responsive.height(32),
  },
  mainTitleText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: FONT.TTForseBold || 'serif',
    lineHeight: 36,
    marginBottom: 8,
  },
  dateStampText: {
    color: '#CD974A', // Subdued dynamic secondary accent tone
    fontSize: 13,
    fontFamily: FONT.TTForseBold || 'sans-serif-medium',
    letterSpacing: 0.2,
  },
  messageBodyContainer: {
    width: '100%',
    marginBottom: Responsive.height(44),
  },
  proseParagraphText: {
    color: '#E4E4E7', // Crisp legible cream off-white structure
    fontSize: 17,
    fontFamily: FONT.TTForseRegular || 'serif',
    lineHeight: 28, // Open line height for deep, elegant letter prose readability
  },
  signatureContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  withLoveLabel: {
    color: '#CD974A',
    fontSize: 13,
    fontFamily: FONT.TTForseBold || 'sans-serif-medium',
    marginBottom: 10,
  },
  signerNameText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: FONT.TTForseBold || 'serif',
    letterSpacing: 0.3,
  },
});
