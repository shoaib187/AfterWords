import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';

export const HomeHeader = () => {
  return (
    <View style={styles.topBar}>
      <View style={styles.avatarBtn}>
        <Title text={'B'} style={styles.avatarText} />
      </View>

      <TouchableOpacity style={styles.searchBar} activeOpacity={0.8}>
        <Ionicons
          name="search-outline"
          size={Responsive.width(16)}
          color={COLORS.GRAY}
        />
        <AppText text="Search" style={styles.searchPlaceholder} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
        <Ionicons
          name="notifications-outline"
          size={Responsive.width(20)}
          color={COLORS.WHITE}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.small,
    paddingBottom: Spacing.tiny,
    gap: Spacing.tiny,
    zIndex: 20,
  },
  avatarBtn: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    borderRadius: Radius.full * 5,
    backgroundColor: COLORS.CARD2,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.WHITE,
    fontWeight: '700',
    fontSize: 15,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20,20,32,0.88)',
    borderWidth: 1,
    borderColor: COLORS.BORDER + '20',
    borderRadius: Radius.full,
    height: Responsive.height(34),
    paddingHorizontal: Spacing.medium,
    gap: Spacing.tiny,
  },
  searchPlaceholder: {
    color: COLORS.GRAY,
    fontSize: 14,
  },
  iconBtn: {
    width: Responsive.width(38),
    height: Responsive.width(38),
    borderRadius: Radius.full * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
