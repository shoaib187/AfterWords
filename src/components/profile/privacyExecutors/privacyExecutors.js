import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';

const PrivacyExecutors = ({ PERMISSIONS }) => {
  return (
    <>
      <Title
        text="PRIMARY EXECUTORS (1)"
        size="small"
        fontFamily={FONT.TTForseSemiBold}
        color={COLORS.WHITE}
        style={styles.sectionHeader}
      />

      <View style={styles.executorCard}>
        <View style={styles.executorHeader}>
          <View style={styles.avatarCircle}>
            <Title
              text="M"
              size="medium"
              fontFamily={FONT.TTForseBold}
              color="#000000"
            />
          </View>

          <View style={styles.executorInfo}>
            <Title
              text="Marcus Law Firm"
              size="small"
              fontFamily={FONT.TTForseSemiBold}
              color={COLORS.WHITE}
            />

            <AppText
              text="Legal Representation"
              size="small"
              fontFamily={FONT.TTForseRegular}
              color="#888888"
            />
          </View>

          <View style={styles.verifiedBadge}>
            <AppText
              text="VERIFIED"
              size="tiny"
              fontFamily={FONT.TTForseSemiBold}
              color={COLORS.WHITE}
            />
          </View>
        </View>

        <View style={styles.permissionsList}>
          {PERMISSIONS.map(permission => (
            <View key={permission} style={styles.permRow}>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="#4CAF50"
              />
              <AppText
                text={permission}
                size="small"
                fontFamily={FONT.TTForseRegular}
                color="#E0E0E0"
                style={styles.permText}
              />
            </View>
          ))}
        </View>

        <View style={styles.lockNoticeRow}>
          <Ionicons name="lock-closed-outline" size={20} color="#E57373" />

          <View style={styles.lockNoticeTextContainer}>
            <Title
              text="NEVER Access Private Memories"
              size="small"
              fontFamily={FONT.TTForseSemiBold}
              color="#E57373"
            />

            <AppText
              text="End-to-end encrypted. Unlocks only for designated recipients."
              size="small"
              fontFamily={FONT.TTForseRegular}
              color="#E57373"
              style={styles.lockSubtitle}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default memo(PrivacyExecutors);

const styles = StyleSheet.create({
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 16,
  },

  executorCard: {
    backgroundColor: '#1C160B',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#3B301B',
    padding: 18,
  },

  executorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#D1A354',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },

  executorInfo: {
    flex: 1,
  },

  executorName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  executorRole: {
    color: '#888888',
    fontSize: 12,
    marginTop: 2,
  },

  verifiedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  verifiedText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  permissionsList: {
    gap: 12,
    marginBottom: 18,
  },

  permRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  permText: {
    flex: 1,
    color: '#E0E0E0',
    fontSize: 13,
    marginLeft: 10,
  },

  lockNoticeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#3B301B',
  },

  lockNoticeTextContainer: {
    flex: 1,
    marginLeft: 10,
  },

  lockTitle: {
    color: '#E57373',
    fontSize: 13,
    fontWeight: '700',
  },

  lockSubtitle: {
    color: '#C97E7E',
    fontSize: 11,
    marginTop: 3,
    lineHeight: 16,
  },
});
