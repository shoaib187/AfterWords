import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../components/typography/appText/appText';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../components/constants/styles';

import { FONT } from '../../components/constants/font';
import { COLORS } from '../../components/constants/color';
import Title from '../../components/typography/title/title';
import GradientBackground from '../../components/common/gradientBackground/gradientBackground';

// Mock data array directly mapping the items present in Screenshot 2026-06-08 at 4.34.27 PM.png
const RECENT_MEMORIES = [
  {
    id: '1',
    title: 'Words for Sofia on her wedding day',
    subtitle: 'Sofia · Scheduled',
    date: 'Jun 1',
    icon: 'videocam-outline',
  },
  {
    id: '2',
    title: 'My advice on money & life',
    subtitle: 'James · Private',
    date: 'May 28',
    icon: 'document-text-outline',
  },
  {
    id: '3',
    title: 'Family reunion photos 2025',
    subtitle: 'All · Shared',
    date: 'May 20',
    icon: 'image-outline',
  },
];

export default function Home({ navigation }) {
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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <GradientBackground />
      <View style={styles.topProfileBar}>
        <View style={styles.profileLeftSection}>
          <View style={styles.avatarCircle}>
            <AppText text="E" style={styles.avatarText} />
          </View>
          <View style={styles.profileTextWrapper}>
            <AppText text="Good Morning" style={styles.greetingText} />
            <Title text="Eleanor" style={styles.profileNameTitle} />
          </View>
        </View>

        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={handlePreservePress}
            style={styles.cardTouchWrapper}
          >
            <LinearGradient
              colors={['#F5EAD9', '#D5A760']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.preserveCard}
            >
              <View style={styles.plusIconCircle}>
                <Ionicons name="add" size={26} color="#FFFFFF" />
              </View>

              <AppText
                text="Preserve a new memory"
                style={styles.preserveCardTitle}
              />
              <AppText
                text="Record a video, voice note, or upload a document."
                style={styles.preserveCardDescription}
              />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* ── Recent Section Header ── */}
        <View style={styles.sectionHeaderRow}>
          <AppText text="RECENT" style={styles.sectionTitle} />
          <TouchableOpacity activeOpacity={0.7}>
            <AppText text="See all" style={styles.seeAllText} />
          </TouchableOpacity>
        </View>

        {/* ── Recent Memories List Layout ── */}
        <View style={styles.listContainer}>
          {RECENT_MEMORIES.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.listItemRow}
              activeOpacity={0.7}
            >
              <View style={styles.listItemLeftSection}>
                <View style={styles.itemIconSquare}>
                  <Ionicons
                    name={item.icon}
                    size={Responsive.width(22)}
                    color="#C59353"
                  />
                </View>
                <View style={styles.itemTextWrapper}>
                  <AppText text={item.title} numberOfLines={1} />
                  <AppText
                    text={item.subtitle}
                    fontFamily={FONT.TTForseRegular}
                    size="small"
                  />
                </View>
              </View>

              <View style={styles.listItemRightSection}>
                <AppText text={item.date} style={styles.itemDateText} />
                <Ionicons
                  name="lock-closed-outline"
                  size={Responsive.width(14)}
                  color={COLORS.WHITE}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  topProfileBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.medium || 12,
  },
  profileLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: Responsive.width(46),
    height: Responsive.width(46),
    borderRadius: Responsive.width(23),
    backgroundColor: '#C59353',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium || 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: FontSize.large || 18,
    fontFamily: 'Georgia',
    fontWeight: '600',
  },
  profileTextWrapper: {
    justifyContent: 'center',
  },

  profileNameTitle: {
    fontSize: FontSize.xLarge || 22,
    marginTop: -2,
  },
  notificationButton: {
    position: 'relative',
    padding: 4,
  },
  notificationDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E25C5C', // Red badge accent from mockup
  },
  scrollContent: {
    paddingHorizontal: Spacing.medium || 16,
    paddingTop: Spacing.small || 8,
    paddingBottom: Responsive.height(40),
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
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.medium || 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: FontSize.small || 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    fontFamily: FONT.TTForseBold,
  },
  seeAllText: {
    color: '#888888',
    fontSize: FontSize.small || 12,
    fontFamily: FONT.TTForseRegular,
  },
  listContainer: {
    width: '100%',
  },
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.medium || 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  listItemLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: Spacing.medium,
  },
  itemIconSquare: {
    width: Responsive.width(44),
    height: Responsive.width(44),
    borderRadius: Radius.large,
    backgroundColor: 'rgba(197, 147, 83, 0.08)',
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.medium || 12,
  },
  itemTextWrapper: {
    flex: 1,
  },
  itemTitle: {
    fontSize: FontSize.medium || 14,
    marginBottom: 3,
  },
  itemSubtitle: {
    fontSize: FontSize.small,
  },
  listItemRightSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  itemDateText: {
    color: '#888888',
    fontSize: FontSize.tiny || 11,
    fontFamily: FONT.TTForseRegular,
    marginBottom: 4,
  },
  lockIcon: {
    opacity: 0.7,
  },
});
