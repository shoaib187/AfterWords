import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';

import AppText from '../../typography/appText/appText';

export const HomeHeader = () => {
  return (
    <View style={styles.topHeaderNav}>
      <View style={styles.userInfoRow}>
        <View style={styles.profileAvatarCircle}>
          <AppText text={'E'} size="medium" weight="bold" color="#1C1917" />
        </View>
        <View style={styles.greetingTextColumn}>
          <AppText text="Good Morning" size="small" color="#999" />
          <AppText
            text={'Eleanor'}
            size="large"
            weight="bold"
            color={COLORS.WHITE}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.notificationBellButton}
        activeOpacity={0.7}
      >
        <Ionicons
          name="notifications-outline"
          size={Responsive.width(20)}
          color={COLORS.WHITE}
        />
        <View style={styles.activeNotificationDot} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
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
    width: Responsive.width(42),
    height: Responsive.width(42),
    borderRadius: Radius.circle || 21,
    backgroundColor: '#C59353',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  greetingTextColumn: {
    justifyContent: 'center',
  },
  nameHeaderText: {
    marginTop: -2,
    fontFamily: 'System',
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
  },
});
