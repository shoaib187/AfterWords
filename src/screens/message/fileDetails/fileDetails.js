import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { FONT } from '../../../components/constants/font';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import { Button } from '../../../components/common/button/button';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import InputField from '../../../components/common/inputField/inputField';
import Description from '../../../components/common/description/description';

export default function FileDetails({ navigation, route }) {
  // State for all form fields
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImportance, setSelectedImportance] = useState(null);
  const [whyImportant, setWhyImportant] = useState('');

  // Incoming file from document picker
  const incomingFile = route?.params?.documentFile || null;

  // Categories data
  // Family Records, Financial &amp; Insurance, Real Estate, Legal &amp;
  //  , Medical Information, Business Records,
  // Military Records, Education Records, Personal Instructions, Family History
  const categories = [
    {
      id: 'Real Estate',
      label: 'Real Estate',
      icon: 'home-variant',
    },
    {
      id: 'Financial',
      label: 'Financial &\nInsurance',
      icon: 'shield-check',
    },
    { id: 'Insurance', label: 'Insurance', icon: 'file-document' },
    { id: 'Legal Estate', label: 'Legal & Estate', icon: 'file-document' },
    { id: 'Family Records', label: 'Family Records', icon: 'heart-home' },
  ];

  // Importance levels
  const importanceLevels = [
    { id: 'Standard', label: 'Standard', icon: 'star-outline' },
    { id: 'Important', label: 'Important', icon: 'star-half-full' },
    { id: 'Critical', label: 'Critical', icon: 'star' },
  ];

  const handleClearFile = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    // Validate required fields
    if (!title?.trim()) {
      Alert.alert('Validation Error', 'Please enter a title for your document');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('Validation Error', 'Please select a category');
      return;
    }

    if (!selectedImportance) {
      Alert.alert('Validation Error', 'Please select an importance level');
      return;
    }

    // Navigate to review with all data
    navigation.navigate('Review', {
      messageType: 'document',
      documentFile: incomingFile,
      title: title.trim(),
      label: label?.trim() || '',
      description: description?.trim() || '',
      categories: [selectedCategory], // Send as array
      importanceLevel: selectedImportance,
      whyImportant: whyImportant?.trim() || '',
    });
  };

  // Get category label
  const getCategoryLabel = id => {
    const category = categories.find(c => c.id === id);
    return category ? category.label : id;
  };

  // Get importance label
  const getImportanceLabel = id => {
    const level = importanceLevels.find(l => l.id === id);
    return level ? level.label : id;
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />

      <HeaderBack title={'Document'} />
      <View style={styles.safeAreaContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.sectionTitleRow}>
            <View style={styles.purpleStatusDot} />
            <AppText
              text="Upload a file or PDF"
              size="medium"
              fontFamily={FONT.TTForseSemiBold}
              color={COLORS.WHITE}
            />
          </View>

          {/* Metallic Attached File Status Card */}
          <LinearGradient
            colors={['#EEDBB2', '#C59353']}
            style={styles.attachedFileCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.fileCardLeftRow}>
              <View style={styles.miniFileIconBox}>
                <Icon name="file-document-outline" size={22} color="#CD974A" />
              </View>
              <View style={styles.fileMetaDetailsColumn}>
                <AppText
                  text={incomingFile?.name || 'No file selected'}
                  size="medium"
                  color="#000000"
                  fontFamily={FONT.TTForseSemiBold}
                  numberOfLines={1}
                />
                <AppText
                  text={
                    incomingFile?.size
                      ? `${(incomingFile.size / 1024 / 1024).toFixed(
                          2,
                        )} MB · Ready to attach`
                      : 'Ready to attach'
                  }
                  size="small"
                  color="rgba(0, 0, 0, 0.6)"
                  fontFamily={FONT.TTForseMedium}
                  style={styles.statusSubtitleSpacing}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.clearCardCrossButton}
              onPress={handleClearFile}
              activeOpacity={0.7}
            >
              <Icon name="close" size={Responsive.width(20)} color="#000000" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Title Input */}
          <View style={styles.inputFieldBlock}>
            <InputField
              label={'Title'}
              placeholder="e.g house deed, insurance policy"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Category Selection */}
          <View style={styles.categoryBlockWrapper}>
            <AppText
              text="Category (Organization)"
              size="medium"
              color={COLORS.WHITE}
              style={styles.categoryLabel}
            />

            <View style={styles.categoryGrid}>
              {categories.map(item => {
                const isSelected = selectedCategory === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.categoryGridCell,
                      isSelected && styles.selectedCategoryCell,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedCategory(item.id)}
                  >
                    <View
                      style={[
                        styles.cellIconFrame,
                        isSelected
                          ? styles.selectedIconFrame
                          : styles.unselectedIconFrame,
                      ]}
                    >
                      <Icon
                        name={item.icon}
                        size={Responsive.width(20)}
                        color={isSelected ? COLORS.BLACK : '#D5A760'}
                      />
                    </View>
                    <AppText
                      text={item.label}
                      size="small"
                      color={COLORS.WHITE}
                      fontFamily={FONT.TTForseMedium}
                      style={styles.categoryText}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Importance Level Selection */}
          <View style={styles.categoryBlockWrapper}>
            <AppText
              text="Importance Level"
              size="medium"
              color={COLORS.WHITE}
              style={styles.categoryLabel}
            />

            <View style={styles.categoryGrid}>
              {importanceLevels.map(item => {
                const isSelected = selectedImportance === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.categoryGridCell,
                      isSelected && styles.selectedCategoryCell,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedImportance(item.id)}
                  >
                    <View
                      style={[
                        styles.cellIconFrame,
                        isSelected
                          ? styles.selectedIconFrame
                          : styles.unselectedIconFrame,
                      ]}
                    >
                      <Icon
                        name={item.icon}
                        size={Responsive.width(20)}
                        color={isSelected ? COLORS.BLACK : '#D5A760'}
                      />
                    </View>
                    <AppText
                      text={item.label}
                      size="small"
                      color={COLORS.WHITE}
                      fontFamily={FONT.TTForseMedium}
                      style={styles.categoryText}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Label Input */}
          <View style={styles.inputFieldBlock}>
            <InputField
              label={'Label (Optional)'}
              placeholder="e.g personal, work, family"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={label}
              onChangeText={setLabel}
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputFieldBlock}>
            <Description
              label={'Description (Optional)'}
              placeholder="Add a brief description of this document"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Why Important Input */}
          <View style={styles.inputFieldBlock}>
            <Description
              label={'Why is this important? (Optional)'}
              placeholder="Explain why this document matters"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={whyImportant}
              onChangeText={setWhyImportant}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footerActionWrapper}>
        <Button title={'Review document'} onPress={handleContinue} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  headerGlowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(260),
    zIndex: 0,
  },
  safeAreaContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Responsive.height(24),
    paddingHorizontal: Spacing.medium,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Responsive.height(16),
    marginBottom: Responsive.height(20),
  },
  purpleStatusDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.circle,
    backgroundColor: '#C084FC',
    marginRight: Spacing.small,
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
  clearCardCrossButton: {
    width: Responsive.width(28),
    height: Responsive.width(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFieldBlock: {
    width: '100%',
    marginBottom: Responsive.height(24),
  },
  categoryBlockWrapper: {
    width: '100%',
    marginBottom: Responsive.height(24),
  },
  categoryLabel: {
    marginBottom: Spacing.small,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Spacing.small,
  },
  categoryGridCell: {
    width: '48%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small - 2,
    marginBottom: Responsive.height(14),
  },
  selectedCategoryCell: {
    borderColor: '#C59353',
    backgroundColor: 'rgba(197, 147, 83, 0.08)',
  },
  cellIconFrame: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.small - 2,
  },
  unselectedIconFrame: {
    backgroundColor: 'rgba(213, 167, 96, 0.1)',
  },
  selectedIconFrame: {
    backgroundColor: '#D5A760',
  },
  categoryText: {
    // flex: 1,
    textAlign: 'center',
  },
  footerActionWrapper: {
    paddingHorizontal: Spacing.medium,
    marginBottom: Responsive.height(24),
  },
});

// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   StatusBar,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import LinearGradient from 'react-native-linear-gradient';

// import Title from '../../../components/typography/title/title';
// import AppText from '../../../components/typography/appText/appText';
// import { COLORS } from '../../../components/constants/color';
// import {
//   FontSize,
//   Radius,
//   Responsive,
//   Spacing,
// } from '../../../components/constants/styles';
// import { FONT } from '../../../components/constants/font';
// import HeaderBack from '../../../components/common/headerBack/headerBack';
// import Stepper from '../../../components/messages/stepper/stepper';
// import { Button } from '../../../components/common/button/button';
// import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
// import InputField from '../../../components/common/inputField/inputField';
// import Description from '../../../components/common/description/description';

// export default function FileDetails({ navigation, route }) {
//   const [documentName, setDocumentName] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // Incoming parameters from your document picker step setup
//   const incomingFile = route?.params?.documentFile || {
//     name: 'Eleanor_Will_2025.pdf',
//     size: '2.4 MB',
//   };

//   const categories = [
//     { id: 'real_estate', label: 'Real Estate', icon: 'home-variant' },
//     {
//       id: 'financial_insurance',
//       label: 'Financial &\nInsurance',
//       icon: 'shield-check',
//     },
//     { id: 'legal_estate', label: 'Legal & Estate', icon: 'file-document' },
//     { id: 'family_records', label: 'Family Records', icon: 'heart-home' },
//   ];

