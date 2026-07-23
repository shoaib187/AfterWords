import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderWithSubtitle from '../../../components/common/headerWithSubtitle/headerWithSubtitle';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import Title from '../../../components/typography/title/title';
import ExistingCollections from '../../../components/treasures/existingCollections/existingCollections';
import { Responsive, Spacing } from '../../../components/constants/styles';

const COLLECTION_TYPES = [
  {
    id: 'videos',
    label: 'Videos',
    iconName: 'videocam-outline',
    lib: 'Ionicons',
  },
  { id: 'voice', label: 'Voice', iconName: 'mic-outline', lib: 'Ionicons' },
  { id: 'photos', label: 'Photos', iconName: 'image-outline', lib: 'Ionicons' },
  {
    id: 'documents',
    label: 'Documents',
    iconName: 'document-text-outline',
    lib: 'Ionicons',
  },
];

const EXISTING_COLLECTIONS = [
  {
    id: '1',
    title: "Grandpa's Life Lessons",
    date: 'Sep 04, 2025',
  },
  {
    id: '2',
    title: 'Family Reunion 2026',
    date: 'Jan 04, 2026',
  },
  {
    id: '3',
    title: 'Family Recipes',
    date: 'Jan 04, 2024',
  },
];

export default function AddToCollections({ navigation }) {
  const [selectedType, setSelectedType] = useState('videos');
  const [collectionName, setCollectionName] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderWithSubtitle
        title={'My Treasure'}
        navigation={navigation}
        subtitle={'Your Preserved Vault'}
      />
      <View style={styles.cardContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text style={styles.title}>Add to a Collection</Text>
          <AppText
            text="Organizing 'Advice for Michael'"
            size="small"
            color={COLORS.DARK_GRAY}
          />

          <Title
            text="Which type of Collection you want to Create?"
            size="small"
            color={COLORS.BLACK}
            style={{ marginTop: Spacing.large, marginBottom: Spacing.tiny }}
          />

          <View style={styles.typesGrid}>
            {COLLECTION_TYPES.map(type => {
              const isSelected = selectedType === type.id;
              return (
                <View key={type.id} style={styles.typeItem}>
                  <TouchableOpacity
                    style={[
                      styles.typeIconButton,
                      isSelected && styles.typeIconButtonSelected,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedType(type.id)}
                  >
                    <Ionicons
                      name={type.iconName}
                      size={Responsive.width(20)}
                      color={isSelected ? '#FFFFFF' : '#8C6C38'}
                    />
                  </TouchableOpacity>
                  <AppText
                    text={type.label}
                    style={[
                      styles.typeLabel,
                      isSelected && styles.typeLabelSelected,
                    ]}
                  />
                </View>
              );
            })}
          </View>

          {/* Section: Create New Collection */}
          <Title text={'Create New Collection'} style={styles.sectionTitle} />
          <View style={styles.createRow}>
            <TextInput
              style={styles.textInput}
              placeholder="e.g Grandpa’s Life Lessons"
              placeholderTextColor="#A89270"
              value={collectionName}
              onChangeText={setCollectionName}
            />
            <TouchableOpacity style={styles.createButton} activeOpacity={0.8}>
              <AppText text={'Create'} style={styles.createButtonText} />
            </TouchableOpacity>
          </View>

          {/* Section: Save To Existing */}
          <ExistingCollections />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 12,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#E2BD80', // Soft metallic gold theme accent background
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C150C',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#3B3020',
    marginBottom: 24,
  },
  sectionTitle: {
    color: COLORS.BLACK,
    marginBottom: Spacing.medium,
  },
  typesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  typeItem: {
    alignItems: 'center',
  },
  typeIconButton: {
    width: 58,
    height: 58,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#BD9E6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  typeIconButtonSelected: {
    backgroundColor: '#C8933A',
    borderColor: '#C8933A',
  },
  typeLabel: {
    fontSize: 12,
    color: '#5C482B',
  },
  typeLabelSelected: {
    fontWeight: 'bold',
    color: '#000000',
  },
  createRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 28,
  },
  textInput: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#B89660',
    paddingHorizontal: 18,
    fontSize: 14,
    color: '#000000',
    backgroundColor: 'transparent',
  },
  createButton: {
    backgroundColor: '#FFFFFF',
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#000000',
    letterSpacing: 0.5,
  },
  existingList: {
    gap: 12,
  },
  existingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F7EEDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  existingTextContainer: {
    flex: 1,
  },
  existingTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  existingDate: {
    fontSize: 12,
    color: '#666666',
  },
  dateValue: {
    color: '#222222',
  },
});
