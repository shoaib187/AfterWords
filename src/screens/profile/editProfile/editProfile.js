import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import GradientWrapper from '../../../components/common/gradientWrapper/gradientWrapper';
import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import { FONT } from '../../../components/constants/font';

const DetailField = ({ label, value, icon = null }) => (
  <View style={styles.detailField}>
    <View style={styles.detailFieldLeft}>
      {icon}
      <AppText
        text={label}
        style={[styles.fieldLabel, icon ? { marginLeft: 8 } : null]}
      />
    </View>
    <Text style={styles.fieldValue} numberOfLines={1}>
      {value}
    </Text>
  </View>
);

export default function EditProfile() {
  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderBack title={'Personal Profile'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GradientWrapper wrapperStyle={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Title text={'E'} style={styles.avatarInitial} />
          </View>
          <Title text={'Eleanor Whitfield'} style={styles.profileName} />
          <AppText text="Premium Member" style={styles.premiumMemberLabel} />
        </GradientWrapper>

        <View style={styles.sectionHeaderRow}>
          <Title text={'PERSONAL DETAILS'} style={styles.sectionTitle} />
          <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
            <Feather
              name="edit-3"
              size={Responsive.width(16)}
              color={COLORS.BLACK}
            />
            <AppText text={'Edit'} style={styles.editButtonText} />
          </TouchableOpacity>
        </View>

        {/* Personal Details Fields */}
        <View style={styles.fieldsContainer}>
          <DetailField label="First Name" value="Eleanor" />
          <DetailField label="Last Name" value="Whitfield" />
          <DetailField label="Date of Birth" value="October 12, 1945" />
        </View>

        {/* Section Header: Contact Details */}
        <View style={styles.sectionHeaderRow}>
          <Title text={'CONTACT DETAILS'} style={styles.sectionTitle} />
        </View>

        {/* Contact Details Fields */}
        <View style={styles.fieldsContainer}>
          <DetailField
            label="Email"
            value="eleanor.w@example.co.."
            icon={<Ionicons name="mail-outline" size={18} color="#D1D5DB" />}
          />
          <DetailField
            label="Phone"
            value="+1(555) **** 34565"
            icon={
              <MaterialCommunityIcons
                name="cellphone"
                size={18}
                color="#D1D5DB"
              />
            }
          />
          <DetailField
            label="Address"
            value="142 Heritage Way Il"
            icon={
              <Ionicons name="location-outline" size={18} color="#D1D5DB" />
            }
          />
        </View>
      </ScrollView>

      {/* Floating Action Button (FAB) and Bottom Tabs Area */}
      <View style={styles.bottomAreaContainer}>
        {/* Simplified representaiton of the bottom nav from the screenshots context */}
        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fab}>
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  scrollContent: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.large,
    paddingBottom: 120, // Add padding for bottom nav space
  },
  /* Profile Card Styles */
  profileCard: {
    borderRadius: Radius.xLarge,
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.medium,
    alignItems: 'center',
    marginBottom: Spacing.xLarge,
    borderWidth: 2,
  },
  avatarCircle: {
    width: Responsive.width(80),
    height: Responsive.width(80),
    borderRadius: Radius.circle,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },
  avatarInitial: {
    fontFamily: 'serif',
    fontSize: 36,
    color: '#000000',
    fontWeight: 'normal',
  },
  profileName: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  premiumMemberLabel: {
    fontSize: 12,
    color: '#E05A47', // Matching the red/orange text color from premium badge
    fontWeight: '600',
  },
  /* Section Header Styles */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: FontSize.small,
    letterSpacing: 0.5,
  },
  editButton: {
    backgroundColor: '#D1A354', // Matching the dark gold edit button
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  editButtonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '600',
  },
  /* Field Container Styles */
  fieldsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  detailField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Responsive.height(50),

    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    paddingHorizontal: Spacing.medium,
  },
  detailFieldLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 14,
  },
  fieldValue: {
    color: COLORS.WHITE,
    fontSize: FontSize.medium,
    maxWidth: '70%',
    fontFamily: FONT.TTForseMedium,
  },
  /* FAB Container and Styles */
  bottomAreaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100, // Matching the area for bottom nav/FAB
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabContainer: {
    // The FAB floats over the nav bar
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#C8933A', // Gold FAB
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000000',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
