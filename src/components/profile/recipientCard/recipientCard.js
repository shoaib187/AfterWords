import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import GradientWrapper from '../../common/gradientWrapper/gradientWrapper';
import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';

import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/font';

const RecipientCard = ({ recipient, onPress }) => {
  const isVerified = recipient.status === 'Verified';

  return (
    <GradientWrapper
      wrapperStyle={styles.card}
      onPress={() => onPress?.(recipient)}
    >
      <View style={styles.header}>
        <View style={styles.info}>
          <Title text={recipient.name} size="large" color={COLORS.BLACK} />

          <AppText
            text={recipient.relationship}
            size="small"
            color="rgba(0,0,0,0.65)"
            fontFamily={FONT.TTForseRegular}
            style={styles.relationship}
          />
        </View>

        <View
          style={[
            styles.badge,
            isVerified ? styles.verifiedBadge : styles.pendingBadge,
          ]}
        >
          <AppText
            text={recipient.status}
            size="tiny"
            color={COLORS.WHITE}
            fontFamily={FONT.TTForseSemiBold}
          />
        </View>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="mail-outline"
          size={Responsive.width(18)}
          color={COLORS.BLACK}
        />

        <AppText text="Email" color="rgba(0,0,0,0.7)" style={styles.label} />

        <AppText
          text={recipient.email}
          numberOfLines={1}
          color={COLORS.BLACK}
          fontFamily={FONT.TTForseSemiBold}
          style={styles.value}
        />
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="cellphone"
          size={Responsive.width(18)}
          color={COLORS.BLACK}
        />

        <AppText text="Phone" color="rgba(0,0,0,0.7)" style={styles.label} />

        <AppText
          text={recipient.phone}
          numberOfLines={1}
          color={COLORS.BLACK}
          fontFamily={FONT.TTForseSemiBold}
          style={styles.value}
        />
      </View>
    </GradientWrapper>
  );
};

export default RecipientCard;

const styles = StyleSheet.create({
  card: {
    padding: Spacing.large,
    borderRadius: Radius.xLarge,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.large,
  },

  info: {
    flex: 1,
    marginRight: Spacing.medium,
  },

  relationship: {
    marginTop: 2,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.large,
  },

  verifiedBadge: {
    backgroundColor: '#22C55E',
  },

  pendingBadge: {
    backgroundColor: '#F59E0B',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },

  label: {
    width: 55,
    marginLeft: Spacing.small,
  },

  value: {
    flex: 1,
    marginLeft: Spacing.small,
  },
});
