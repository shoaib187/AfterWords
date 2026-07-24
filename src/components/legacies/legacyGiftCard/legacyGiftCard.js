import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import GradientWrapper from '../../common/gradientWrapper/gradientWrapper';

export default function LegacyGiftCard({ item, onPress }) {
  const { treasure, recipients, releaseType, releaseDate, status } = item || {};

  const isGold = releaseType === 'scheduled';

  const treasureTitle = treasure?.title || 'Untitled Treasure';
  const treasureType = treasure?.typeLabel || treasure?.type || 'Document';
  const files = treasure?.files || [];

  const getStatusDisplay = status => {
    if (!status) return 'PENDING';
    return status.toUpperCase();
  };

  const getStatusColor = status => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return '#00D66C';
      case 'pending':
        return '#E05A47';
      case 'cancelled':
        return '#FF6B6B';
      default:
        return '#4A90E2';
    }
  };

  const getTriggerDisplay = (releaseType, releaseDate) => {
    if (releaseType === 'estate') {
      return 'Executor Release';
    } else if (releaseType === 'scheduled' && releaseDate) {
      const date = new Date(releaseDate);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `Scheduled for ${month}/${day}/${year}`;
    }
    return 'Not specified';
  };

  const getIconName = type => {
    if (!type) return 'document-text-outline';
    const lowerType = type.toLowerCase();
    if (lowerType === 'video') return 'videocam-outline';
    if (lowerType === 'voice') return 'mic-outline';
    if (lowerType === 'photo') return 'image-outline';
    return 'document-text-outline';
  };

  const getIconColor = type => {
    if (!type) return '#D1A354';
    const lowerType = type.toLowerCase();
    if (lowerType === 'video') return '#E07A5F';
    if (lowerType === 'voice') return '#38D39F';
    if (lowerType === 'photo') return '#4A90E2';
    return '#D1A354';
  };

  const getFileIcons = () => {
    if (files && files.length > 0) {
      return files.map((file, index) => {
        const mimeType = file.mimeType || '';
        if (mimeType.includes('video')) return 'videocam-outline';
        if (mimeType.includes('audio')) return 'mic-outline';
        if (mimeType.includes('image')) return 'image-outline';
        return 'document-text-outline';
      });
    }
    return [getIconName(treasureType)];
  };

  const triggerText = getTriggerDisplay(releaseType, releaseDate);
  const statusText = getStatusDisplay(status);
  const statusColor = getStatusColor(status);
  const fileIcons = getFileIcons();

  const getRecipientNames = () => {
    if (recipients && recipients.length > 0) {
      return recipients.map(r => r.name).join(', ');
    }
    return 'No recipients assigned';
  };

  const content = (
    <>
      <View style={styles.header}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <AppText
            text={statusText}
            color={statusColor}
            style={styles.statusText}
          />
        </View>

        <View style={styles.badge}>
          <Ionicons
            name="gift-outline"
            size={Responsive.width(20)}
            color="#D1A354"
          />
        </View>
      </View>

      <Title
        text={treasureTitle}
        color={isGold ? COLORS.BLACK : COLORS.WHITE}
        style={styles.title}
      />

      <AppText
        text={`Trigger: ${triggerText}`}
        color={isGold ? '#705322' : '#D1A354'}
        style={styles.trigger}
      />

      {recipients && recipients?.length > 0 && (
        <AppText
          text={`Assigned to: ${getRecipientNames()}`}
          color={isGold ? '#705322' : '#888888'}
          size="small"
          style={styles.recipients}
        />
      )}

      {fileIcons && fileIcons.length > 0 && (
        <View style={styles.containsRow}>
          <AppText
            text="CONTAINS"
            color={isGold ? COLORS.BLACK : COLORS.WHITE}
            size="tiny"
          />

          <View style={styles.icons}>
            {fileIcons.map((icon, index) => (
              <View
                key={index}
                style={[
                  styles.iconCircle,
                  isGold ? styles.goldIcon : styles.darkIcon,
                ]}
              >
                <Ionicons
                  name={icon}
                  size={16}
                  color={getIconColor(treasureType)}
                />
              </View>
            ))}
          </View>
        </View>
      )}

      {releaseType === 'scheduled' && releaseDate && (
        <AppText
          text={`Release Date: ${new Date(releaseDate).toLocaleDateString()}`}
          color={isGold ? '#705322' : '#888888'}
          size="tiny"
          style={styles.releaseDate}
        />
      )}
    </>
  );

  if (isGold) {
    return (
      <GradientWrapper onPress={onPress} wrapperStyle={styles.gradientWrapper}>
        <View style={styles.card}>{content}</View>
      </GradientWrapper>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, styles.darkCard]}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xLarge,
  },

  darkCard: {
    backgroundColor: COLORS.BLACK,
    borderWidth: 1.5,
    padding: Spacing.medium,
    borderColor: '#3B301B',
    marginBottom: Spacing.medium,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.small,
  },

  statusText: {
    letterSpacing: 0.5,
  },

  badge: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    borderRadius: Radius.circle,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },

  trigger: {
    marginBottom: Spacing.tiny,
  },

  recipients: {
    marginBottom: Spacing.small,
  },

  releaseDate: {
    marginTop: Spacing.tiny,
  },

  containsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icons: {
    flexDirection: 'row',
    marginLeft: Spacing.medium,
  },

  iconCircle: {
    width: Responsive.width(30),
    height: Responsive.width(30),
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.small,
  },

  goldIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },

  darkIcon: {
    backgroundColor: COLORS.BLACK,
    borderWidth: 1,
    borderColor: '#3B301B',
  },

  gradientWrapper: {
    marginBottom: Spacing.medium,
  },
});
