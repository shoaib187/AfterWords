import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderWithSubtitle from '../../../components/common/headerWithSubtitle/headerWithSubtitle';
import AppText from '../../../components/typography/appText/appText';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import GradientWrapper from '../../../components/common/gradientWrapper/gradientWrapper';
import { Button } from '../../../components/common/button/button';
import { useLegacyGift } from '../../../hooks/useLegacy/useLegacy';

export default function GiftDetails({ navigation, route }) {
  const { type, id } = route?.params;

  const { data } = useLegacyGift(id);
  console.log('da', data);

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderWithSubtitle title={'A gift from'} subtitle={'James WhiteField'} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.screenTitle}>Words For Your Wedding Day</Text>
        <AppText text={'Status: Partially Viewed'} style={styles.statusText} />

        {/* Note Quote Box */}
        <View style={styles.quoteCard}>
          <AppText
            text={
              'This memory was created with love and delivered for this exactmoment. I wanted to be here with you today.'
            }
            style={styles.quoteText}
            size="tiny"
          />
        </View>

        {/* jab type family hogi tab */}
        {type === 'family' && (
          <GradientWrapper wrapperStyle={styles.releasedCard}>
            <View style={styles.releasedTextContainer}>
              <AppText text={'Interactive'} color={COLORS.BLACK} />
              <Text
                style={[styles.releasedTitle, { fontSize: FontSize.medium }]}
              >
                Explore the WhiteField
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('FamilyTree')}
              style={styles.watchButton}
              activeOpacity={0.8}
            >
              <Text style={styles.watchButtonText}>Explore </Text>
            </TouchableOpacity>
          </GradientWrapper>
        )}

        {/* Released Trigger Card */}
        <GradientWrapper wrapperStyle={styles.releasedCard}>
          <View style={styles.releasedTextContainer}>
            <AppText text={'Released Because'} color={COLORS.BLACK} />
            <Text style={styles.releasedTitle}>Your Wedding Day</Text>
          </View>
          <View style={styles.giftIconBadge}>
            <Ionicons
              name="gift-outline"
              size={Responsive.width(20)}
              color="#D1A354"
            />
          </View>
        </GradientWrapper>

        <Text style={[styles.statusText, { marginBottom: 12 }]}>
          Status: Partially Viewed
        </Text>

        <GradientWrapper wrapperStyle={styles.goldMediaCard}>
          <View style={styles.mediaIconBadgeLight}>
            <Ionicons
              name="videocam-outline"
              size={Responsive.width(22)}
              color="#E07A5F"
            />
          </View>
          <View style={styles.mediaTextContainer}>
            <Text style={styles.mediaTypeLabelGold}>Video</Text>
            <Text style={styles.mediaTitleGold}>
              My Advice for your marriage
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MessageDetails', { type: 'video' })
            }
            style={styles.watchButton}
            activeOpacity={0.8}
          >
            <Text style={styles.watchButtonText}>Watch</Text>
          </TouchableOpacity>
        </GradientWrapper>

        {/* Media Card 2: Gallery */}
        <View style={styles.darkMediaCard}>
          <View style={styles.mediaIconBadgeDark}>
            <Ionicons
              name="image-outline"
              size={Responsive.width(22)}
              color="#38D39F"
            />
          </View>
          <View style={styles.mediaTextContainer}>
            <Text style={styles.mediaTypeLabelDark}>Gallery</Text>
            <Text style={styles.mediaTitleDark}>Your Parents Wedding</Text>
            <Text style={styles.mediaSubtitleDark}>24 Photos</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MessageDetails', { type: 'documents' })
            }
            style={styles.goldActionButton}
            activeOpacity={0.8}
          >
            <Text style={styles.goldActionButtonText}>View</Text>
          </TouchableOpacity>
        </View>

        {/* Media Card 3: Letter */}
        <View style={styles.darkMediaCard}>
          <View style={styles.mediaIconBadgeDark}>
            <Ionicons
              name="document-text-outline"
              size={Responsive.width(22)}
              color="#D1A354"
            />
          </View>
          <View style={styles.mediaTextContainer}>
            <Text style={styles.mediaTypeLabelDark}>Letter</Text>
            <Text style={styles.mediaTitleDark} numberOfLines={1}>
              A Letter to My...
            </Text>
          </View>
          <TouchableOpacity style={styles.goldActionButton} activeOpacity={0.8}>
            <Text style={styles.goldActionButtonText}>Read</Text>
          </TouchableOpacity>
        </View>

        {/* Timeline Metadata Card */}
        <View style={styles.timelineCard}>
          <View style={styles.timelineRow}>
            <View style={[styles.dot, { backgroundColor: '#D8D8D8' }]} />
            <Text style={styles.timelineText}>
              Created <Text style={styles.boldText}>Aug 22, 2026</Text>
            </Text>
          </View>
          <View style={styles.timelineRow}>
            <View style={[styles.dot, { backgroundColor: '#D8D8D8' }]} />
            <Text style={styles.timelineText}>
              Released Trigger Met :{' '}
              <Text style={styles.boldText}>Wedding day</Text>
            </Text>
          </View>
          <View style={styles.timelineRow}>
            <View style={[styles.dot, { backgroundColor: '#D1A354' }]} />
            <Text style={styles.timelineText}>
              Delivered & Opened :{' '}
              <Text style={styles.boldText}>Today Open Ja...</Text>
            </Text>
          </View>
        </View>

        {/* buttons */}
        <View
          style={{
            flexDirection: 'row',
            gap: Spacing.small,
            marginVertical: Spacing.medium,
          }}
        >
          <View style={{ flex: 1 }}>
            <Button
              iconSize={34}
              style={{ height: 70, borderRadius: 12 }}
              leftIcon="bookmark-outline"
              flexDirection="column"
              title="Save Gift"
              textStyle={{ color: COLORS.BLACK }}
              iconColor={COLORS.BLACK}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              iconSize={34}
              style={{ height: 70, borderRadius: 12 }}
              leftIcon="download-outline"
              title="Save Gift"
              textStyle={{ color: COLORS.BLACK }}
              iconColor={COLORS.BLACK}
            />
          </View>
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
  scrollContent: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
    paddingBottom: 110,
  },
  screenTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'serif',
    marginBottom: 4,
  },
  statusText: {
    color: COLORS.GOLD,
    fontSize: FontSize.small,
    marginBottom: Spacing.medium,
  },
  quoteCard: {
    backgroundColor: '#262010',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3B301B',
  },
  quoteText: {
    color: COLORS.GOLD,
    textAlign: 'center',
  },
  releasedCard: {
    backgroundColor: '#D1A354',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  releasedTextContainer: {
    flex: 1,
  },
  releasedLabel: {
    color: COLORS.BLACK,
    fontSize: 12,
    marginBottom: 4,
  },
  releasedTitle: {
    color: '#000000',
    fontSize: 22,
    fontFamily: 'serif',
  },
  giftIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Gold Media Card (Video) */
  goldMediaCard: {
    backgroundColor: '#D1A354',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mediaIconBadgeLight: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mediaTextContainer: {
    flex: 1,
  },
  mediaTypeLabelGold: {
    color: '#666666',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  mediaTitleGold: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  watchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small - 4,
    borderRadius: Radius.xLarge,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  watchButtonText: {
    color: '#3B2A10',
    fontSize: 13,
    fontWeight: '600',
  },
  /* Dark Media Card (Gallery & Letter) */
  darkMediaCard: {
    backgroundColor: '#000000',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#3B301B',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mediaIconBadgeDark: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#3B301B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mediaTypeLabelDark: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 2,
  },
  mediaTitleDark: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  mediaSubtitleDark: {
    color: '#888888',
    fontSize: 12,
    marginTop: 2,
  },
  goldActionButton: {
    backgroundColor: '#D1A354',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.tiny,
    borderRadius: Radius.large,
    // position: 'absolute',
    // bottom: Spacing.small,
    // right: Spacing.small,
  },
  goldActionButtonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '600',
  },
  /* Timeline Card */
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginTop: 8,
    gap: 12,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  timelineText: {
    color: '#333333',
    fontSize: 13,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  /* Bottom Navigation */
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    height: 64,
    backgroundColor: '#0A0A0A',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#3B301B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabBackground: {
    backgroundColor: '#D1A354',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    color: '#888888',
    fontSize: 10,
    marginTop: 2,
  },
  activeNavLabel: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  fabContainer: {
    top: -18,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#C8933A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000000',
  },
});
