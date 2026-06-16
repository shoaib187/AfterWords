import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { FONT } from '../../constants/font';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import { COLORS } from '../../constants/color';

export default function DocumentDownloadCard({
  fileName = 'Lakehouse Property Deed & Instructions Uploaded 2025.pdf',
  fileSize = '2.4 MB',
  statusText = 'Ready to attach',
  onDownload,
  onClose,
}) {
  return (
    <LinearGradient
      colors={['#EEDBB2', '#CD974A']}
      style={styles.cardContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity
        style={styles.closeHitbox}
        onPress={onClose}
        activeOpacity={0.7}
      >
        <Icon name="close" size={20} color="#1C1917" />
      </TouchableOpacity>

      {/* Decorative Core Document Emblem Icon Badge */}
      <View style={styles.documentBadgeFrame}>
        <Icon name="file-document-outline" size={24} color="#1C1917" />
      </View>

      {/* Meta Content Metadata Cluster */}
      <View style={styles.textMetaCluster}>
        <Text style={styles.fileNameText} numberOfLines={2}>
          {fileName}
        </Text>
        <Text style={styles.fileDetailsText}>
          {fileSize} · {statusText}
        </Text>
      </View>

      {/* Solid Primary Action Button */}
      <TouchableOpacity
        style={styles.downloadActionButton}
        onPress={onDownload}
        activeOpacity={0.9}
      >
        <Text style={styles.downloadButtonText}>Download File</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: Radius.xLarge,
    padding: Spacing.medium,
    position: 'relative',
    marginBottom: Spacing.medium,
  },
  closeHitbox: {
    position: 'absolute',
    top: Spacing.small,
    right: Spacing.small,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  documentBadgeFrame: {
    width: Responsive.width(48),
    height: Responsive.width(48),
    borderRadius: 14,
    backgroundColor: COLORS.GOLD + '70',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: Responsive.height(20),
  },
  textMetaCluster: {
    width: '100%',
    paddingHorizontal: Spacing.small,
    marginBottom: Responsive.height(24),
  },
  fileNameText: {
    color: '#1C1917', // High contrast rich dark aesthetic matching text layers
    fontSize: 15,
    fontFamily: FONT.TTForseBold || 'sans-serif-bold',
    lineHeight: 22,
    textAlign: 'left',
    marginBottom: 4,
  },
  fileDetailsText: {
    color: 'rgba(28, 25, 23, 0.65)', // Muted primary dark subtitle accent color
    fontSize: 12,
    fontFamily: FONT.TTForseRegular,
    textAlign: 'left',
  },
  downloadActionButton: {
    width: '100%',
    height: 52,
    borderRadius: Radius.circle || 26,
    backgroundColor: '#D9A451', // Matching internal opaque gold baseline contrast color fill
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#1C1917',
    fontSize: 14,
    fontFamily: FONT.TTForseBold,
  },
});
