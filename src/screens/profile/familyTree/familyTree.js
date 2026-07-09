import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Path } from 'react-native-svg';

import HeaderBack from '../../../components/common/headerBack/headerBack';
import AppText from '../../../components/typography/appText/appText';
import { FONT } from '../../../components/constants/font';
import Title from '../../../components/typography/title/title';
import {
  Responsive,
  Spacing,
  Radius,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';

export default function FamilyTree({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title="Family Tree" />
      <GradientBackground />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#EEDBB2', '#CD974A']}
          style={styles.treeCanvasCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Generation Identifier Labels Column */}
          <View style={styles.generationLabelsColumn}>
            <AppText
              text="YOU"
              size="tiny"
              fontFamily={FONT.TTForseSemiBold}
              color="rgba(28, 25, 23, 0.4)"
            />
            <AppText
              text="GEN 2"
              size="tiny"
              fontFamily={FONT.TTForseSemiBold}
              color="rgba(28, 25, 23, 0.4)"
              style={styles.gen2LabelPosition}
            />
            <AppText
              text="GEN 3"
              size="tiny"
              fontFamily={FONT.TTForseSemiBold}
              color="rgba(28, 25, 23, 0.4)"
              style={styles.gen3LabelPosition}
            />
          </View>

          {/* Root Ancestor (YOU) - Eleanor */}
          <View style={styles.rootNodeAnchor}>
            <View style={styles.eleanorOuterRing}>
              <View style={styles.eleanorInnerCircle}>
                <Title
                  text="E"
                  size="medium"
                  fontFamily={FONT.TTForseSemiBold}
                  color="#1C1917"
                />
              </View>
            </View>
            <AppText
              text="Eleanor"
              size="tiny"
              fontFamily={FONT.TTForseSemiBold}
              color="#1C1917"
              style={styles.nodeTextLabel}
            />
            <AppText
              text="You"
              size="tiny"
              fontFamily={FONT.TTForseRegular}
              color="rgba(28, 25, 23, 0.6)"
            />
          </View>

          {/* SVG Vector Paths for Family Links */}
          <View style={styles.svgAbsoluteContainer}>
            <Svg height="100%" width="100%" viewBox="0 0 300 120">
              {/* Path layout logic linking down to James, Sofia, and Marcus */}
              <Path
                d="M150,5 C150,45 80,30 80,70"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <Path
                d="M150,5 L150,70"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <Path
                d="M150,5 C150,45 230,30 230,70"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              {/* Line path splitting from James down to Lily (Gen 3) */}
              <Path
                d="M80,75 C80,105 45,95 45,115"
                fill="none"
                stroke="rgba(28, 25, 23, 0.3)"
                strokeWidth="1.2"
                strokeDasharray="3,3"
              />
            </Svg>
          </View>

          {/* Descendant Interactive Node Rows */}
          <View style={styles.nodesHorizontalRow}>
            {/* James Cluster (With grandchild Lily tied underneath) */}
            <View style={styles.verticalNodeGroup}>
              <View
                style={[
                  styles.nodeCircleBase,
                  { borderColor: '#4ADE80', backgroundColor: '#DCFCE7' },
                ]}
              >
                <Title
                  text="J"
                  size="small"
                  fontFamily={FONT.TTForseSemiBold}
                  color="#15803D"
                />
              </View>
              <AppText
                text="James"
                size="tiny"
                fontFamily={FONT.TTForseSemiBold}
                color="#1C1917"
                style={styles.nodeTextLabel}
              />
              <AppText
                text="Son"
                size="tiny"
                fontFamily={FONT.TTForseRegular}
                color="rgba(28, 25, 23, 0.6)"
              />

              {/* Gen 3 Nested Node: Lily */}
              <View style={styles.grandchildOffsetNode}>
                <View style={[styles.nodeCircleBase, styles.lilyCircleSize]}>
                  <Title
                    text="L"
                    size="tiny"
                    fontFamily={FONT.TTForseSemiBold}
                    color="#71717A"
                  />
                </View>
                <AppText
                  text="Lily"
                  size="tiny"
                  fontFamily={FONT.TTForseSemiBold}
                  color="#1C1917"
                  style={styles.nodeTextLabel}
                />
                <AppText
                  text="Granddaughter"
                  size="tiny"
                  fontFamily={FONT.TTForseRegular}
                  color="rgba(28, 25, 23, 0.6)"
                  align="center"
                  numberOfLines={2}
                  style={styles.multilineFix}
                />
              </View>
            </View>

            {/* Sofia Node Cluster */}
            <View style={styles.verticalNodeGroup}>
              <View
                style={[
                  styles.nodeCircleBase,
                  { borderColor: '#F472B6', backgroundColor: '#FCE7F3' },
                ]}
              >
                <Title
                  text="S"
                  size="small"
                  fontFamily={FONT.TTForseSemiBold}
                  color="#B91C1C"
                />
              </View>
              <AppText
                text="Sofia"
                size="tiny"
                fontFamily={FONT.TTForseSemiBold}
                color="#1C1917"
                style={styles.nodeTextLabel}
              />
              <AppText
                text="Daughter"
                size="tiny"
                fontFamily={FONT.TTForseRegular}
                color="rgba(28, 25, 23, 0.6)"
              />
            </View>

            {/* Marcus Node Cluster */}
            <View style={styles.verticalNodeGroup}>
              <View
                style={[
                  styles.nodeCircleBase,
                  { borderColor: '#818CF8', backgroundColor: '#E0E7FF' },
                ]}
              >
                <Title
                  text="M"
                  size="small"
                  fontFamily={FONT.TTForseSemiBold}
                  color="#4338CA"
                />
              </View>
              <AppText
                text="Marcus"
                size="tiny"
                fontFamily={FONT.TTForseSemiBold}
                color="#1C1917"
                style={styles.nodeTextLabel}
              />
              <AppText
                text="Son"
                size="tiny"
                fontFamily={FONT.TTForseRegular}
                color="rgba(28, 25, 23, 0.6)"
              />
            </View>
          </View>

          {/* Embedded Floating Add Action Indicator Node */}
          <TouchableOpacity
            style={styles.floatingAddNodeIndicator}
            activeOpacity={0.8}
          >
            <Icon name="plus" size={16} color="rgba(28, 25, 23, 0.5)" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.highlightedRowWrapper}>
          <View style={styles.rowLeftFlexBlock}>
            <View
              style={[
                styles.listAvatarCircle,
                { borderColor: 'rgba(197, 147, 83, 0.4)' },
              ]}
            >
              <Title text="E" size="medium" color="#D5A760" />
            </View>
            <View style={styles.listTextMetaStack}>
              <Title text="Eleanor Whitfield" size="medium" color="#FFFFFF" />
              <AppText
                text="You · 12 items"
                size="small"
                fontFamily={FONT.TTForseRegular}
                color="#A1A1AA"
                style={styles.metaSpacing}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.viewBadgeButton} activeOpacity={0.7}>
            <AppText text="View" size="small" />
          </TouchableOpacity>
        </View>

        {/* ==========================================
            MEMBERS SECTION LIST
           ========================================== */}
        <View style={styles.sectionContainer}>
          <AppText
            text="MEMBERS"
            size="tiny"
            color="#A1A1AA"
            style={styles.sectionTitleLabel}
          />

          {/* Row 1: Eleanor */}
          <View style={styles.standardMemberRowBox}>
            <View style={styles.rowLeftFlexBlock}>
              <View style={styles.listAvatarCircle}>
                <Title text="E" size="medium" color="#D5A760" />
              </View>
              <View style={styles.listTextMetaStack}>
                <Title text="Eleanor Whitfield" size="medium" color="#FFFFFF" />
                <AppText
                  text="You · 12 items"
                  size="small"
                  fontFamily={FONT.TTForseRegular}
                  color="#A1A1AA"
                  style={styles.metaSpacing}
                />
              </View>
            </View>
          </View>

          {/* Row 2: James */}
          <View style={styles.standardMemberRowBox}>
            <View style={styles.rowLeftFlexBlock}>
              <View
                style={[
                  styles.listAvatarCircle,
                  { backgroundColor: 'rgba(74, 222, 128, 0.05)' },
                ]}
              >
                <Title text="J" size="medium" color="#4ADE80" />
              </View>
              <View style={styles.listTextMetaStack}>
                <Title text="James Whitfield" size="medium" color="#FFFFFF" />
                <AppText
                  text="Son · 4 items assigned"
                  size="small"
                  fontFamily={FONT.TTForseRegular}
                  color="#A1A1AA"
                  style={styles.metaSpacing}
                />
              </View>
            </View>
          </View>

          {/* Row 3: Sofia */}
          <View style={styles.standardMemberRowBox}>
            <View style={styles.rowLeftFlexBlock}>
              <View
                style={[
                  styles.listAvatarCircle,
                  { backgroundColor: 'rgba(244, 114, 182, 0.05)' },
                ]}
              >
                <Title text="S" size="medium" color="#F472B6" />
              </View>
              <View style={styles.listTextMetaStack}>
                <Title text="Sofia Chen" size="medium" color="#FFFFFF" />
                <AppText
                  text="Daughter · 6 items assigned"
                  size="small"
                  fontFamily={FONT.TTForseRegular}
                  color="#A1A1AA"
                  style={styles.metaSpacing}
                />
              </View>
            </View>
          </View>

          {/* Row 4: New Future Descendant Slot */}
          <View style={styles.standardMemberRowBox}>
            <View style={styles.rowLeftFlexBlock}>
              <View style={styles.dashedAvatarCircle}>
                <Title text="?" size="medium" color="rgba(244, 63, 94, 0.6)" />
              </View>
              <View style={styles.listTextMetaStack}>
                <Title
                  text="New Future descendant"
                  size="medium"
                  color="#FFFFFF"
                />
                <AppText
                  text="Future Generation 0 items assigned"
                  size="small"
                  fontFamily={FONT.TTForseRegular}
                  color="#A1A1AA"
                  style={styles.metaSpacing}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Global Action Trigger Button */}
        <TouchableOpacity
          style={styles.primaryActionButton}
          activeOpacity={0.9}
        >
          <View style={styles.buttonCenterInlineRow}>
            <Icon
              name="account-plus-outline"
              size={20}
              color="#1C1917"
              style={styles.buttonActionIconRightSpace}
            />
            <Title text="Add Future Descendant" size="medium" color="#1C1917" />
          </View>
        </TouchableOpacity>
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
  backTouchNode: {
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
    paddingBottom: Responsive.height(48),
  },
  treeCanvasCard: {
    width: '100%',
    height: Responsive.height(240),
    borderRadius: 28,
    padding: Spacing.medium + 2,
    position: 'relative',
    marginBottom: Responsive.height(28),
    overflow: 'hidden',
  },
  generationLabelsColumn: {
    position: 'absolute',
    left: Spacing.medium,
    top: Spacing.large,
    bottom: Spacing.large,
    justifyContent: 'flex-start',
    zIndex: 3,
  },
  gen2LabelPosition: {
    marginTop: Responsive.height(54),
  },
  gen3LabelPosition: {
    marginTop: Responsive.height(60),
  },
  rootNodeAnchor: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 4,
    zIndex: 2,
  },
  eleanorOuterRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(28, 25, 23, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  eleanorInnerCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(28, 25, 23, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeTextLabel: {
    lineHeight: 14,
  },
  svgAbsoluteContainer: {
    ...StyleSheet.absoluteFillObject,
    top: Responsive.height(40),
    height: Responsive.height(130),
    zIndex: 1,
  },
  nodesHorizontalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: Spacing.small,
    left: Responsive.width(72),
    right: Spacing.medium,
    zIndex: 2,
  },
  verticalNodeGroup: {
    alignItems: 'center',
    width: Responsive.width(70),
  },
  nodeCircleBase: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  grandchildOffsetNode: {
    alignItems: 'center',
    marginTop: Responsive.height(18),
    width: Responsive.width(80),
  },
  lilyCircleSize: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: 'rgba(28, 25, 23, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  multilineFix: {
    fontSize: 8,
    lineHeight: 10,
    marginTop: 1,
  },
  floatingAddNodeIndicator: {
    position: 'absolute',
    bottom: Spacing.medium,
    right: Spacing.medium,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(28, 25, 23, 0.15)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightedRowWrapper: {
    width: '100%',
    backgroundColor: '#0A0A0C',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    paddingHorizontal: Spacing.medium,
    height: Responsive.height(76),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Responsive.height(28),
  },
  rowLeftFlexBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listAvatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  dashedAvatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(244, 63, 94, 0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  listTextMetaStack: {
    flex: 1,
    justifyContent: 'center',
  },
  metaSpacing: {
    marginTop: 2,
  },
  viewBadgeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 16,
    height: 32,
    borderRadius: Radius.medium || 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    width: '100%',
    marginBottom: Responsive.height(32),
  },
  sectionTitleLabel: {
    letterSpacing: 1.2,
    marginBottom: Spacing.small,
    paddingLeft: 2,
  },
  standardMemberRowBox: {
    width: '100%',
    backgroundColor: '#0A0A0C',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    paddingHorizontal: Spacing.medium,
    height: Responsive.height(72),
    justifyContent: 'center',
    marginBottom: Spacing.small,
  },
  primaryActionButton: {
    width: '100%',
    height: 52,
    borderRadius: Radius.circle || 26,
    backgroundColor: '#CD974A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCenterInlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonActionIconRightSpace: {
    marginRight: Spacing.small - 4,
  },
});