//   const handleClearFile = () => {
//     navigation.goBack();
//   };

//   const handleContinue = () => {
//     navigation?.navigate('Review', { messageType: 'document' });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <GradientBackground />

//       <HeaderBack title={'Document'} />
//       <View style={styles.safeAreaContainer}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           <View style={styles.sectionTitleRow}>
//             <View style={styles.purpleStatusDot} />
//             <AppText
//               text="Upload a file or PDF"
//               size="medium"
//               fontFamily={FONT.TTForseSemiBold}
//               color={COLORS.WHITE}
//             />
//           </View>

//           {/* Metallic Attached File Status Card */}
//           <LinearGradient
//             colors={['#EEDBB2', '#C59353']}
//             style={styles.attachedFileCard}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//           >
//             <View style={styles.fileCardLeftRow}>
//               <View style={styles.miniFileIconBox}>
//                 <Icon name="file-document-outline" size={22} color="#CD974A" />
//               </View>
//               <View style={styles.fileMetaDetailsColumn}>
//                 <AppText
//                   text={incomingFile?.name || 'Eleanor_Will_2025.pdf'}
//                   size="medium"
//                   color="#000000"
//                   fontFamily={FONT.TTForseSemiBold}
//                   numberOfLines={1}
//                 />
//                 <AppText
//                   text={`${incomingFile?.size || '2.4 MB'} · Ready to attach`}
//                   size="small"
//                   color="rgba(0, 0, 0, 0.6)"
//                   fontFamily={FONT.TTForseMedium}
//                   style={styles.statusSubtitleSpacing}
//                 />
//               </View>
//             </View>

//             <TouchableOpacity
//               style={styles.clearCardCrossButton}
//               onPress={handleClearFile}
//               activeOpacity={0.7}
//             >
//               <Icon name="close" size={Responsive.width(20)} color="#000000" />
//             </TouchableOpacity>
//           </LinearGradient>

//           {/* Input Block: Document Name */}
//           <View style={styles.inputFieldBlock}>
//             <InputField
//               label={'Title'}
//               placeholder="e.g house deed, file insurance"
//               placeholderTextColor="rgba(255, 255, 255, 0.4)"
//               value={documentName}
//               onChangeText={setDocumentName}
//             />
//           </View>

//           {/* Grid Selection Block: Category (Organization) */}
//           <View style={styles.categoryBlockWrapper}>
//             <AppText
//               text="Category (Organization)"
//               size="medium"
//               color={COLORS.WHITE}
//             />

//             <View style={styles.categoryGrid}>
//               {categories.map(item => {
//                 const isSelected = selectedCategory === item.id;
//                 return (
//                   <TouchableOpacity
//                     key={item.id}
//                     style={[
//                       styles.categoryGridCell,
//                       isSelected && styles.selectedCategoryCell,
//                     ]}
//                     activeOpacity={0.8}
//                     onPress={() => setSelectedCategory(item.id)}
//                   >
//                     <View
//                       style={[
//                         styles.cellIconFrame,
//                         isSelected
//                           ? styles.selectedIconFrame
//                           : styles.unselectedIconFrame,
//                       ]}
//                     >
//                       <Icon
//                         name={item.icon}
//                         size={Responsive.width(20)}
//                         color={isSelected ? COLORS.BLACK : '#D5A760'}
//                       />
//                     </View>
//                     <AppText
//                       text={item.label}
//                       size="small"
//                       color={COLORS.WHITE}
//                       fontFamily={FONT.TTForseMedium}
//                     />
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//           <View style={styles.categoryBlockWrapper}>
//             <AppText
//               text="Importance Level"
//               size="medium"
//               color={COLORS.WHITE}
//             />

