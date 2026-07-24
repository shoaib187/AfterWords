import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Title from '../../../components/typography/title/title';
import AppText from '../../../components/typography/appText/appText';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';
const ActionButton = ({ title, onPress, variant = 'gold', style }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[
      styles.button,
      variant === 'gold' ? styles.goldButton : styles.whiteButton,
      style,
    ]}
  >
    <AppText
      text={title}
      style={variant === 'gold' ? styles.goldButtonText : styles.redButtonText}
    />
  </TouchableOpacity>
);

export default function ManageAssetSection({ treasureId, onArchieve }) {
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <Title text="Manage Asset" />

      <View style={styles.buttonContainer}>
        <ActionButton
          title="Create Legacy"
          onPress={() => console.log('Create Legacy')}
        />

        <View style={styles.row}>
          <ActionButton
            title="Edit Treasure"
            style={styles.halfButton}
            onPress={() => navigation.navigate('EditTreasure', { treasureId })}
          />

          <ActionButton
            title="Add to Collection"
            style={styles.halfButton}
            onPress={() => console.log('Add to Collection')}
          />
        </View>

        <ActionButton
          title="Edit Legacy Assignments"
          onPress={() => console.log('Edit Legacy Assignments')}
        />

        <ActionButton
          title="Duplicate Treasure"
          onPress={() => console.log('Duplicate Treasure')}
        />

        <ActionButton
          title="Archive Treasure"
          variant="white"
          onPress={onArchieve}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: Spacing.large,
  },
  buttonContainer: {
    gap: Spacing.medium,
    marginTop: Spacing.small,
  },

  row: {
    flexDirection: 'row',
    gap: Spacing.small,
  },

  button: {
    height: Responsive.height(56),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
  },

  halfButton: {
    flex: 1,
  },

  goldButton: {
    backgroundColor: '#C8933A',
  },

  whiteButton: {
    backgroundColor: '#FFFFFF',
  },

  goldButtonText: {
    fontSize: FontSize.medium,
  },

  redButtonText: {
    color: '#D90429',
    fontSize: FontSize.medium,
  },
});
