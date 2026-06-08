import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { Responsive, Spacing, FontSize, Radius } from '../../constants/styles';
import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';
import { useNavigation } from '@react-navigation/native';
import { useGetUnreadCount } from '../../../hooks/useNotifications/useNotifications';

export default function Header({
  handleFilter,
  user,
  showNotificationBell,
  showFilter,
  showMessageRequest,
  onuUpdateLocation,
  showLocation = true,
  renderLeftElement,
}) {
  const navigation = useNavigation();
  const { data: unreadCount } = useGetUnreadCount();
  const count = unreadCount?.unreadCount || 0;

  const address = user?.address?.formattedAddress?.trim()
    ? user.address.formattedAddress
    : user?.location?.coordinates?.length >= 2
    ? `${user.location.coordinates[1].toFixed(
        4,
      )}, ${user.location.coordinates[0].toFixed(4)}`
    : 'Update location';

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {renderLeftElement}
        {showLocation && (
          <>
            <Text style={styles.locLabel}>Location</Text>
            <Pressable onPress={onuUpdateLocation} style={styles.locationRow}>
              <Entypo
                name={
                  user?.location?.type === 'Point' ? 'location-pin' : 'location'
                }
                size={Responsive.font(18)}
                color={COLORS.PRIMARY}
              />
              <Text style={styles.locationText} numberOfLines={1}>
                {address}
              </Text>
            </Pressable>
          </>
        )}
      </View>
      <View style={styles.rowIcons}>
        {showNotificationBell && (
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <Icon
              name="bell"
              size={Responsive.font(18)}
              color={COLORS.PRIMARY}
            />
            {count > 0 && (
              <View style={styles.badge}>
                <Text style={styles.count}>
                  {count > 99 ? '99+' : count + 1}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {showFilter && (
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={handleFilter}
            activeOpacity={0.7}
          >
            <Icon
              name="sliders-h"
              size={Responsive.font(16)}
              color={COLORS.PRIMARY}
            />
          </TouchableOpacity>
        )}

        {showMessageRequest && (
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => navigation.navigate('Messages')}
            activeOpacity={0.7}
          >
            <Icon
              name="bell"
              size={Responsive.font(16)}
              color={COLORS.PRIMARY}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.BACKGROUND,
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  locLabel: {
    fontSize: FontSize.tiny,
    fontFamily: FONT.SpaceGroteskMedium,
    color: COLORS.TEXT_LIGHT, // Replacing #999
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Responsive.height(2),
  },
  locationText: {
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskSemiBold,
    color: COLORS.TEXT_PRIMARY,
    marginLeft: Spacing.tiny,
  },
  filterBtn: {
    width: Responsive.width(44),
    height: Responsive.width(44),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: Radius.full * 4,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  rowIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.ERROR,
    borderRadius: Radius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  count: {
    color: '#fff',
    fontSize: FontSize.tiny,
    fontFamily: FONT.SpaceGroteskSemiBold,
  },
});
