import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/font';

const ProfileCard = ({
  name,
  email,
  memberSince,
  isPremium = false,
  onPress,
}) => {
  const initial = name?.charAt(0)?.toUpperCase() || '?';

  return (
    <LinearGradient
      colors={['#EEDBB2', '#CD974A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.container}
      >
        <View style={styles.leftContainer}>
          <View style={styles.avatar}>
            <Title
              text={initial}
              size="large"
              fontFamily={FONT.TTForseSemiBold}
              color="#1C1917"
            />
          </View>

          <View style={styles.info}>
            <Title
              text={name}
              size="large"
              fontFamily={FONT.TTForseBold}
              color="#1C1917"
            />

            <View style={styles.storageContainer}>
              <AppText
                text="Storage 2.4 GB of 10 GB used"
                size="small"
                fontFamily={FONT.TTForseMedium}
                color="rgba(28,25,23,0.8)"
              />

              <View style={styles.progressTrack}>
                <LinearGradient
                  colors={['#E5C07B', '#B7791F']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.progressFill}
                />
              </View>
            </View>

            <View style={styles.badgeRow}>
              {isPremium && (
                <View style={styles.badge}>
                  <AppText
                    text="Premium Member"
                    size="tiny"
                    fontFamily={FONT.TTForseSemiBold}
                    color={COLORS.WHITE}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: Radius.xLarge,
    marginBottom: Spacing.large,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.medium,
  },

  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: Responsive.width(56),
    height: Responsive.width(56),
    borderRadius: Responsive.width(28),
    backgroundColor: 'rgba(28,25,23,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },

  info: {
    flex: 1,
  },

  email: {
    marginTop: 2,
    marginBottom: 4,
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.tiny,
  },

  badge: {
    backgroundColor: '#D9A451',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.medium,
    marginRight: Spacing.small,
  },

  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(28,25,23,0.18)',
    overflow: 'hidden',
    marginTop: Spacing.tiny,
  },

  progressFill: {
    width: '24%', // 2.4 GB of 10 GB
    height: '100%',
    borderRadius: 3,
  },
});

export default ProfileCard;
