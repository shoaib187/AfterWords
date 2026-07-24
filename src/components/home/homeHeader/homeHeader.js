import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';

import AppText from '../../typography/appText/appText';

export const HomeHeader = ({ firstName }) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Good Afternoon';
    } else if (currentHour >= 17 && currentHour < 20) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  };

  const greeting = getGreeting();

  return (
    <View style={styles.topHeaderNav}>
      <View style={styles.userInfoRow}>
        <View style={styles.profileAvatarCircle}>
          <AppText
            text={firstName?.charAt(0)?.toUpperCase() || '?'}
            size="large"
            color={COLORS.BLACK}
            weight="bold"
          />
        </View>
        <View style={styles.greetingTextColumn}>
          <AppText
            text={`${greeting}`}
            size="small"
            color="#999"
            style={styles.greetingText}
          />
          <AppText
            text={firstName || 'Guest'}
            size="large"
            color={COLORS.WHITE}
            weight="bold"
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.notificationBellButton}
        activeOpacity={0.7}
      >
        <Ionicons
          name="notifications-outline"
          size={Responsive.width(24)}
          color={COLORS.WHITE}
        />
        <View style={styles.activeNotificationDot} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topHeaderNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
    paddingTop: Responsive.isIOS
      ? Responsive.height(50)
      : Responsive.height(18),
    paddingBottom: Spacing.medium,
    backgroundColor: COLORS.BLACK,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatarCircle: {
    width: Responsive.width(48),
    height: Responsive.width(48),
    borderRadius: Radius.circle || 24,
    backgroundColor: '#C59353',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  greetingTextColumn: {
    justifyContent: 'center',
  },
  greetingText: {
    marginBottom: 2,
    fontWeight: '500',
  },
  notificationBellButton: {
    padding: Spacing.tiny,
    position: 'relative',
  },
  activeNotificationDot: {
    position: 'absolute',
    top: Spacing.tiny,
    right: Spacing.tiny,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1,
    borderColor: COLORS.BLACK,
  },
});
