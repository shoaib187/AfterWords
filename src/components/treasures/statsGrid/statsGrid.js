import { Dimensions, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import MCOIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AppText from '../../typography/appText/appText';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const StatsGrid = ({ stats }) => {
  return (
    <View>
      <View style={styles.gridRowPair}>
        <View style={styles.statBoxContainer}>
          <View
            style={[
              styles.statIconBadge,
              { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
            ]}
          >
            <MCOIcon
              name="image-multiple-outline"
              size={Responsive.width(20)}
              color="#10B981"
            />
          </View>

          <View style={styles.statTextColumn}>
            <AppText
              text={String(stats.treasures)}
              size="large"
              color={COLORS.WHITE}
              style={styles.serifMetricText}
            />
            <AppText text="Treasure" size="small" color="#A1A1AA" />
          </View>
        </View>

        <View style={styles.statBoxContainer}>
          <View
            style={[
              styles.statIconBadge,
              { backgroundColor: 'rgba(139, 92, 246, 0.1)' },
            ]}
          >
            <MCOIcon
              name="database-outline"
              size={Responsive.width(20)}
              color="#8B5CF6"
            />
          </View>

          <View style={styles.statTextColumn}>
            <AppText
              text={stats.storage}
              size="large"
              color={COLORS.WHITE}
              style={styles.serifMetricText}
            />
            <AppText text="Storage" size="small" color="#A1A1AA" />
          </View>
        </View>
      </View>

      <View style={styles.gridRowPair}>
        <View style={styles.statBoxContainer}>
          <View
            style={[
              styles.statIconBadge,
              { backgroundColor: 'rgba(196, 151, 83, 0.1)' },
            ]}
          >
            <FeatherIcon
              name="heart"
              size={Responsive.width(18)}
              color="#C49753"
            />
          </View>

          <View style={styles.statTextColumn}>
            <AppText
              text={String(stats.legacies)}
              size="large"
              color={COLORS.WHITE}
              style={styles.serifMetricText}
            />
            <AppText text="Legacies" size="small" color="#A1A1AA" />
          </View>
        </View>

        <View style={styles.statBoxContainer}>
          <View
            style={[
              styles.statIconBadge,
              { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
            ]}
          >
            <MCOIcon
              name="folder-zip-outline"
              size={Responsive.width(20)}
              color="#EF4444"
            />
          </View>

          <View style={styles.statTextColumn}>
            <AppText
              text={String(stats.collections)}
              size="large"
              color={COLORS.WHITE}
              style={styles.serifMetricText}
            />
            <AppText text="Collection" size="small" color="#A1A1AA" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatsGrid;

const styles = StyleSheet.create({
  gridRowPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.medium,
  },

  statBoxContainer: {
    width: (SCREEN_WIDTH - Spacing.large * 2 - Spacing.medium) / 2,
    height: Responsive.height(72),
    borderRadius: Radius.large || 18,
    borderWidth: 1,
    borderColor: 'rgba(196, 151, 83, 0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
  },

  statIconBadge: {
    width: 38,
    height: 38,
    borderRadius: Radius.medium || 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.small + 2,
  },

  statTextColumn: {
    justifyContent: 'center',
  },

  serifMetricText: {
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 1,
  },
});
