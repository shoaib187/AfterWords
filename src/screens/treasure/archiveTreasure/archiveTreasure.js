import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import GradientWrapper from '../../../components/common/gradientWrapper/gradientWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Data
const HIDDEN_VAULT_DATA = {
  banner: {
    icon: 'archive-outline',
    iconLibrary: 'MaterialCommunityIcons',
    title:
      'These items are hidden from your main vault remain securely encrypted.',
    subtitle:
      'They are not attached at any active legacy deliveries. You can restore them to your vault or permanently delete them at any time.',
  },
  items: [
    {
      id: '1',
      title: 'Old Tax Returns 2022',
      date: 'Archive Oct 12, 2025',
    },
    {
      id: '2',
      title: 'Draft: Letter to Mark',
      date: 'Archived Sep 01, 2025',
    },
    {
      id: '3',
      title: 'Draft: Letter to Mark',
      date: 'Archived Sep 01, 2025',
    },
  ],
};

const Banner = ({ data }) => {
  const IconComponent =
    data.iconLibrary === 'MaterialCommunityIcons'
      ? MaterialCommunityIcons
      : Ionicons;

  return (
    <GradientWrapper wrapperStyle={styles.banner}>
      <View style={styles.archiveBadge}>
        <IconComponent
          name={data.icon}
          size={Responsive.width(28)}
          color={COLORS.WHITE}
        />
      </View>
      <Title
        text={data.title}
        size="small"
        color={COLORS.BLACK}
        style={styles.bannerTitle}
      />
      <AppText
        text={data.subtitle}
        size="small"
        color="#3B2A10"
        align="center"
        style={styles.bannerSubtitle}
      />
    </GradientWrapper>
  );
};

const ArchivedItem = ({ item, onRestore, onDelete }) => {
  return (
    <View style={styles.itemCard}>
      <View style={styles.documentBadge}>
        <Ionicons
          name="document-text-outline"
          size={Responsive.width(20)}
          color={COLORS.GOLD}
        />
      </View>

      <View style={styles.itemInfo}>
        <Title
          text={item.title}
          size="small"
          color={COLORS.WHITE}
          style={styles.itemTitle}
        />
        <AppText
          text={item.date}
          size="small"
          color="#888888"
          style={styles.itemDate}
        />
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onRestore(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name="refresh-outline"
            size={Responsive.width(22)}
            color="#00FF66"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onDelete(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name="trash-outline"
            size={Responsive.width(22)}
            color="#E53935"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EmptyState = () => {
  return (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons
        name="archive-off-outline"
        size={Responsive.width(60)}
        color="#3B301B"
      />
      <Title
        text="No Archived Items"
        size="medium"
        color={COLORS.WHITE}
        style={styles.emptyTitle}
      />
      <AppText
        text="Items you archive from your vault will appear here"
        size="small"
        color="#888888"
        align="center"
        style={styles.emptySubtitle}
      />
    </View>
  );
};

export default function ArchieveTreasures() {
  const [items, setItems] = useState(HIDDEN_VAULT_DATA.items);
  const handleRestore = id => {};
  const handleDelete = id => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Hidden Vault'} />
      <GradientBackground />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Banner data={HIDDEN_VAULT_DATA.banner} />

        {items?.length > 0 ? (
          <View style={styles.listContainer}>
            {items.map(item => (
              <ArchivedItem
                key={item.id}
                item={item}
                onRestore={handleRestore}
                onDelete={handleDelete}
              />
            ))}
          </View>
        ) : (
          <EmptyState />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  scrollContent: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
    paddingBottom: Spacing.xLarge,
  },

  /* Banner Component */
  banner: {
    backgroundColor: COLORS.GOLD,
    borderRadius: Radius.xLarge,
    paddingVertical: Spacing.xLarge,
    paddingHorizontal: Spacing.large,
    alignItems: 'center',
    marginBottom: Spacing.xLarge,
  },
  archiveBadge: {
    width: Responsive.width(48),
    height: Responsive.width(48),
    borderRadius: Responsive.width(24),
    backgroundColor: COLORS.GOLD,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },
  bannerTitle: {
    textAlign: 'center',
    lineHeight: Responsive.height(18),
    marginBottom: Spacing.small,
  },
  bannerSubtitle: {
    lineHeight: Responsive.height(18),
  },

  /* List Container */
  listContainer: {
    gap: Spacing.medium,
  },

  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Responsive.height(72),
    backgroundColor: COLORS.BLACK,
    borderRadius: Radius.xLarge,
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    paddingHorizontal: Spacing.medium,
  },
  documentBadge: {
    width: Responsive.width(42),
    height: Responsive.width(42),
    borderRadius: Radius.small,
    backgroundColor: '#1C160B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    marginBottom: Spacing.tiny,
  },
  itemDate: {},

  /* Actions Row */
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small,
  },
  actionButton: {
    padding: Responsive.width(6),
  },

  /* Empty State */
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xLarge * 2,
  },
  emptyTitle: {
    marginTop: Spacing.medium,
    marginBottom: Spacing.tiny,
  },
  emptySubtitle: {
    lineHeight: Responsive.height(18),
  },
});
