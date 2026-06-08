import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../../constants/color';
import { FontSize, Responsive, Radius, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/font';
import AppText from '../../typography/appText/appText';
import Title from '../../typography/title/title';

export const WelcomCard = ({ event, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity activeOpacity={0.9} style={styles.cardTouchWrapper}>
        <LinearGradient
          colors={[COLORS.WHITE, COLORS.GOLD]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.profileCard}
        >
          <AppText
            text="WELCOME TO YOUR VAULT,"
            style={styles.welcomeSubtitle}
          />
          <Title text="Eleanor" style={styles.profileName} />
          <View style={styles.statusBanner}>
            <View>
              <AppText text="LEGACY VAULT STATUS" style={styles.statusLabel} />
              <AppText text="Secured & Active" style={styles.statusValue} />
            </View>

            {/* Shield Check Icon */}
            <Ionicons
              name="shield-checkmark"
              size={Responsive.width(24)}
              color={COLORS.WHITE || '#FFFFFF'}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
  },
  cardTouchWrapper: {
    borderRadius: Radius.xLarge,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginTop: Responsive.height(10),
  },
  profileCard: {
    width: '100%',
    borderRadius: Radius.xLarge,
    padding: Spacing.medium,
  },
  welcomeSubtitle: {
    fontSize: FontSize.tiny || 10,
    fontWeight: '600',
    color: '#655443',
    letterSpacing: 1,
    marginBottom: 4,
    fontFamily: FONT.TTForseRegular,
  },
  profileName: {
    color: COLORS.BLACK,
    marginBottom: Spacing.tiny,
  },
  statusBanner: {
    backgroundColor: '#C59353',
    borderRadius: Radius.large,
    paddingHorizontal: Spacing.medium || 12,
    paddingVertical: Spacing.small || 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontSize: FontSize.tiny,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  statusValue: {
    fontSize: FontSize.medium,
  },
});
