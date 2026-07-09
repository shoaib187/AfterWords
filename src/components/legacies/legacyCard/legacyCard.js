import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MCOIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/color';
import AppText from '../../typography/appText/appText';
import { Radius, Responsive, Spacing } from '../../constants/styles';

const LegacyCard = ({
  id,
  type,
  title,
  recipient,
  releaseTime,
  iconType,
  isHighlighted = false,
  onPress,
  style,
}) => {
  // Determine card styles based on highlighted prop
  const cardStyle = isHighlighted
    ? styles.highlightedCard
    : styles.darkOutlineCard;
  const iconCircleStyle = isHighlighted
    ? styles.iconCircleLight
    : styles.iconCircleDark;
  const iconColor = isHighlighted ? '#DCA257' : '#A88143';
  const titleColor = isHighlighted ? '#1C1917' : '#DCA257';
  const chevronColor = isHighlighted ? '#1C1917' : COLORS.WHITE;

  // Gradient colors for highlighted card
  const gradientColors = isHighlighted
    ? ['#FDF2E3', '#D6A65D']
    : ['transparent', 'transparent'];

  const CardContent = () => (
    <>
      <View style={[styles.iconCircle, iconCircleStyle]}>
        <MCOIcon
          name={iconType}
          size={Responsive.width(24)}
          color={iconColor}
        />
      </View>

      <View style={styles.cardContentColumn}>
        <AppText
          text={type}
          size="small"
          weight="bold"
          color="#71717A"
          style={styles.typeLabel}
        />
        <AppText
          text={title}
          size="medium"
          weight="bold"
          color={titleColor}
          style={styles.titleLabel}
        />

        <View style={styles.metaDataRow}>
          <FeatherIcon name="user" size={14} color="#71717A" />
          <AppText
            text={recipient}
            size="small"
            color="#71717A"
            style={styles.metaDataText}
          />
        </View>
        <View style={styles.metaDataRow}>
          <FeatherIcon name="clock" size={14} color="#71717A" />
          <AppText
            text={releaseTime}
            size="small"
            color="#71717A"
            style={styles.metaDataText}
          />
        </View>
      </View>

      <FeatherIcon
        name="chevron-right"
        size={Responsive.width(24)}
        color={chevronColor}
        style={{ alignSelf: 'center' }}
      />
    </>
  );

  // Render with or without gradient based on isHighlighted
  if (isHighlighted) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[styles.cardWrapper, style]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.baseCardLayout, cardStyle]}
        >
          <CardContent />
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.cardWrapper, style]}
    >
      <View style={[styles.baseCardLayout, cardStyle]}>
        <CardContent />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    marginBottom: Spacing.large,
  },
  baseCardLayout: {
    width: '100%',
    borderRadius: Radius.xLarge || 24,
    padding: Spacing.medium + 3,
    flexDirection: 'row',
  },
  highlightedCard: {
    shadowColor: '#C49753',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  darkOutlineCard: {
    backgroundColor: 'rgba(13, 13, 13, 0.8)',
    borderWidth: 1,
    borderColor: '#A88143',
  },
  iconCircle: {
    width: Responsive.width(50),
    height: Responsive.width(50),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },
  iconCircleLight: {
    backgroundColor: COLORS.WHITE,
  },
  iconCircleDark: {
    backgroundColor: '#382D1B',
  },
  cardContentColumn: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: Spacing.small,
  },
  typeLabel: {
    marginBottom: 4,
  },
  titleLabel: {
    marginBottom: 8,
  },
  metaDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaDataText: {
    marginLeft: 6,
  },
});

export default LegacyCard;
