import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../../typography/appText/appText';
import { FONT } from '../../constants/font';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';
import { COLORS } from '../../constants/color';

export default function DocumentCard() {
  return (
    <LinearGradient
      colors={['#EEDBB2', '#C59353']}
      style={styles.attachedFileCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.fileCardLeftRow}>
        <View style={styles.miniFileIconBox}>
          <Icon name="file-document-outline" size={22} color="#CD974A" />
        </View>
        <View style={styles.fileMetaDetailsColumn}>
          <AppText
            text={'Eleanor_Will_2025.pdf'}
            size="medium"
            color="#000000"
            fontFamily={FONT.TTForseSemiBold}
            numberOfLines={1}
          />
          <AppText
            text={`${'2.4 MB'} · Ready to attach`}
            size="small"
            color="rgba(0, 0, 0, 0.6)"
            fontFamily={FONT.TTForseMedium}
            style={styles.statusSubtitleSpacing}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.clearCardCrossButton}
        onPress={() => {}}
        activeOpacity={0.7}
      >
        <Icon name="close" size={Responsive.width(20)} color="#000000" />
      </TouchableOpacity>
    </LinearGradient>
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
  },
  scrollContent: {
    paddingBottom: Responsive.height(24),
    paddingHorizontal: Spacing.medium,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Responsive.height(16),
    marginBottom: Responsive.height(20),
  },
  purpleStatusDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.circle,
    backgroundColor: '#C084FC',
    marginRight: Spacing.small,
  },
  attachedFileCard: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: Spacing.medium + 4,
    paddingHorizontal: Spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Responsive.height(32),
  },
  fileCardLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: Spacing.small,
  },
  miniFileIconBox: {
    width: Responsive.width(42),
    height: Responsive.width(42),
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileMetaDetailsColumn: {
    marginLeft: Spacing.small + 2,
    flex: 1,
  },
  statusSubtitleSpacing: {
    marginTop: 2,
  },
  clearCardCrossButton: {
    width: Responsive.width(28),
    height: Responsive.width(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFieldBlock: {
    width: '100%',
    marginBottom: Responsive.height(32),
  },
  fieldLabel: {
    fontFamily: 'Georgia',
    fontSize: 18,
    marginBottom: Responsive.height(14),
    paddingLeft: 2,
  },
  singleLineInput: {
    height: Responsive.height(54),
    borderRadius: Radius.xLarge,
    borderWidth: 1,
    borderColor: '#C59353',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    color: COLORS.WHITE,
    paddingHorizontal: Spacing.medium,
    fontSize: FontSize.medium,
    fontFamily: FONT.TTForseMedium,
    marginTop: Spacing.small,
  },
  categoryBlockWrapper: {
    width: '100%',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Spacing.small,
  },
  categoryGridCell: {
    width: '48%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small - 2,
    marginBottom: Responsive.height(14),
  },
  selectedCategoryCell: {
    borderColor: '#C59353',
    backgroundColor: 'rgba(197, 147, 83, 0.08)',
  },
  cellIconFrame: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.small - 2,
  },
  unselectedIconFrame: {
    backgroundColor: 'rgba(213, 167, 96, 0.1)',
  },
  selectedIconFrame: {
    backgroundColor: '#D5A760',
  },
  gridCellText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 16,
  },
  footerActionWrapper: {
    paddingHorizontal: Spacing.medium,
    marginBottom: Responsive.height(24),
  },
});
