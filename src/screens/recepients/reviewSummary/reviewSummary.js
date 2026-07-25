import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppText from '../../../components/typography/appText/appText';
import Subtitle from '../../../components/typography/subtitle/subtitle';
import Title from '../../../components/typography/title/title';
import { COLORS } from '../../../components/constants/color';
import { FONT } from '../../../components/constants/font';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import { Button } from '../../../components/common/button/button';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import VoiceMessageBubble from '../../../components/messages/voiceMessageBubble/voiceMessageBubble';
import { useAuth } from '../../../configs/authContext/authContext';
import { useCreateTreasure } from '../../../hooks/useTreasures/useTreasures';
import { useUser } from '../../../hooks/useUser/useUser';

export default function ReviewSummary({ navigation, route }) {
  // Get all data from route params
  const {
    messageType,
    audioFilePath,
    videoFilePath,
    photoFiles,
    documentFile,
    title,
    label,
    description,
    categories,
    importanceLevel,
    whyImportant,
    durationSeconds,
  } = route?.params || {};

  const { mutate: createTreasure, isPending } = useCreateTreasure();

  console.log('Review Summary Data:', {
    messageType,
    audioFilePath,
    videoFilePath,
    photoFiles: photoFiles?.length || 0,
    documentFile,
    title,
    label,
    description,
    categories,
    importanceLevel,
    durationSeconds,
  });

  // console.log('photoFiles', photoFiles);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to get file extension
  const getFileExtension = filename => {
    if (!filename) return '';
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  // Helper function to get file name from path
  const getFileName = (filePath, type) => {
    if (!filePath) return '';
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];

    if (type === 'voice') {
      return fileName || `voice_${Date.now()}.m4a`;
    } else if (type === 'video') {
      return fileName || `video_${Date.now()}.mp4`;
    } else if (type === 'photo') {
      return fileName || `photo_${Date.now()}.jpg`;
    }
    return fileName || `file_${Date.now()}`;
  };

  // Helper function to get mime type
  const getMimeType = (filePath, type) => {
    if (!filePath) return '';

    const ext = getFileExtension(filePath);

    if (type === 'voice') {
      return 'audio/m4a';
    } else if (type === 'video') {
      return 'video/mp4';
    } else if (type === 'document') {
      const mimeMap = {
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        txt: 'text/plain',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        zip: 'application/zip',
        mp4: 'video/mp4',
      };
      return mimeMap[ext] || 'application/octet-stream';
    } else if (type === 'photo') {
      return 'image/jpeg';
    }

    return 'application/octet-stream';
  };

  const handleCreateTreasure = () => {
    try {
      setIsSubmitting(true);

      // Validate required fields
      if (!title?.trim()) {
        Alert.alert('Validation Error', 'Title is required');
        setIsSubmitting(false);
        return;
      }

      // Validate file exists based on type
      if (messageType === 'voice' && !audioFilePath) {
        Alert.alert('Validation Error', 'No voice recording found');
        setIsSubmitting(false);
        return;
      }

      if (messageType === 'video' && !videoFilePath) {
        Alert.alert('Validation Error', 'No video recording found');
        setIsSubmitting(false);
        return;
      }

      if (messageType === 'document' && !documentFile) {
        Alert.alert('Validation Error', 'No document found');
        setIsSubmitting(false);
        return;
      }

      if (messageType === 'photo' && (!photoFiles || photoFiles.length === 0)) {
        Alert.alert('Validation Error', 'No photos found');
        setIsSubmitting(false);
        return;
      }

      // Validate document categories (required for documents)
      if (
        messageType === 'document' &&
        (!categories || categories.length === 0)
      ) {
        Alert.alert(
          'Validation Error',
          'Categories are required for documents',
        );
        setIsSubmitting(false);
        return;
      }

      // Validate file count for each type
      if (messageType === 'video' && photoFiles?.length > 1) {
        Alert.alert('Validation Error', 'Video can only have 1 file');
        setIsSubmitting(false);
        return;
      }

      if (messageType === 'voice' && photoFiles?.length > 1) {
        Alert.alert('Validation Error', 'Voice can only have 1 file');
        setIsSubmitting(false);
        return;
      }

      if (messageType === 'document' && photoFiles?.length > 1) {
        Alert.alert('Validation Error', 'Document can only have 1 file');
        setIsSubmitting(false);
        return;
      }

      if (messageType === 'photo' && photoFiles?.length > 20) {
        Alert.alert('Validation Error', 'Photo can have maximum 20 files');
        setIsSubmitting(false);
        return;
      }

      // Prepare FormData
      const formData = new FormData();

      // Add required fields
      formData.append('type', messageType);
      formData.append('title', title.trim());

      // Add optional fields
      if (label?.trim()) {
        formData.append('label', label.trim());
      }

      if (description?.trim()) {
        formData.append('description', description.trim());
      }

      // Add duration for voice and video
      if (
        (messageType === 'voice' || messageType === 'video') &&
        durationSeconds
      ) {
        formData.append('durationSeconds', String(durationSeconds));
      }

      // Add document-specific fields
      if (messageType === 'document') {
        if (categories && categories.length > 0) {
          categories.forEach(category => {
            formData.append('categories', category.trim());
          });
        }
        formData.append('importanceLevel', importanceLevel || 'Standard');
        if (whyImportant?.trim()) {
          formData.append('whyImportant', whyImportant.trim());
        }
      }

      // Add files
      if (messageType === 'voice' && audioFilePath) {
        const fileName = getFileName(audioFilePath, 'voice');
        const mimeType = getMimeType(audioFilePath, 'voice');

        formData.append('files', {
          uri: audioFilePath,
          type: mimeType,
          name: fileName,
        });

        console.log('Adding voice file:', {
          fileName,
          mimeType,
          uri: audioFilePath,
        });
      } else if (messageType === 'video' && videoFilePath) {
        const fileName = getFileName(videoFilePath, 'video');
        const mimeType = getMimeType(videoFilePath, 'video');

        formData.append('files', {
          uri: videoFilePath,
          type: mimeType,
          name: fileName,
        });

        console.log('Adding video file:', {
          fileName,
          mimeType,
          uri: videoFilePath,
        });
      } else if (messageType === 'document' && documentFile) {
        const filePath = documentFile.uri || documentFile.path;
        const fileName = documentFile.name || getFileName(filePath, 'document');
        const mimeType =
          documentFile.mimeType ||
          documentFile.type ||
          getMimeType(filePath, 'document');

        formData.append('files', {
          uri: filePath,
          type: mimeType,
          name: fileName,
        });

        console.log('Adding document file:', {
          fileName,
          mimeType,
          uri: filePath,
        });
      } else if (
        messageType === 'photo' &&
        photoFiles &&
        photoFiles.length > 0
      ) {
        photoFiles.forEach((photo, index) => {
          const filePath = photo.uri || photo.path;
          const fileName = photo.name || `photo_${Date.now()}_${index}.jpg`;
          const mimeType = photo.mimeType || photo.type || 'image/jpeg';

          formData.append('files', {
            uri: filePath,
            type: mimeType,
            name: fileName,
          });

          console.log(`Adding photo ${index + 1}:`, {
            fileName,
            mimeType,
            uri: filePath,
          });
        });
      }

      const debugParts = formData._parts || [];
      debugParts.forEach(([key, value]) => {
        if (value && typeof value === 'object' && value.uri) {
          console.log(`${key}:`, {
            name: value.name,
            type: value.type,
            uri: value.uri,
          });
        } else {
          console.log(`${key}: ${value}`);
        }
      });

      createTreasure(
        { formData },
        {
          onSuccess: response => {
            navigation.navigate('TreasureSaved', {
              treasureId: response?._id || response,
            });
            setIsSubmitting(false);
          },
          onError: error => {
            setIsSubmitting(false);
            Alert.alert(
              'Error',
              error.message || 'Failed to create treasure. Please try again.',
            );
            if (messageType === 'video') {
              Alert.alert(
                'Video Upload Error',
                'There was an issue uploading your video. Please ensure the file is not too large and try again.',
              );
            }
          },
        },
      );
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'Failed to create treasure. Please try again.',
      );
      setIsSubmitting(false);
    }
  };

  // Get display information for the file
  const getFileDisplayInfo = () => {
    if (messageType === 'voice') {
      return {
        name: 'Voice Recording',
        size: '',
        icon: 'microphone',
        typeLabel: 'Voice Note',
      };
    } else if (messageType === 'video') {
      return {
        name: 'Video Recording',
        size: '',
        icon: 'video',
        typeLabel: 'Video',
      };
    } else if (messageType === 'photo') {
      return {
        name: `${photoFiles?.length || 0} Photo(s)`,
        size: '',
        icon: 'image',
        typeLabel: 'Photo',
      };
    } else if (messageType === 'document' && documentFile) {
      return {
        name: documentFile.name || 'Document',
        size: documentFile.size ? formatFileSize(documentFile.size) : '',
        icon: 'file-document-outline',
        typeLabel: 'Document',
      };
    }
    return {
      name: 'File',
      size: '',
      icon: 'file',
      typeLabel: 'File',
    };
  };

  // Helper function to format file size
  const formatFileSize = bytes => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const fileInfo = getFileDisplayInfo();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <HeaderBack title={'Review'} />
      <GradientBackground />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topHeaderSpacing}>
          <AppText
            text="READY TO SAVE YOUR TREASURE?"
            size="medium"
            color={COLORS.WHITE}
            align="center"
          />
        </View>

        <View style={{ paddingHorizontal: Spacing.medium }}>
          {/* Photo Preview */}
          {messageType === 'photo' && photoFiles && photoFiles.length > 0 && (
            <Image
              source={{ uri: photoFiles[0].uri }}
              style={{
                alignSelf: 'center',
                width: '100%',
                height: Responsive.height(200),
                borderRadius: Radius.xLarge,
                marginBottom: Spacing.medium,
              }}
            />
          )}

          {/* Voice Message Preview */}
          {messageType === 'voice' && audioFilePath && (
            <VoiceMessageBubble audioUri={audioFilePath} />
          )}

          {/* Document Preview */}
          {messageType === 'document' && documentFile && (
            <LinearGradient
              colors={['#EEDBB2', '#C59353']}
              style={styles.attachedFileCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.fileCardLeftRow}>
                <View style={styles.miniFileIconBox}>
                  <Icon name={fileInfo.icon} size={22} color="#CD974A" />
                </View>
                <View style={styles.fileMetaDetailsColumn}>
                  <AppText
                    text={fileInfo.name}
                    size="medium"
                    color="#000000"
                    fontFamily={FONT.TTForseSemiBold}
                    numberOfLines={1}
                  />
                  <AppText
                    text={`${fileInfo.size} · Ready to attach`}
                    size="small"
                    color="rgba(0, 0, 0, 0.6)"
                    fontFamily={FONT.TTForseMedium}
                    style={styles.statusSubtitleSpacing}
                  />
                </View>
              </View>
            </LinearGradient>
          )}
        </View>

        <LinearGradient
          colors={['#F5EAD9', '#D5A760']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summaryGradientCard}
        >
          <View style={styles.summarySectionBlock}>
            <Subtitle
              text="Title"
              size="medium"
              color="#1A1105"
              style={styles.serifLabel}
            />
            <Title
              text={title || 'Untitled'}
              size="large"
              color={COLORS.BLACK}
              fontFamily={FONT.TTForseSemiBold}
            />
          </View>

          <View style={styles.summarySectionBlock}>
            <Subtitle
              text="Label"
              size="medium"
              color="#1A1105"
              style={styles.serifLabel}
            />
            <Title
              text={label || 'No label'}
              size="medium"
              color={COLORS.BLACK}
              fontFamily={FONT.TTForseSemiBold}
            />
          </View>

          <View style={styles.noMarginBottom}>
            <Subtitle
              text="Description"
              size="medium"
              color={COLORS.BLACK}
              style={styles.serifLabel}
            />
            <Subtitle
              text={description || 'No description'}
              size="medium"
              color={COLORS.BLACK}
            />
          </View>

          {/* Duration for voice/video */}
          {(messageType === 'voice' || messageType === 'video') &&
            durationSeconds && (
              <View style={styles.noMarginBottom}>
                <Subtitle
                  text="Duration"
                  size="medium"
                  color={COLORS.BLACK}
                  style={styles.serifLabel}
                />
                <Subtitle
                  text={`${Math.floor(durationSeconds / 60)}m ${Math.round(
                    durationSeconds % 60,
                  )}s`}
                  size="medium"
                  color={COLORS.BLACK}
                />
              </View>
            )}

          {/* Document-specific fields */}
          {messageType === 'document' && (
            <>
              <View style={styles.summarySectionBlock}>
                <Subtitle
                  text="Categories"
                  size="medium"
                  color="#1A1105"
                  style={styles.serifLabel}
                />
                <Title
                  text={
                    categories?.length > 0
                      ? categories.join(', ')
                      : 'No categories'
                  }
                  size="medium"
                  color={COLORS.BLACK}
                  fontFamily={FONT.TTForseSemiBold}
                />
              </View>

              <View style={styles.summarySectionBlock}>
                <Subtitle
                  text="Importance Level"
                  size="medium"
                  color="#1A1105"
                  style={styles.serifLabel}
                />
                <Title
                  text={importanceLevel || 'Standard'}
                  size="medium"
                  color={COLORS.BLACK}
                  fontFamily={FONT.TTForseSemiBold}
                />
              </View>

              {whyImportant && (
                <View style={styles.noMarginBottom}>
                  <Subtitle
                    text="Why Important"
                    size="medium"
                    color={COLORS.BLACK}
                    style={styles.serifLabel}
                  />
                  <Subtitle
                    text={whyImportant}
                    size="medium"
                    color={COLORS.BLACK}
                  />
                </View>
              )}
            </>
          )}
        </LinearGradient>

        <View style={{ padding: Spacing.medium }}>
          <Button
            onPress={handleCreateTreasure}
            title={isSubmitting || isPending ? 'Saving...' : 'Save Treasure'}
            disabled={isSubmitting || isPending}
          />
        </View>

        {(isSubmitting || isPending) && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={COLORS.GOLD} />
            <AppText
              text="Saving your treasure..."
              size="medium"
              color={COLORS.WHITE}
              style={styles.loadingText}
            />
          </View>
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
  topHeaderSpacing: {
    marginTop: Responsive.height(48),
    marginBottom: Responsive.height(44),
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryGradientCard: {
    borderRadius: Radius.xLarge * 1.5,
    paddingVertical: Responsive.height(14),
    paddingHorizontal: Spacing.large,
    marginHorizontal: Spacing.medium,
  },
  summarySectionBlock: {
    marginBottom: Spacing.medium,
  },
  noMarginBottom: {
    marginBottom: 0,
  },
  serifLabel: {
    opacity: 0.9,
    marginBottom: 6,
  },
  attachedFileCard: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: Spacing.medium + 4,
    paddingHorizontal: Spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Responsive.height(32),
  },
  fileCardLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: Spacing.small,
  },
  miniFileIconBox: {
    width: Responsive.width(42),
    height: Responsive.width(42),
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileMetaDetailsColumn: {
    marginLeft: Spacing.small + 2,
    flex: 1,
  },
  statusSubtitleSpacing: {
    marginTop: 2,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  loadingText: {
    marginTop: Spacing.medium,
  },
});
