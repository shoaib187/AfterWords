import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
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
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import { useRecipients } from '../../../hooks/useRecipient/useRecipient';

const getColorFromName = name => {
  const colors = [
    '#E25C5C',
    '#C59353',
    '#26DE81',
    '#A55EEA',
    '#888888',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash < 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Get initials from name
const getInitials = name => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export default function AssignRecipients({ navigation, route }) {
  const { id: treasureId } = route?.params || {};

  const { data: recipientsData } = useRecipients();

  const apiRecipients = recipientsData?.data?.recipients || [];

  const mappedRecipients = apiRecipients.map(recipient => ({
    id: recipient._id || recipient.id,
    name: recipient.name || 'Unknown',
    relation: recipient.relationship || 'No relation',
    initial: getInitials(recipient.name),
    color: getColorFromName(recipient.name),
    ...recipient,
  }));

  const recipients = mappedRecipients.length > 0 ? mappedRecipients : [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleRecipient = id => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleContinue = () => {
    if (selectedIds.length === 0) {
      Alert.alert(
        'No Recipients Selected',
        'Please select at least one recipient to continue.',
      );
      return;
    }

    const selectedRecipients = recipients.filter(r =>
      selectedIds.includes(r?.id),
    );

    //    "treasureId": "665a...",
    // "recipientIds": ["665b...", "665c..."],
    // "releaseType": "scheduled",
    // "releaseDate": "2026-11-03"

    navigation.navigate('ReleaseRules', {
      recipientIds: selectedIds,
      treasureId: treasureId,
      recipients: selectedRecipients,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />

      <HeaderBack title={'Assign to'} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchBarContainer}>
          <Ionicons
            name="search-outline"
            size={Responsive.width(18)}
            color="rgba(255, 255, 255, 0.4)"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInputField}
            placeholder="Search your Contents..."
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            keyboardAppearance="dark"
          />
        </View>

        <AppText text="SAVED RECIPIENTS" style={styles.sectionHeaderTitle} />
        <TouchableOpacity
          onPress={() => navigation.navigate('NewRecepient')}
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
          {recipients?.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <AppText
                text="No recipients found"
                size="medium"
                color={COLORS.WHITE}
                style={styles.emptyStateText}
              />
              <AppText
                text="Add a new recipient to get started"
                size="small"
                color="#888888"
                style={styles.emptyStateSubText}
              />
            </View>
          ) : (
            recipients
              .filter(r =>
                r.name.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map(recipient => {
                const isChecked = selectedIds.includes(recipient.id);

                return (
                  <TouchableOpacity
                    key={recipient.id}
                    activeOpacity={0.9}
                    onPress={() => toggleRecipient(recipient.id)}
                    style={styles.cardTouchWrapper}
                  >
                    {/* Selected items get a warm gradient fill container, unselected remain dark outline */}
                    {isChecked ? (
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
                            <AppText
                              text={recipient.initial}
                              style={[styles.avatarText, { color: '#1A1105' }]}
                            />
                          </View>

                          <View style={styles.recipientInfoTextContainer}>
                            <AppText
                              text={recipient.name}
                              style={[
                                styles.recipientNameText,
                                { color: '#1A1105' },
                              ]}
                            />
                            <AppText
                              text={recipient.relation}
                              size="tiny"
                              color={COLORS.DARK_GRAY}
                            />
                          </View>

                          <View
                            style={[
                              styles.checkboxContainer,
                              styles.checkboxContainerChecked,
                            ]}
                          >
                            <Ionicons
                              name="checkmark"
                              size={Responsive.width(14)}
                              color="#C59353"
                            />
                          </View>
                        </View>
                      </LinearGradient>
                    ) : (
                      <View
                        style={[
                          styles.recipientCardContainer,
                          styles.recipientCardUnselected,
                        ]}
                      >
                        <View style={styles.cardInnerFlexRow}>
                          <View
                            style={[
                              styles.avatarCircle,
                              { borderColor: recipient.color + '40' },
                            ]}
                          >
                            <AppText
                              text={recipient.initial}
                              style={[
                                styles.avatarText,
                                { color: recipient.color },
                              ]}
                            />
                          </View>

                          <View style={styles.recipientInfoTextContainer}>
                            <AppText
                              text={recipient.name}
                              style={[
                                styles.recipientNameText,
                                { color: '#FFFFFF' },
                              ]}
                            />
                            <AppText
                              text={recipient.relation}
                              style={[
                                styles.recipientRelationText,
                                { color: '#888888' },
                              ]}
                            />
                          </View>

                          <View
                            style={[
                              styles.checkboxContainer,
                              styles.checkboxContainerUnselected,
                            ]}
                          />
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })
          )}
        </View>

        {/* Selected count */}
        {selectedIds?.length > 0 && (
          <View style={styles.selectedCountContainer}>
            <AppText
              text={`${selectedIds.length} recipient${
                selectedIds.length > 1 ? 's' : ''
              } selected`}
              size="small"
              color="#C59353"
            />
          </View>
        )}

        <Button onPress={handleContinue} title="Continue" />
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
    color: '#888888',
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
    marginBottom: Responsive.height(16),
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
    fontFamily: FONT.TTForseBold,
    fontWeight: '700',
    marginBottom: 2,
  },
  recipientRelationText: {
    fontSize: FontSize.tiny || 11,
    fontFamily: FONT.TTForseRegular,
  },
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
  selectedCountContainer: {
    alignItems: 'center',
    marginVertical: Responsive.height(8),
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Responsive.height(40),
  },
  emptyStateText: {
    marginBottom: Spacing.small,
  },
  emptyStateSubText: {
    opacity: 0.7,
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
