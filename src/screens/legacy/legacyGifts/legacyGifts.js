import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import Intro from '../../../components/legacies/intro/intro';
import LegacyGiftCard from '../../../components/legacies/legacyGiftCard/legacyGiftCard';
import { Spacing } from '../../../components/constants/styles';
import { useLegacyGifts } from '../../../hooks/useLegacy/useLegacy';
import { COLORS } from '../../../components/constants/color';

export default function LegacyGifts({ navigation }) {
  const { data, isLoading } = useLegacyGifts();
  const legacies = data?.data?.legacies || [];

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <GradientBackground />
        <HeaderBack title={'Legacy Gifts'} />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size={40} color={COLORS.GOLD} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderBack title={'Legacy Gifts'} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Intro />
        <View>
          <FlatList
            data={legacies}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <LegacyGiftCard
                  key={item?._id}
                  item={item}
                  onPress={() =>
                    navigation.navigate('GiftDetails', {
                      id: item?._id,
                      type: item?.type,
                    })
                  }
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.large,
    paddingBottom: 80,
  },
});
