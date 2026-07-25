import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../../components/typography/appText/appText';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import Title from '../../../components/typography/title/title';
import Subtitle from '../../../components/typography/subtitle/subtitle';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import { COLORS } from '../../../components/constants/color';
import GradientWrapper from '../../../components/common/gradientWrapper/gradientWrapper';

// Strict structural mapping of the choice matrices from Screenshot 2026-06-08 at 4.48.02 PM.png
const PRESERVE_OPTIONS = [
  {
    id: 'video',
    title: 'Video Message',
    description: 'Record or upload a video',
    iconName: 'videocam',
    iconColor: '#FF6B6B',
    bgColor: 'rgba(255, 107, 107, 0.08)',
    route: 'VideoMessageRecorder',
  },
  {
    id: 'voice',
    title: 'Voice Message',
    description: 'Record your voice',
    iconName: 'mic',
    iconColor: '#A55EEA',
    bgColor: 'rgba(165, 94, 234, 0.08)',
    route: 'VoiceMessageRecorder',
  },
  {
    id: 'photo',
    title: 'Photo Gallery',
    description: 'Share a photo collection',
    iconName: 'images',
    iconColor: '#26DE81',
    bgColor: 'rgba(38, 222, 129, 0.08)',
    route: 'PhotoMessage',
  },
  {
    id: 'document',
    title: 'Document',
    description: 'Upload a file or PDF',
    iconName: 'document-text',
    iconColor: '#FED330',
    bgColor: 'rgba(254, 211, 48, 0.08)',
    route: 'DocumentMessage',
  },
];

export default function CreateTreasure({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePreservePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
        friction: 6,
        tension: 50,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
        tension: 50,
      }),
    ]).start();
    navigation.navigate('CreateLegacy');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Create Treasure'} />
      <GradientBackground />

      <View style={styles.contentWrapper}>
        {/* ── Main Serif Layout Heading Header ── */}
        <View style={styles.headerTextContainer}>
          <Title text="What Would" style={styles.mainTitleSerif} />
          <Title text="you like to" style={styles.mainTitleSerif} />
          <Title text="Preserve today?" style={styles.mainTitleSerif} />
        </View>
        {!PRESERVE_OPTIONS && (
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={handlePreservePress}
              style={styles.cardTouchWrapper}
            >
              <GradientWrapper
                wrapperStyle={{
                  alignItems: 'center',
                  paddingVertical: Spacing.xLarge,
                }}
              >
                <View style={styles.plusIconCircle}>
                  <Ionicons
                    name="add"
                    size={Responsive.width(26)}
                    color="#FFFFFF"
                  />
                </View>

                <AppText
                  text="Preserve a new memory"
                  style={styles.preserveCardTitle}
                />
                <AppText
                  text="Record a video, voice note, or upload a document."
                  style={styles.preserveCardDescription}
                />
              </GradientWrapper>
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={styles.gridContainer}>
          {PRESERVE_OPTIONS.map(option => (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.8}
              style={styles.gridCard}
              onPress={() => {
                navigation.navigate(option?.route);
              }}
            >
              {/* Specific unique colored asset bounding boxes */}
              <View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: option.bgColor },
                ]}
              >
                <Ionicons
                  name={option.iconName}
                  size={Responsive.width(22)}
                  color={option.iconColor}
                />
              </View>

              <AppText text={option.title} style={styles.cardTitleText} />
              <Subtitle text={option.description} style={styles.cardDescText} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  ambientTopGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(260),
    zIndex: -1,
  },
  safeArea: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
    justifyContent: 'center',
  },
  headerTextContainer: {
    marginBottom: Responsive.height(48),
  },
  mainTitleSerif: {
    fontSize: FontSize.xxLarge || 32,
    lineHeight: (FontSize.xxLarge || 32) * 1.25,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  gridCard: {
    width: '47.5%', // Guarantees crisp symmetric inline space gutter splits
    aspectRatio: 1.05, // Keeps cards matching the elegant squat look
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.35)', // Warm gold border stroke framework mapping
    borderRadius: Radius.xLarge || 20,
    padding: Spacing.medium || 16,
    marginBottom: Responsive.height(20),
    justifyContent: 'center',
  },
  iconWrapper: {
    width: Responsive.width(42),
    height: Responsive.width(42),
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.medium,
  },
  cardTitleText: {
    marginBottom: 4,
  },
  cardDescText: {
    fontSize: FontSize.small,
  },

  cardTouchWrapper: {
    borderRadius: Radius.xLarge,
    marginBottom: Responsive.height(36),
  },
  preserveCard: {
    width: '100%',
    borderRadius: Radius.full,
    paddingVertical: Spacing.large,
    paddingHorizontal: Spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIconCircle: {
    width: Responsive.width(48),
    height: Responsive.width(48),
    borderRadius: Radius.full * 3,
    backgroundColor: '#D4A843',
    borderWidth: 1.5,
    borderColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.medium || 12,
    elevation: 10,
  },
  preserveCardTitle: {
    fontSize: FontSize.large,
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  preserveCardDescription: {
    fontSize: FontSize.small || 12,
    color: COLORS.BLACK,
    textAlign: 'center',
    opacity: 0.8,
  },
});
