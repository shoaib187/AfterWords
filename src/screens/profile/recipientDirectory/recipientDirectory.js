import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import AppText from '../../../components/typography/appText/appText';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import { FONT } from '../../../components/constants/font';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import { Button } from '../../../components/common/button/button';
import Title from '../../../components/typography/title/title';
import SearchBar from '../../../components/common/searchBar/searchBar';

const INITIAL_RECIPIENTS = [
  {
    id: '1',
    name: 'Sofia Chen',
    relation: 'Daughter',
    initial: 'S',
    color: '#E25C5C',
  },
  {
    id: '2',
    name: 'James Whitfield',
    relation: 'Son',
    initial: 'J',
    color: '#C59353',
  },
  {
    id: '3',
    name: 'Marcus Lee',
    relation: 'Spouse',
    initial: 'M',
    color: '#26DE81',
  },
  {
    id: '4',
    name: 'Abigail Torres',
    relation: 'Granddaughter',
    initial: 'A',
    color: '#A55EEA',
  },
  {
    id: '5',
    name: 'Robert Whitfield',
    relation: 'Brother',
    initial: 'R',
    color: '#888888',
  },
];

export default function RecipientDirectory({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState(['1', '2']);

  const toggleRecipient = id => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(197, 147, 83, 0.25)', 'rgba(0, 0, 0, 0)']}
        style={styles.headerGlowBackground}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <HeaderBack title={'Recipient Directory'} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <SearchBar />

        <AppText text="SAVED RECIPIENTS" style={styles.sectionHeaderTitle} />
        <TouchableOpacity
          onPress={() => navigation.navigate('NewRecipient')}
          style={styles.addNewRecipientRow}
          activeOpacity={0.8}
        >
          <View style={styles.addIconCircle}>
            <Ionicons
              name="person-add-outline"
              size={Responsive.width(16)}
              color="#C59353"
            />
          </View>
          <AppText
            text="Add new recipient"
            style={styles.addNewRecipientText}
          />
        </TouchableOpacity>

        <View style={styles.recipientsListWrapper}>
          {INITIAL_RECIPIENTS.filter(r =>
            r.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ).map(recipient => {
            return (
              <TouchableOpacity
                key={recipient.id}
                activeOpacity={0.9}
                onPress={() => toggleRecipient(recipient.id)}
                style={styles.cardTouchWrapper}
              >
                <LinearGradient
                  colors={['#F5EAD9', '#D5A760']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.recipientCardContainer}
                >
                  <View style={styles.cardInnerFlexRow}>
                    <View
                      style={[
                        styles.avatarCircle,
                        {
                          borderColor: 'rgba(0,0,0,0.1)',
                          backgroundColor: 'rgba(255,255,255,0.4)',
                        },
                      ]}
                    >
                      <Title text={recipient.initial} color={recipient.color} />
                    </View>

                    <View style={styles.recipientInfoTextContainer}>
                      <AppText
                        text={recipient.name}
                        style={[styles.recipientNameText, { color: '#1A1105' }]}
                      />
                      <AppText
                        text={recipient.relation}
                        size="tiny"
                        color={COLORS.DARK_GRAY}
                      />
                    </View>

                    <Ionicons
                      name="edit"
                      size={Responsive.width(14)}
                      color="#C59353"
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
        <Button
          onPress={() => navigation.navigate('Review')}
          title="Save & Seal"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerGlowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Responsive.height(200),
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: Spacing.medium || 16,
    paddingBottom: Responsive.height(40),
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Radius.large || 12,
    paddingHorizontal: Spacing.medium || 14,
    height: Responsive.height(40),
    marginTop: Responsive.height(8),
    marginBottom: Responsive.height(28),
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInputField: {
    flex: 1,
    color: COLORS.WHITE,
    fontSize: FontSize.medium || 14,
    fontFamily: FONT.TTForseRegular,
    padding: 0,
  },
  sectionHeaderTitle: {
    fontSize: FontSize.small || 12,
    letterSpacing: 1.2,
    marginBottom: Spacing.medium || 14,
  },
  addNewRecipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.35)',
    borderRadius: Radius.xLarge || 20,
    padding: Spacing.medium || 16,
    marginBottom: Responsive.height(16),
  },
  addIconCircle: {
    width: Responsive.width(34),
    height: Responsive.width(34),
    borderRadius: Responsive.width(17),
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.4)',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.medium || 12,
  },
  addNewRecipientText: {
    color: COLORS.GOLD || '#C59353',
    fontSize: FontSize.medium || 14,
    fontFamily: FONT.TTForseSemiBold,
    fontWeight: '600',
  },
  recipientsListWrapper: {
    width: '100%',
    marginBottom: Responsive.height(28),
  },
  cardTouchWrapper: {
    width: '100%',
    marginBottom: Responsive.height(14),
  },
  recipientCardContainer: {
    width: '100%',
    borderRadius: Radius.xLarge || 20,
    padding: Spacing.medium || 16,
  },
  recipientCardUnselected: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.35)',
  },
  cardInnerFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarCircle: {
    width: Responsive.width(42),
    height: Responsive.width(42),
    borderRadius: Responsive.width(21),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.medium || 12,
  },
  avatarText: {
    fontSize: FontSize.medium || 15,
    fontWeight: '600',
    fontFamily: 'Georgia',
  },
  recipientInfoTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  recipientNameText: {
    fontSize: FontSize.medium || 15,
    fontFamily: FONT.TTForseSemiBold,
    marginBottom: 2,
  },
  recipientRelationText: {
    fontSize: FontSize.tiny || 11,
    fontFamily: FONT.TTForseRegular,
  },
  // Custom styled matching checkboxes
  checkboxContainer: {
    width: Responsive.width(22),
    height: Responsive.width(22),
    borderRadius: Radius.small || 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainerChecked: {
    backgroundColor: '#FFFFFF',
  },
  checkboxContainerUnselected: {
    borderWidth: 1.5,
    borderColor: 'rgba(197, 147, 83, 0.6)',
    backgroundColor: 'transparent',
  },
  saveSealButton: {
    width: '100%',
    height: Responsive.height(50),
    backgroundColor: '#C59353',
    borderRadius: Radius.full || 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Responsive.height(12),
  },
  saveSealButtonText: {
    color: '#FFFFFF',
    fontSize: FontSize.medium || 15,
    fontFamily: FONT.TTForseBold,
    fontWeight: '700',
  },
});
