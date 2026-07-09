import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../../../components/typography/appText/appText';
import { FONT } from '../../../components/constants/font';
import Title from '../../../components/typography/title/title';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

export default function EstateExecutor({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Estate Executors'} />
      <GradientBackground />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoBannerBox}>
          <View style={styles.bannerTitleRow}>
            <Icon
              name="information-outline"
              size={Responsive.width(20)}
              color="#4ADE80"
              style={styles.infoIconGlow}
            />
            <Title
              text="Strictly Administrative Access"
              size="large"
              fontFamily={FONT.TTForseSemiBold}
            />
          </View>

          <AppText
            text="Executors have zero access to your private memories. They cannot read your letters or view your photos. Their sole capability is to report your passing and provide legal verification to initiate the automated release process."
            size="medium"
            fontFamily={FONT.TTForseRegular}
            color="#E4E4E7"
            style={styles.bannerBodyText}
          />
        </View>

        {/* Section Heading Header Label */}
        <AppText
          text="HIERARACHY ( MAX 3 0 )"
          size="tiny"
          color="#A1A1AA"
          style={styles.hierarchySectionHeader}
        />

        {/* ==========================================
            ROW 1: PRIMARY EXECUTOR (VERIFIED)
           ========================================== */}
        <View style={styles.executorCardBox}>
          <View style={styles.cardLeftBlock}>
            {/* Avatar Circle with vibrant rim accent */}
            <View style={[styles.avatarCircle, { borderColor: '#10B981' }]}>
              <Title text="J" size="medium" color="#10B981" />
            </View>

            <View style={styles.metaTextGroup}>
              <Title text="James" size="medium" color="#FFFFFF" />
              <Title
                text="Whitfield"
                size="medium"
                color="#FFFFFF"
                style={styles.lastNameLineHeight}
              />
            </View>
          </View>

          {/* Center Role Designation Tag Badge */}
          <View style={styles.roleTagBadge}>
            <AppText
              text="PRIMARY"
              size="tiny"
              color="#1C1917"
              align="center"
              style={styles.badgeLineFix}
            />
            <AppText
              text="EXECTCUTOR"
              size="tiny"
              color="#1C1917"
              align="center"
              style={styles.badgeLineFix}
            />
          </View>

          {/* Right Verification & Action Interface Status */}
          <View style={styles.cardRightStatusBlock}>
            <TouchableOpacity
              style={styles.actionIconButton}
              activeOpacity={0.7}
            >
              <Icon name="pencil-outline" size={18} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.statusInlineRow}>
              <Icon
                name="check"
                size={Responsive.width(13)}
                color="#10B981"
                style={styles.inlineCheckSpacing}
              />
              <AppText
                text="Verified"
                size="tiny"
                fontFamily={FONT.TTForseMedium}
                color="#10B981"
              />
            </View>
            <AppText
              text="Identity"
              size="tiny"
              fontFamily={FONT.TTForseMedium}
              color="#10B981"
              style={styles.statusSubTextOffset}
            />
          </View>
        </View>

        {/* ==========================================
            ROW 2: 1ST CONTINGENT (PENDING)
           ========================================== */}
        <View style={styles.executorCardBox}>
          <View style={styles.cardLeftBlock}>
            <View style={[styles.avatarCircle, { borderColor: '#10B981' }]}>
              <Title text="J" size="medium" color="#10B981" />
            </View>

            <View style={styles.metaTextGroup}>
              <Title text="Sara jenkins" size="medium" color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.roleTagBadge}>
            <AppText
              text="1ST"
              size="tiny"
              color="#1C1917"
              align="center"
              style={styles.badgeLineFix}
            />
            <AppText
              text="CONTINGENT"
              size="tiny"
              color="#1C1917"
              align="center"
              style={styles.badgeLineFix}
            />
          </View>

          <View style={styles.cardRightStatusBlock}>
            <TouchableOpacity
              style={styles.actionIconButton}
              activeOpacity={0.7}
            >
              <Icon name="pencil-outline" size={18} color="#FFFFFF" />
            </TouchableOpacity>

            <AppText
              text="Pending"
              size="tiny"
              fontFamily={FONT.TTForseMedium}
              color="#F59E0B"
              align="right"
            />
            <AppText
              text="Acceptance"
              size="tiny"
              fontFamily={FONT.TTForseMedium}
              color="#F59E0B"
              align="right"
              style={styles.statusSubTextOffset}
            />
          </View>
        </View>

        {/* ==========================================
            ROW 3: 2ND CONTINGENT (UNASSIGNED SLOT)
           ========================================== */}
        <View style={styles.executorCardBox}>
          <View style={styles.cardLeftBlock}>
            <View
              style={[
                styles.avatarCircle,
                {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  borderStyle: 'solid',
                },
              ]}
            >
              <Title
                text="3"
                size="medium"
                fontFamily={FONT.TTForseMedium}
                color="rgba(255, 255, 255, 0.4)"
              />
            </View>

            <View style={styles.metaTextGroup}>
              <Title
                text="Unassigned"
                size="medium"
                color="rgba(255, 255, 255, 0.8)"
              />
            </View>
          </View>

          <View style={styles.roleTagBadge}>
            <AppText
              text="2ST"
              size="tiny"
              color="#1C1917"
              align="center"
              style={styles.badgeLineFix}
            />
            <AppText
              text="CONTINGENT"
              size="tiny"
              color="#1C1917"
              align="center"
              style={styles.badgeLineFix}
            />
          </View>

          <View style={styles.cardRightStatusBlock}>
            <TouchableOpacity
              style={styles.assignInlineTextButton}
              activeOpacity={0.7}
            >
              <AppText text="Assign" size="small" color="#CD974A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Deep Dive Context Title */}
        <Title
          text="HOW THE RELEASE WORKS"
          size="medium"
          color="#EEDBB2"
          align="center"
          style={styles.bottomSectionHeadline}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK || '#000000',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium,
    height: Responsive.height(56),
  },
  backButtonTouch: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContainer: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.small,
    paddingBottom: Responsive.height(40),
  },
  infoBannerBox: {
    width: '100%',
    backgroundColor: 'rgba(21, 128, 61, 0.15)', // Deep administrative forest pine translucent overlay tint
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.25)',
    padding: Spacing.large - 4,
    marginBottom: Responsive.height(36),
  },
  bannerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.small - 2,
  },
  infoIconGlow: {
    marginRight: Spacing.small - 2,
  },
  bannerBodyText: {
    lineHeight: 20,
    opacity: 0.9,
  },
  hierarchySectionHeader: {
    letterSpacing: 1.4,
    marginBottom: Spacing.medium,
    paddingLeft: 2,
  },
  executorCardBox: {
    width: '100%',
    backgroundColor: '#050505',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.4)', // Signature visual fine frame border outline loop ring
    height: Responsive.height(104),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium + 2,
    marginBottom: Spacing.medium,
  },
  cardLeftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.2,
  },
  avatarCircle: {
    width: Responsive.width(46),
    height: Responsive.width(46),
    borderRadius: Responsive.width(23),
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.small,
  },
  metaTextGroup: {
    justifyContent: 'center',
    flex: 1,
  },
  lastNameLineHeight: {
    marginTop: -2,
  },
  roleTagBadge: {
    backgroundColor: '#D9A451',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: Radius.medium - 2,
    width: Responsive.width(78),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  badgeLineFix: {
    fontSize: 9,
    lineHeight: 11,
    letterSpacing: -0.1,
  },
  cardRightStatusBlock: {
    flex: 0.9,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
    paddingTop: Responsive.height(18),
  },
  actionIconButton: {
    position: 'absolute',
    top: Spacing.small,
    right: 2,
    width: 28,
    height: 28,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  statusInlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inlineCheckSpacing: {
    marginRight: 2,
    marginTop: 1,
  },
  statusSubTextOffset: {
    marginTop: 1,
  },
  assignInlineTextButton: {
    height: '100%',
    justifyContent: 'center',
    paddingLeft: Spacing.large,
  },
  bottomSectionHeadline: {
    letterSpacing: 1.5,
    marginTop: Responsive.height(44),
    marginBottom: Responsive.height(12),
  },
});