//             <View style={styles.categoryGrid}>
//               {categories.map(item => {
//                 const isSelected = selectedCategory === item.id;
//                 return (
//                   <TouchableOpacity
//                     key={item.id}
//                     style={[
//                       styles.categoryGridCell,
//                       isSelected && styles.selectedCategoryCell,
//                     ]}
//                     activeOpacity={0.8}
//                     onPress={() => setSelectedCategory(item.id)}
//                   >
//                     <View
//                       style={[
//                         styles.cellIconFrame,
//                         isSelected
//                           ? styles.selectedIconFrame
//                           : styles.unselectedIconFrame,
//                       ]}
//                     >
//                       <Icon
//                         name={item.icon}
//                         size={Responsive.width(20)}
//                         color={isSelected ? COLORS.BLACK : '#D5A760'}
//                       />
//                     </View>
//                     <AppText
//                       text={item.label}
//                       size="small"
//                       color={COLORS.WHITE}
//                       fontFamily={FONT.TTForseMedium}
//                     />
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//           <InputField
//             label={'Label'}
//             placeholder="e.g house deed, file insurance"
//             placeholderTextColor="rgba(255, 255, 255, 0.4)"
//             value={documentName}
//             onChangeText={setDocumentName}
//           />
//           <Description
//             label={'Description (Optional)'}
//             placeholder="e.g house deed, file insurance"
//             placeholderTextColor="rgba(255, 255, 255, 0.4)"
//             value={documentName}
//             onChangeText={setDocumentName}
//           />
//           <Description
//             label={'Description (Optional)'}
//             placeholder="e.g house deed, file insurance"
//             placeholderTextColor="rgba(255, 255, 255, 0.4)"
//             value={documentName}
//             onChangeText={setDocumentName}
//           />
//         </ScrollView>
//       </View>

//       <View style={styles.footerActionWrapper}>
//         <Button title={'Review document'} onPress={handleContinue} />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.BLACK,
//   },
//   headerGlowBackground: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: Responsive.height(260),
//     zIndex: 0,
//   },
//   safeAreaContainer: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingBottom: Responsive.height(24),
//     paddingHorizontal: Spacing.medium,
//   },
//   sectionTitleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: Responsive.height(16),
//     marginBottom: Responsive.height(20),
//   },
//   purpleStatusDot: {
//     width: 7,
//     height: 7,
//     borderRadius: Radius.circle,
//     backgroundColor: '#C084FC',
//     marginRight: Spacing.small,
//   },
//   attachedFileCard: {
//     width: '100%',
//     borderRadius: 24,
//     paddingVertical: Spacing.medium + 4,
//     paddingHorizontal: Spacing.medium,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: Responsive.height(32),
//   },
//   fileCardLeftRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     paddingRight: Spacing.small,
//   },
//   miniFileIconBox: {
//     width: Responsive.width(42),
//     height: Responsive.width(42),
//     borderRadius: 12,
//     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fileMetaDetailsColumn: {
//     marginLeft: Spacing.small + 2,
//     flex: 1,
//   },
//   statusSubtitleSpacing: {
//     marginTop: 2,
//   },
//   clearCardCrossButton: {
//     width: Responsive.width(28),
//     height: Responsive.width(28),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   inputFieldBlock: {
//     width: '100%',
//     marginBottom: Responsive.height(32),
//   },
//   fieldLabel: {
//     fontFamily: 'Georgia',
//     fontSize: 18,
//     marginBottom: Responsive.height(14),
//     paddingLeft: 2,
//   },
//   singleLineInput: {
//     height: Responsive.height(54),
//     borderRadius: Radius.xLarge,
//     borderWidth: 1,
//     borderColor: '#C59353',
//     backgroundColor: 'rgba(255, 255, 255, 0.01)',
//     color: COLORS.WHITE,
//     paddingHorizontal: Spacing.medium,
//     fontSize: FontSize.medium,
//     fontFamily: FONT.TTForseMedium,
//     marginTop: Spacing.small,
//   },
//   categoryBlockWrapper: {
//     width: '100%',
//   },
//   categoryGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: Spacing.small,
//   },
//   categoryGridCell: {
//     width: '48%',
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(197, 147, 83, 0.4)',
//     backgroundColor: 'rgba(255, 255, 255, 0.01)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: Spacing.small,
//     paddingVertical: Spacing.small - 2,
//     marginBottom: Responsive.height(14),
//   },
//   selectedCategoryCell: {
//     borderColor: '#C59353',
//     backgroundColor: 'rgba(197, 147, 83, 0.08)',
//   },
//   cellIconFrame: {
//     width: Responsive.width(40),
//     height: Responsive.width(40),
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: Spacing.small - 2,
//   },
//   unselectedIconFrame: {
//     backgroundColor: 'rgba(213, 167, 96, 0.1)',
//   },
//   selectedIconFrame: {
//     backgroundColor: '#D5A760',
//   },
//   gridCellText: {
//     flex: 1,
//     fontSize: 13,
//     lineHeight: 16,
//   },
//   footerActionWrapper: {
//     paddingHorizontal: Spacing.medium,
//     marginBottom: Responsive.height(24),
//   },
// });
