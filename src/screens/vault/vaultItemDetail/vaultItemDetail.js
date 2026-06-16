import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
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
import MemoryEditModal from '../../../components/vault/memoryEditModal/memoryEditModal';
import DeleteConfirmationModal from '../../../components/common/deleteModal/deleteModal';

export default function VaultItemDetail({ navigation, route }) {
  const [visible, setVisible] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const handleEdit = () => {
    console.log('Edit pressed');
    setVisible(true);
  };
  const handleReassign = () => console.log('Re-assign pressed');
  const handleDelete = () => {
    console.log('Delete pressed');
    setShowDelete(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(197, 147, 83, 0.25)', 'rgba(0, 0, 0, 0)']}
        style={styles.headerGlowBackground}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <HeaderBack title={'Vault item details'} />

      <View style={styles.safeAreaContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <LinearGradient
            colors={['#EEDBB2', '#CD974A']}
            style={styles.videoPreviewCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.sealedBadge}>
              <Icon
                name="lock"
                size={12}
                color="#EEDBB2"
                style={styles.inlineBadgeIcon}
              />
              <AppText
                text="Sealed"
                size="tiny"
                color="#EEDBB2"
                fontFamily={FONT.TTForseBold}
              />
            </View>

            {/* Centralized Play Trigger Button */}
            <TouchableOpacity
              style={styles.playCenterButton}
              activeOpacity={0.85}
            >
              <Icon
                name="play"
                size={28}
                color="#CD974A"
                style={styles.playIconOffset}
              />
            </TouchableOpacity>

            {/* Dynamic Duration Timestamp Bottom Badge */}
            <View style={styles.durationBadge}>
              <AppText
                text="4:32"
                size="tiny"
                color={COLORS.WHITE}
                fontFamily={FONT.TTForseMedium}
              />
            </View>
          </LinearGradient>

          <View style={styles.titleBlockWrapper}>
            <Title
              text="Words for Sofia on her wedding day"
              size="large"
              style={styles.serifItemTitle}
            />
            <AppText
              text="Video message · Recorded June 1, 2025"
              size="small"
              color="#A1A1AA"
              style={styles.itemMetaSubtitle}
            />
          </View>

          {/* ── Structured Detail Node Rows ── */}
          <View style={styles.infoCapsuleRow}>
            <Icon
              name="account-multiple-outline"
              size={Responsive.width(20)}
              color="#D5A760"
              style={styles.nodeLeftIcon}
            />
            <View style={styles.nodeMetaColumn}>
              <AppText text="Recipient" size="tiny" color="#A1A1AA" />
              <AppText
                text="Sofia Chen"
                size="medium"
                color={COLORS.WHITE}
                fontFamily={FONT.TTForseBold}
                style={styles.nodeMainValue}
              />
            </View>
          </View>

          <View style={styles.infoCapsuleRow}>
            <Icon
              name="clock-outline"
              size={20}
              color="#D5A760"
              style={styles.nodeLeftIcon}
            />
            <View style={styles.nodeMetaColumn}>
              <AppText text="Delivery" size="tiny" color="#A1A1AA" />
              <AppText
                text="Dec 25, 2026"
                size="medium"
                color={COLORS.WHITE}
                fontFamily={FONT.TTForseBold}
                style={styles.nodeMainValue}
              />
            </View>
          </View>

          <View style={styles.infoCapsuleRow}>
            <Icon
              name="lock-outline"
              size={20}
              color="#D5A760"
              style={styles.nodeLeftIcon}
            />
            <View style={styles.nodeMetaColumn}>
              <AppText text="Status" size="tiny" color="#A1A1AA" />
              <AppText
                text="Sealed · Not yet delivered"
                size="medium"
                color={COLORS.WHITE}
                fontFamily={FONT.TTForseBold}
                style={styles.nodeMainValue}
              />
            </View>
          </View>

          {/* ── Note To Self Asymmetric Block ── */}
          <LinearGradient
            colors={['rgba(238, 219, 178, 0.45)', 'rgba(197, 147, 83, 0.45)']}
            style={styles.noteToSelfCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <AppText
              text="Note to self"
              size="tiny"
              color="rgba(255, 255, 255, 0.5)"
              fontFamily={FONT.TTForseBold}
              style={styles.noteLabel}
            />
            <AppText
              text="“Record the part about the Sunday morning when she was seven — she’ll know what I mean. End with the poem.”"
              size="medium"
              color={COLORS.WHITE}
              fontFamily={FONT.TTForseMedium}
              style={styles.noteBodyQuote}
            />
          </LinearGradient>
        </ScrollView>
      </View>

      {/* ── Dynamic Floating Action Footer Bar ── */}
      <SafeAreaView style={styles.footerActionRowWrapper} edges={['bottom']}>
        <TouchableOpacity
          style={[styles.actionTabItem, styles.goldActionTab]}
          onPress={handleEdit}
          activeOpacity={0.8}
        >
          <Icon name="pencil-outline" size={22} color={COLORS.BLACK} />
          <AppText
            text="Edit"
            size="small"
            color={COLORS.BLACK}
            fontFamily={FONT.TTForseBold}
            style={styles.actionTabText}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionTabItem, styles.darkActionTab]}
          onPress={handleReassign}
          activeOpacity={0.8}
        >
          <Icon name="share-variant-outline" size={22} color="#D5A760" />
          <AppText
            text="Re-assign"
            size="small"
            color="#D5A760"
            fontFamily={FONT.TTForseMedium}
            style={styles.actionTabText}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionTabItem, styles.darkActionTab]}
          onPress={handleDelete}
          activeOpacity={0.8}
        >
          <Icon name="delete-outline" size={22} color="#F43F5E" />
          <AppText
            text="Delete"
            size="small"
            color="#F43F5E"
            fontFamily={FONT.TTForseMedium}
            style={styles.actionTabText}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <MemoryEditModal visible={visible} onClose={() => setVisible(!visible)} />
      <DeleteConfirmationModal
        visible={showDelete}
        onClose={() => setShowDelete(false)}
        itemName="Selected Item Name"
        onDelete={() => {
          Alert.alert('Delete', 'Item Deleted successfully');
        }}
      />
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
    height: Responsive.height(240),
    zIndex: 0,
  },
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
  },
  scrollContent: {
    paddingBottom: Responsive.height(32),
  },
  videoPreviewCard: {
    width: '100%',
    height: Responsive.height(160),
    borderRadius: Radius.xLarge,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginTop: Spacing.small,
    marginBottom: Responsive.height(28),
  },
  sealedBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  inlineBadgeIcon: {
    marginRight: 4,
  },
  playCenterButton: {
    width: Responsive.width(54),
    height: Responsive.width(54),
    borderRadius: Radius.circle,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(4px)',
  },
  playIconOffset: {
    marginLeft: 4,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  titleBlockWrapper: {
    width: '100%',
    marginBottom: Responsive.height(24),
  },
  serifItemTitle: {
    fontSize: FontSize.large,
    color: COLORS.WHITE,
    lineHeight: 30,
    marginBottom: 6,
  },
  itemMetaSubtitle: {
    opacity: 0.8,
    fontSize: FontSize.medium,
  },
  infoCapsuleRow: {
    width: '100%',
    height: Responsive.height(72),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.35)',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    marginBottom: Responsive.height(14),
  },
  nodeLeftIcon: {
    marginRight: Spacing.medium - 2,
  },
  nodeMetaColumn: {
    flex: 1,
  },
  nodeMainValue: {
    marginTop: 2,
    fontSize: 15,
  },
  noteToSelfCard: {
    width: '100%',
    borderRadius: 22,
    padding: Spacing.medium + 2,
    marginTop: Responsive.height(10),
  },
  noteLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  noteBodyQuote: {
    lineHeight: 22,
    fontFamily: FONT.TTForseItalic,
  },
  footerActionRowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium,
    marginBottom: Responsive.height(20),
    marginTop: 'auto',
  },
  actionTabItem: {
    width: '31%',
    height: Responsive.height(76),
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goldActionTab: {
    backgroundColor: '#CD974A',
  },
  darkActionTab: {
    backgroundColor: '#18181B',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  actionTabText: {
    marginTop: 6,
    fontSize: FontSize.medium,
  },
});
