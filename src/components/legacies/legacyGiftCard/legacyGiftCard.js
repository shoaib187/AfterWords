import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import GradientWrapper from '../../common/gradientWrapper/gradientWrapper';

export default function LegacyGiftCard({ item, onPress }) {
  const isGold = item.variant === 'gold';

  const content = (
    <>
      <View style={styles.header}>
        <AppText text={item.status} color={item.statusColor} />

        <View style={styles.badge}>
          <Ionicons
            name="gift-outline"
            size={Responsive.width(20)}
            color="#D1A354"
          />
        </View>
      </View>

      <Title text={item.title} color={isGold ? COLORS.BLACK : COLORS.WHITE} />

      <AppText
        text={`Trigger : ${item.trigger}`}
        color={isGold ? '#705322' : '#D1A354'}
        style={styles.trigger}
      />

      {item.icons.length > 0 && (
        <View style={styles.containsRow}>
          <AppText
            text="CONTAINS"
            color={isGold ? COLORS.BLACK : COLORS.WHITE}
          />

          <View style={styles.icons}>
            {item.icons.map((icon, index) => (
              <View
                key={index}
                style={[
                  styles.iconCircle,
                  isGold ? styles.goldIcon : styles.darkIcon,
                ]}
              >
                <Ionicons
                  name={icon}
                  size={16}
                  color={
                    icon === 'videocam-outline'
                      ? '#E07A5F'
                      : icon === 'image-outline'
                      ? '#38D39F'
                      : '#D1A354'
                  }
                />
              </View>
            ))}
          </View>
        </View>
      )}
    </>
  );

  if (isGold) {
    return (
      <GradientWrapper onPress={onPress} wrapperStyle={styles.gradientWrapper}>
        <View style={styles.card}>{content}</View>
      </GradientWrapper>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, styles.darkCard]}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xLarge,
  },

  darkCard: {
    backgroundColor: COLORS.BLACK,
    borderWidth: 1.5,
    padding: Spacing.medium,
    borderColor: '#3B301B',
    marginBottom: Spacing.medium,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },

  status: {
    letterSpacing: 0.5,
  },

  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginBottom: Spacing.small,
  },

  trigger: {
    marginBottom: Spacing.small,
  },

  containsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icons: {
    flexDirection: 'row',
    marginLeft: Spacing.medium,
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.small,
  },

  goldIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },

  darkIcon: {
    backgroundColor: COLORS.BLACK,
    borderWidth: 1,
    borderColor: '#3B301B',
  },
  goldCard: {
    bottom: Spacing.large,
  },
  gradientWrapper: {
    marginBottom: Spacing.medium,
  },
});
