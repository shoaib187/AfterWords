import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { COLORS } from '../../constants/color';
import { Responsive, Spacing } from '../../constants/styles';
import AppText from '../../typography/appText/appText';
import Title from '../../typography/title/title';
import { useNavigation } from '@react-navigation/native';

const HeaderWithSubtitle = ({
  title,
  subtitle,
  onBackPress,
  onRightPress,
  showRightBtn,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topNavigationHeader}>
      <TouchableOpacity
        style={styles.headerIconButton}
        onPress={onBackPress ?? (() => navigation?.goBack())}
        activeOpacity={0.7}
      >
        <FeatherIcon
          name="chevron-left"
          size={Responsive.width(24)}
          color="#1C1917"
        />
      </TouchableOpacity>

      <View style={styles.headerTitleContainer}>
        <Title text={title} />
        <AppText
          maxChar={60}
          text={subtitle}
          size="small"
          color={COLORS.GRAY}
        />
      </View>

      {showRightBtn ? (
        <TouchableOpacity
          style={styles.headerIconButton}
          onPress={onRightPress ?? (() => navigation?.navigate('AddTreasure'))}
          activeOpacity={0.7}
        >
          <FeatherIcon
            name="plus"
            size={Responsive.width(24)}
            color="#1C1917"
          />
        </TouchableOpacity>
      ) : (
        <View
          style={[styles.headerIconButton, { backgroundColor: 'transparent' }]}
        />
      )}
    </View>
  );
};

export default HeaderWithSubtitle;

const styles = StyleSheet.create({
  topNavigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: Spacing.medium,
    zIndex: 1,
  },

  headerIconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#C89C53',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
