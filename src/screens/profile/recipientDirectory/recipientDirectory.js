import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderWithSubtitle from '../../../components/common/headerWithSubtitle/headerWithSubtitle';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import {
  FontSize,
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { COLORS } from '../../../components/constants/color';
import AppText from '../../../components/typography/appText/appText';
import RecipientCard from '../../../components/profile/recipientCard/recipientCard';

const RECIPIENTS_DATA = [
  {
    id: '1',
    name: 'Sofia Chen',
    relationship: 'Daughter',
    status: 'VERIFIED',
    email: 'sofia@example.com',
    phone: '+1 (555) 019-2834',
  },
  {
    id: '2',
    name: 'Marcus Chen',
    relationship: 'Son',
    status: 'PENDING',
    email: 'marcus@example.com',
    phone: '+1 (555) 019-462527',
  },
];

export default function RecipientsDirectory({ navigation }) {
  const handleAddRecipient = () => {
    navigation.navigate('NewRecipient');
  };

  const handleCardPress = recipient => {
    console.log('Selected Recipient:', recipient.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderWithSubtitle
        title={'Recipient Directory'}
        subtitle={'Total Recipient (3)'}
      />
      <FlatList
        data={RECIPIENTS_DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RecipientCard recipient={item} onPress={handleCardPress} />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={handleAddRecipient}
          >
            <Ionicons
              name="add"
              size={Responsive.width(20)}
              color={COLORS.GOLD}
            />
            <AppText text={'Add New Recipient'} style={styles.addButtonText} />
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },

  listContent: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.large,
    paddingBottom: Responsive.height(40),
    gap: Spacing.medium,
  },

  addButton: {
    height: Responsive.height(50),
    borderRadius: Radius.circle,
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.small,
    marginBottom: Spacing.small,
  },

  addButtonText: {
    color: COLORS.GOLD,
    fontSize: FontSize.medium,
  },
});
