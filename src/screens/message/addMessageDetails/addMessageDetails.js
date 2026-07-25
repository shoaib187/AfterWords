import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import InputField from '../../../components/common/inputField/inputField';
import { Button } from '../../../components/common/button/button';
import { COLORS } from '../../../components/constants/color';
import { Spacing } from '../../../components/constants/styles';
import Description from '../../../components/common/description/description';
import { useToast } from '../../../configs/toastContext/toastContext';

export default function AddMessageDetails({ navigation, route }) {
  const { messageType } = route?.params || {};
  const audioFilePath = route?.params?.audioFilePath || null;
  const videoFilePath = route?.params?.videoPath;

  const photoFiles = route?.params?.photoFiles || [];
  const documentFile = route?.params?.documentFile || null;
  const { showToast } = useToast();

  console.log('object', videoFilePath);

  // Form state
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');

  // For document type - categories
  const [categories, setCategories] = useState([]);
  const [importanceLevel, setImportanceLevel] = useState('Standard');
  const [whyImportant, setWhyImportant] = useState('');

  const handleReview = () => {
    // Validate required fields
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title for your treasure');
      return;
    }

    // For documents, categories are required
    if (messageType === 'document' && categories.length === 0) {
      Alert.alert('Validation Error', 'Please select at least one category');
      return;
    }

    // For voice and video, ensure file exists
    if (messageType === 'voice' && !audioFilePath) {
      Alert.alert('Validation Error', 'No voice recording found');
      return;
    }

    if (messageType === 'video' && !videoFilePath) {
      Alert.alert('Validation Error', 'No video recording found');
      return;
    }

    // For photos, ensure at least one photo exists
    if (messageType === 'photo' && photoFiles.length === 0) {
      Alert.alert('Validation Error', 'No photos selected');
      return;
    }

    // For documents, ensure document file exists
    if (messageType === 'document' && !documentFile) {
      Alert.alert('Validation Error', 'No document selected');
      return;
    }

    // Navigate to Review screen with all data
    navigation.navigate('Review', {
      // Message type and files
      messageType,
      audioFilePath,
      videoFilePath,
      photoFiles,
      documentFile,

      // Form fields
      title: title.trim(),
      label: label.trim(),
      description: description.trim(),

      // Document-specific fields
      categories,
      importanceLevel,
      whyImportant: whyImportant.trim(),

      // Additional metadata
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <GradientBackground />

      <HeaderBack title="Add message details" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Title text={'Add Details'} style={styles.title} />
          <AppText
            text="Help Organize your treasure"
            size="medium"
            color={COLORS.GREY_400}
            style={styles.subtitle}
          />
        </View>

        <View style={styles.formContainer}>
          <InputField
            label="Title *"
            placeholder="Advice for ..."
            containerStyle={styles.inputContainer}
            value={title}
            onChangeText={setTitle}
          />

          <InputField
            label="Label (optional)"
            placeholder="Life lesson"
            containerStyle={styles.inputContainer}
            value={label}
            onChangeText={setLabel}
          />

          <Description
            label="Description (optional)"
            placeholder="Life lesson"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Document-specific fields */}
          {messageType === 'document' && (
            <>
              <InputField
                label="Categories *"
                placeholder="e.g. Family Records, Financial & Insurance"
                containerStyle={styles.inputContainer}
                value={categories.join(', ')}
                onChangeText={text => {
                  const cats = text
                    .split(',')
                    .map(c => c.trim())
                    .filter(Boolean);
                  setCategories(cats);
                }}
                helperText="Separate categories with commas"
              />

              <InputField
                label="Importance Level"
                placeholder="Standard"
                containerStyle={styles.inputContainer}
                value={importanceLevel}
                onChangeText={setImportanceLevel}
              />

              <Description
                label="Why is this document important?"
                placeholder="Explain why this document matters..."
                multiline
                value={whyImportant}
                onChangeText={setWhyImportant}
              />
            </>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Review Treasure" onPress={handleReview} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.large,
    paddingBottom: Spacing.xLarge * 2,
  },
  headerContainer: {
    marginTop: Spacing.medium,
    marginBottom: Spacing.xLarge,
  },
  title: {
    marginBottom: Spacing.small,
  },
  subtitle: {
    opacity: 0.7,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: Spacing.medium,
  },
  buttonContainer: {
    marginTop: Spacing.xLarge,
    width: '100%',
  },
});
