import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import { FONT } from '../../../components/constants/font';
import AppText from '../../../components/typography/appText/appText';
import Title from '../../../components/typography/title/title';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

// Complete mock data accurately mirroring Screenshot 2026-06-15 at 10.45.09 AM.png
const GIFT_DATA = [
  {
    id: 'g1',
    category: 'Message',
    title: 'Words for Sofia on her wedding day',
    meta: 'Recorded: Dec 25, 2026',
    icon: 'video-outline',
    color: '#F43F5E', // Rose/Crimson
    tab: 'messages',
  },
  {
    id: 'g2',
    category: 'Gallery',
    title: 'Family reunion — Lake Tahoe',
    meta: 'Uploaded: 13- Oct- 1994',
    icon: 'image-outline',
    color: '#10B981', // Emerald Green
    hasClockIcon: true,
    tab: 'gallery',
  },
  {
    id: 'g3',
    category: 'Documents',
    title: 'Lakehouse Property Deed & Instructions',
    meta: 'Uploaded 15- Oct-2025',
    icon: 'file-document-outline',
    color: '#F59E0B', // Amber Gold
    tab: 'documents',
  },
  {
    id: 'g4',
    category: 'Family History',
    title: 'The Whitfield Ancestry & Origins',
    meta: 'Uploaded 01- Nov - 2024',
    icon: 'account-outline',
    color: '#A855F7', // Purple
    tab: 'history',
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Gifts' },
  { id: 'messages', label: 'Messages' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'documents', label: 'Documents' },
];

export default function GiftsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredGifts = GIFT_DATA.filter(
    item => activeTab === 'all' || item.tab === activeTab,
  );

  const renderGiftItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MessageDetails', { type: item?.tab })}
      style={styles.giftItemRow}
      activeOpacity={0.75}
    >
      <View
        style={[
          styles.iconContainer,
          {
            borderColor: `${item.color}40`, // 25% Opacity Border
            backgroundColor: `${item.color}0B`, // ~4% Opacity Fill
          },
        ]}
      >
        <Icon name={item.icon} size={24} color={item.color} />
      </View>

      <View style={styles.metaColumn}>
        <AppText text={item.category} style={styles.categoryLabelText} />
        <Title text={item.title} style={styles.itemTitleText} />

        <View style={styles.metaLineRow}>
          {item.hasClockIcon && (
            <Icon
              name="clock-time-four-outline"
              size={Responsive.width(13)}
              color={item.color}
              style={styles.inlineClockIcon}
            />
          )}
          <AppText
            text={item.meta}
            style={[
              styles.metaDateText,
              item.hasClockIcon && { color: item.color, marginLeft: 4 },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderBack title={'Legacy Inbox'} />
      <View style={styles.headerProfileBlock}>
        <AppText text={'A Gift From'} style={styles.giftFromSubText} />
        <Title text={'James Whitfield'} style={styles.senderNameText} />
        <AppText text={'Grandfather'} style={styles.relationshipText} />
      </View>

      {/* Horizontal Filtering Capsule List */}
      <View style={styles.filterBarWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContainer}
        >
          {FILTER_TABS.map(tab => {
            const isSelected = activeTab === tab.id;
            return isSelected ? (
              <LinearGradient
                key={tab.id}
                colors={['#EEDBB2', '#CD974A']}
                style={styles.activeTabGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <TouchableOpacity
                  onPress={() => setActiveTab(tab.id)}
                  activeOpacity={0.9}
                  style={styles.tabButtonInner}
                >
                  <AppText text={tab.label} style={styles.activeTabText} />
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.7}
                style={styles.inactiveTabCapsule}
              >
                <AppText text={tab.label} style={styles.inactiveTabText} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Dynamic List Pipeline Feed */}
      <FlatList
        data={filteredGifts}
        keyExtractor={item => item.id}
        renderItem={renderGiftItem}
        contentContainerStyle={styles.listContentContainer}
        ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  ambientGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(280),
    zIndex: 0,
  },
  headerProfileBlock: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Responsive.height(32),
    marginBottom: Responsive.height(36),
  },
  giftFromSubText: {
    color: '#FFFFFF',
    opacity: 0.9,
    fontSize: 15,
    fontFamily: FONT.TTForseMedium || 'sans-serif-medium',
    marginBottom: 6,
  },
  senderNameText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: FONT.TTForseBold || 'serif',
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  relationshipText: {
    color: '#C59353', // Golden relationship label tint
    fontSize: 14,
    fontFamily: FONT.TTForseBold || 'sans-serif-medium',
    letterSpacing: 0.5,
  },
  filterBarWrapper: {
    marginBottom: Spacing.large,
  },
  filterScrollContainer: {
    paddingHorizontal: Spacing.medium,
    gap: Spacing.small + 2,
  },
  activeTabGradient: {
    borderRadius: Radius.full || 24,
    padding: 1, // Crisp ring alignment layout wrapper
  },
  tabButtonInner: {
    paddingHorizontal: 24,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Radius.full || 24,
  },
  activeTabText: {
    color: '#1C1917', // Dark contrast code matching capsule fill text
    fontSize: 14,
    fontFamily: FONT.TTForseBold,
  },
  inactiveTabCapsule: {
    paddingHorizontal: 24,
    height: 44,
    borderRadius: Radius.full || 24,
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.4)', // Muted premium gold layout ring
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveTabText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: FONT.TTForseMedium,
  },
  listContentContainer: {
    paddingHorizontal: Spacing.medium,
    paddingBottom: Responsive.height(32),
  },
  giftItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.medium + 2,
  },
  iconContainer: {
    width: Responsive.width(54),
    height: Responsive.width(54),
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium + 2,
  },
  metaColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryLabelText: {
    color: '#A1A1AA', // Slate secondary labeling string
    fontSize: 12,
    fontFamily: FONT.TTForseRegular,
    marginBottom: 3,
  },
  itemTitleText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: FONT.TTForseBold,
    lineHeight: 20,
    marginBottom: 5,
  },
  metaLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineClockIcon: {
    marginTop: 1,
  },
  metaDateText: {
    color: '#71717A', // Tertiary timestamp dark tint string
    fontSize: 12,
    fontFamily: FONT.TTForseRegular,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    width: '100%',
  },
});
