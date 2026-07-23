import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import MCOIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import { Responsive, Radius, Spacing } from '../../constants/styles';
import Title from '../../typography/title/title';
import { Button } from '../../common/button/button';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LegacySnapshot({ dataState, navigation }) {
  const hasData = dataState?.hasData ?? false;

  return (
    <View style={styles.masterContainer}>
      {!hasData ? (
        <View style={styles.emptyStateContainer}>
          <MCOIcon
            name="safe-square-outline"
            size={Responsive.width(42)}
            color={COLORS.GRAY}
          />

          <Title
            text="Start Building Your Legacy"
            size="xlarge"
            align="center"
          />

          <AppText
            text="Add your first treasure and begin preserving memories, stories, guidance, and family history for future generations."
            size="medium"
            color={COLORS.GRAY}
            align="center"
          />

          <Button
            title="Create First Treasure"
            style={{ marginTop: Spacing.medium }}
          />
        </View>
      ) : (
        <View style={styles.activeStateContainer}>
          <AppText
            text="LEGACY SNAPSHOT"
            size="small"
            style={styles.sectionHeadingMargin}
          />

          <View style={styles.snapshotGridMatrix}>
            {/* Row 1 */}
            <View style={styles.gridRowPair}>
              <View style={styles.snapshotCard}>
                <MCOIcon
                  name="image-multiple-outline"
                  size={20}
                  color="#10B981"
                  style={styles.gridCardIconSpacing}
                />
                <AppText
                  text={String(dataState?.snapshots?.treasures || 0)}
                  size="large"
                />
                <AppText text="Treasure" />
              </View>

              <View style={styles.snapshotCard}>
                <Icon
                  name="heart"
                  size={20}
                  color="#C49753"
                  style={styles.gridCardIconSpacing}
                />
                <AppText
                  text={String(dataState?.snapshots?.legacies || 0)}
                  size="large"
                  color={COLORS.WHITE}
                />
                <AppText text="Legacies" />
              </View>
            </View>

            {/* Row 2 */}
            <View style={styles.gridRowPair}>
              <View style={styles.snapshotCard}>
                <Icon
                  name="users"
                  size={20}
                  color="#3B82F6"
                  style={styles.gridCardIconSpacing}
                />
                <AppText
                  text={String(dataState?.snapshots?.recipients || 0)}
                  size="large"
                  color={COLORS.WHITE}
                />
                <AppText text="Recipients" />
              </View>

              <View style={styles.snapshotCard}>
                <Icon
                  name="clock"
                  size={20}
                  color="#8B5CF6"
                  style={styles.gridCardIconSpacing}
                />
                <AppText
                  text={String(dataState?.snapshots?.scheduled || 0)}
                  size="large"
                />
                <AppText text="Scheduled" />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  masterContainer: {
    paddingTop: Spacing.large,
  },

  safeIconOutlineCircle: {
    width: Responsive.width(76),
    height: Responsive.width(76),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.large,
  },
  emptyStateContainer: {
    alignItems: 'center',
    gap: Spacing.small,
  },
  emptyStateTitleFont: {
    fontFamily: 'Georgia',
    color: COLORS.WHITE,
    marginBottom: Spacing.medium,
  },
  emptyStateDescriptionBody: {
    lineHeight: 22,
    paddingHorizontal: Spacing.medium,
    marginBottom: Responsive.height(40),
  },
  primaryActionButton: {
    width: '100%',
    height: Responsive.height(54),
    backgroundColor: '#DCA257',
    borderRadius: Radius.large || 27,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ACTIVE STATE SPECIFIC STYLES */
  activeStateContainer: {
    width: '100%',
  },
  sectionHeadingMargin: {
    letterSpacing: 1,
    marginBottom: Spacing.medium,
  },
  snapshotGridMatrix: {
    width: '100%',
  },
  gridRowPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.medium,
  },
  snapshotCard: {
    width: (SCREEN_WIDTH - Spacing.large - Spacing.medium) / 2,
    borderRadius: Radius.large,
    borderWidth: 0.5,
    borderColor: COLORS.GOLD,
    padding: Spacing.large,
    justifyContent: 'center',
  },
  gridCardIconSpacing: {
    marginBottom: Spacing.medium,
  },
});
