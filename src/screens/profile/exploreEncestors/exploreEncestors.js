import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import GradientWrapper from '../../../components/common/gradientWrapper/gradientWrapper';
import { Responsive } from '../../../components/constants/styles';
import AppText from '../../../components/typography/appText/appText';
import MenuItem from '../../../components/profile/menuItem/menuItem';
import { COLORS } from '../../../components/constants/color';

const LINEAGE_DATA = [
  {
    sectionTitle: 'GENERATIONS 1 (PARENTS)',
    members: [
      {
        id: '1',
        name: 'Arthur Whitfield',
        relationship: 'Father',
        years: '1942 - 2018',
        icon: 'account-circle-outline',
      },
      {
        id: '2',
        name: 'Eleanor Davis Whitfield',
        relationship: 'Mother',
        years: '1945 - Present',
        icon: 'account-circle-outline',
      },
    ],
  },
  {
    sectionTitle: 'GENERATIONS 2 (GRANDPARENTS)',
    members: [
      {
        id: '3',
        name: 'Whitfield Thomas',
        relationship: 'Paternal Grandfather',
        years: null,
        icon: 'account-circle-outline',
      },
    ],
  },
];

export default function ExploreEncestors() {
  const handleMemberPress = member => {
    console.log('Selected member:', member.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Explore Ancestors'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GradientWrapper wrapperStyle={styles.lineageBanner}>
          <MaterialCommunityIcons
            name="sitemap-outline"
            size={Responsive.width(32)}
          />
          <Text style={styles.bannerTitle}>Your Lineage</Text>
          <AppText
            text={'Tracing back the generations that built your family legacy.'}
            style={styles.bannerSubtitle}
          />
        </GradientWrapper>

        {/* Dynamic Generation Groups */}
        {LINEAGE_DATA.map(group => (
          <View key={group.sectionTitle} style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>{group.sectionTitle}</Text>

            <View style={styles.membersList}>
              {group.members.map(member => (
                <MenuItem
                  icon={member.icon || 'account-circle-outline'}
                  title={member.name}
                  description={`${member.relationship}${
                    member.years ? ` ${member.years}` : ''
                  }`}
                  key={member.id}
                  onPress={() => handleMemberPress(member)}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  /* Lineage Banner */
  lineageBanner: {
    backgroundColor: '#D1A354',
    borderRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 32,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  bannerTitle: {
    fontSize: 22,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#3B2A10',
    textAlign: 'center',
    lineHeight: 18,
  },

  /* Generation Sections */
  sectionContainer: {
    marginBottom: 28,
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  membersList: {
    gap: 12,
  },

  /* Member Card */
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 72,
    backgroundColor: '#000000',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#3B301B',
    paddingHorizontal: 16,
  },
  avatarBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1C160B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  memberSubtitle: {
    color: '#A0A0A0',
    fontSize: 12,
  },
});
