import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  ActivityIndicator,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
import {
  useTreasure,
  useUpdateTreasure,
} from '../../../hooks/useTreasures/useTreasures';

export default function EditTreasure({ navigation, route }) {
  const { treasureId } = route?.params || {};
  const { data: treasureData } = useTreasure(treasureId);
  const treasure = treasureData?.data?.treasure || treasureData?.treasure || {};
  const { mutate: updateTreasure, isPending } = useUpdateTreasure();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract data from treasure
  const {
    type: messageType = treasure?.type || '',
    categories = treasure?.categories || [],
    importanceLevel = treasure?.importanceLevel || '',
    whyImportant = treasure?.whyImportant || '',
    durationSeconds = treasure?.durationSeconds || null,
    files = treasure?.files || [],
  } = treasure;

  // State for editable fields
  const [title, setTitle] = useState(treasure?.title || '');
  const [label, setLabel] = useState(treasure?.label || '');
  const [description, setDescription] = useState(treasure?.description || '');
  const [editedWhyImportant, setEditedWhyImportant] = useState(
    whyImportant || '',
  );
  const [editedImportanceLevel, setEditedImportanceLevel] = useState(
    importanceLevel || 'Standard',
  );
  const [editedCategories, setEditedCategories] = useState(
    categories?.length > 0 ? categories.join(', ') : '',
  );

  // Helper function to get file extension
  const getFileExtension = filename => {
    if (!filename) return '';
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  // Helper function to format file size
  const formatFileSize = bytes => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpdateTreasure = () => {
    try {
      setIsSubmitting(true);

      // Validate required fields
      if (!title?.trim()) {
        Alert.alert('Validation Error', 'Title is required');
        setIsSubmitting(false);
        return;
      }

      // Prepare payload - EXACT same structure as create
      const payload = {
        type: messageType,
        title: title.trim(),
      };

      // Add optional fields (same as create)
      if (label?.trim()) {
        payload.label = label.trim();
      }

      if (description?.trim()) {
        payload.description = description.trim();
      }

      // Add duration for voice and video (same as create)
      if (
        (messageType === 'voice' || messageType === 'video') &&
        durationSeconds
      ) {
        payload.durationSeconds = String(durationSeconds);
      }

      // Add document-specific fields (same as create)
      if (messageType === 'document') {
        if (editedCategories?.trim()) {
          payload.categories = editedCategories
            .split(',')
            .map(cat => cat.trim())
            .filter(cat => cat);
        }
        payload.importanceLevel = editedImportanceLevel || 'Standard';
        if (editedWhyImportant?.trim()) {
          payload.whyImportant = editedWhyImportant.trim();
        }
      }

      console.log('Update Payload:', payload);

      // Call the mutation
      updateTreasure(
        {
          id: treasureId,
          payload: payload,
        },
        {
          onSuccess: response => {
            setIsSubmitting(false);
            navigation.goBack();
          },
          onError: error => {
            console.error('Update Treasure Error:', error);
            let errorMessage = 'Failed to update treasure. Please try again.';

            if (error.response) {
              const status = error.response.status;
              const data = error.response.data;

              if (status === 400) {
                errorMessage =
                  data?.message || 'Invalid request. Please check your input.';
              } else if (status === 401) {
                errorMessage = 'Authentication failed. Please login again.';
              } else if (status === 500) {
                errorMessage = 'Server error. Please try again later.';
              } else {
                errorMessage =
                  data?.message ||
                  error.response.statusText ||
                  'Server error occurred';
              }
            } else if (error.request) {
              errorMessage = 'Network error. Please check your connection.';
            } else {
              errorMessage = error.message || 'An unexpected error occurred';
            }

            Alert.alert('Error', errorMessage);
            setIsSubmitting(false);
          },
        },
      );
    } catch (error) {
      console.error('Handle Update Treasure Error:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to update treasure. Please try again.',
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
        name: `${files?.length || 0} Photo(s)`,
        size: '',
        icon: 'image',
        typeLabel: 'Photo',
      };
    } else if (messageType === 'document' && files?.length > 0) {
      const file = files[0];
      return {
        name: file.originalName || 'Document',
        size: file.size ? formatFileSize(file.size) : '',
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

  const fileInfo = getFileDisplayInfo();

  // Get file URL for preview
  const getFileUrl = () => {
    if (files?.length > 0 && files[0]?.url) {
      return files[0].url;
    }
    return null;
  };

  const fileUrl = getFileUrl();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <HeaderBack title={'Edit Treasure'} />
      <GradientBackground />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.topHeaderSpacing}>
            <AppText
              text="EDIT YOUR TREASURE"
              size="medium"
              color={COLORS.WHITE}
              align="center"
            />
          </View>

          <View style={{ paddingHorizontal: Spacing.medium }}>
            {/* Photo Preview */}
            {messageType === 'photo' && fileUrl && (
              <Image
                source={{ uri: fileUrl }}
                style={{
                  alignSelf: 'center',
                  width: '100%',
                  height: Responsive.height(200),
                  borderRadius: Radius.xLarge,
                  marginBottom: Spacing.medium,
                }}
                resizeMode="cover"
              />
            )}

            {/* Voice Message Preview */}
            {messageType === 'voice' && fileUrl && (
              <VoiceMessageBubble audioUri={fileUrl} />
            )}

            {/* Video Preview - You might want to add a video player here */}
            {messageType === 'video' && fileUrl && (
              <View
                style={{
                  alignSelf: 'center',
                  width: '100%',
                  height: Responsive.height(200),
                  borderRadius: Radius.xLarge,
                  marginBottom: Spacing.medium,
                  backgroundColor: COLORS.DARK_GRAY,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon name="video" size={50} color={COLORS.WHITE} />
                <AppText
                  text="Video Preview"
                  size="small"
                  color={COLORS.WHITE}
                  style={{ marginTop: 10 }}
                />
              </View>
            )}

            {/* Document Preview */}
            {messageType === 'document' && files?.length > 0 && (
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
            {/* Title - Editable */}
            <View style={styles.summarySectionBlock}>
              <Subtitle
                text="Title"
                size="medium"
                color="#1A1105"
                style={styles.serifLabel}
              />
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
                placeholderTextColor="rgba(26, 17, 5, 0.5)"
                maxLength={100}
              />
            </View>

            {/* Label - Editable */}
            <View style={styles.summarySectionBlock}>
              <Subtitle
                text="Label"
                size="medium"
                color="#1A1105"
                style={styles.serifLabel}
              />
              <TextInput
                style={styles.input}
                value={label}
                onChangeText={setLabel}
                placeholder="Enter label"
                placeholderTextColor="rgba(26, 17, 5, 0.5)"
                maxLength={50}
              />
            </View>

            {/* Description - Editable */}
            <View style={styles.noMarginBottom}>
              <Subtitle
                text="Description"
                size="medium"
                color="#1A1105"
                style={styles.serifLabel}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
                placeholderTextColor="rgba(26, 17, 5, 0.5)"
                multiline
                numberOfLines={4}
                maxLength={500}
              />
            </View>

            {/* Duration for voice/video - Read-only */}
            {(messageType === 'voice' || messageType === 'video') &&
              durationSeconds && (
                <View style={styles.noMarginBottom}>
                  <Subtitle
                    text="Duration"
                    size="medium"
                    color="#1A1105"
                    style={styles.serifLabel}
                  />
                  <View style={styles.readOnlyField}>
                    <AppText
                      text={`${Math.floor(durationSeconds / 60)}m ${Math.round(
                        durationSeconds % 60,
                      )}s`}
                      size="medium"
                      color={COLORS.BLACK}
                      fontFamily={FONT.TTForseSemiBold}
                    />
                  </View>
                </View>
              )}

            {/* Document-specific fields - Editable */}
            {messageType === 'document' && (
              <>
                <View style={styles.summarySectionBlock}>
                  <Subtitle
                    text="Categories"
                    size="medium"
                    color="#1A1105"
                    style={styles.serifLabel}
                  />
                  <TextInput
                    style={styles.input}
                    value={editedCategories}
                    onChangeText={setEditedCategories}
                    placeholder="Enter categories (comma separated)"
                    placeholderTextColor="rgba(26, 17, 5, 0.5)"
                  />
                </View>

                <View style={styles.summarySectionBlock}>
                  <Subtitle
                    text="Importance Level"
                    size="medium"
                    color="#1A1105"
                    style={styles.serifLabel}
                  />
                  <TextInput
                    style={styles.input}
                    value={editedImportanceLevel}
                    onChangeText={setEditedImportanceLevel}
                    placeholder="Standard"
                    placeholderTextColor="rgba(26, 17, 5, 0.5)"
                  />
                </View>

                <View style={styles.noMarginBottom}>
                  <Subtitle
                    text="Why Important"
                    size="medium"
                    color="#1A1105"
                    style={styles.serifLabel}
                  />
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={editedWhyImportant}
                    onChangeText={setEditedWhyImportant}
                    placeholder="Why is this important?"
                    placeholderTextColor="rgba(26, 17, 5, 0.5)"
                    multiline
                    numberOfLines={3}
                    maxLength={500}
                  />
                </View>
              </>
            )}
          </LinearGradient>

          <View style={{ padding: Spacing.medium }}>
            <Button
              onPress={handleUpdateTreasure}
              title={
                isSubmitting || isPending ? 'Updating...' : 'Update Treasure'
              }
              disabled={isSubmitting || isPending}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {(isSubmitting || isPending) && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.GOLD} />
          <AppText
            text="Updating your treasure..."
            size="medium"
            color={COLORS.WHITE}
            style={styles.loadingText}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing.large,
  },
  topHeaderSpacing: {
    marginTop: Responsive.height(24),
    marginBottom: Responsive.height(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryGradientCard: {
    borderRadius: Radius.xLarge * 1.5,
    paddingVertical: Responsive.height(14),
    paddingHorizontal: Spacing.large,
    marginHorizontal: Spacing.medium,
    marginTop: Spacing.medium,
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
    marginBottom: Responsive.height(16),
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
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small,
    fontSize: 16,
    color: '#000000',
    fontFamily: FONT.TTForseRegular,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  textArea: {
    minHeight: Responsive.height(80),
    textAlignVertical: 'top',
    paddingTop: Spacing.small,
  },
  readOnlyField: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small,
  },
});
