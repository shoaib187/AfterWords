import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';

const StatCard = ({ value, title }) => (
  <View style={styles.statCard}>
    <Title text={value} size="xxLarge" />
    <AppText text={title} size="tiny" />
  </View>
);

const ActionButton = ({ icon, title, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    style={styles.actionButton}
    onPress={onPress}
  >
    <MaterialCommunityIcons name={icon} size={28} color={COLORS.BLACK} />

    <AppText text={title} color={COLORS.BLACK} textAlign="center" />
  </TouchableOpacity>
);

const ConnectionDetails = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText text="LEGACY CONNECTIONS" size="tiny" color="#A0A0A0" />

        <View style={styles.badge}>
          <AppText text="DAUGHTER" size="tiny" color={COLORS.WHITE} />
        </View>
      </View>

      <Title text="Sofia Chen" size="xLarge" color={COLORS.WHITE} />

      <AppText
        text="DAUGHTER ACTIVE PROFILE"
        size="tiny"
        color="#A0A0A0"
        style={styles.subtitle}
      />

      <View style={styles.statsRow}>
        <StatCard value="8" title="MEMORIES" />
        <StatCard value="2" title="FUTURE GIFTS" />
        <StatCard value="1" title="STORIES" />
      </View>

      <View style={styles.actionRow}>
        <ActionButton
          onPress={() => navigation.navigate('ExploreEncestors')}
          icon="sitemap-outline"
          title="Explore Ancestors"
        />

        <ActionButton
          onPress={() => navigation.navigate('FamilyHistory')}
          icon="archive-outline"
          title="Family History"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.medium,
    marginTop: Responsive.height(12),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  badge: {
    backgroundColor: COLORS.GOLD,
    borderRadius: Radius.circle,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  subtitle: {
    marginTop: 4,
    marginBottom: Responsive.height(22),
  },

  statsRow: {
    flexDirection: 'row',
    gap: Spacing.small,
    marginBottom: Responsive.height(28),
  },

  statCard: {
    flex: 1,
    height: Responsive.height(100),
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    backgroundColor: '#16140E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionRow: {
    flexDirection: 'row',
    gap: Spacing.medium,
  },

  actionButton: {
    flex: 1,
    height: Responsive.height(100),
    borderRadius: Radius.large,
    backgroundColor: COLORS.GOLD,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});

export default memo(ConnectionDetails);
