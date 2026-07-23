import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderWithSubtitle from '../../../components/common/headerWithSubtitle/headerWithSubtitle';
import AppText from '../../../components/typography/appText/appText';
import DocumentCard from '../../../components/documents/documentCard/documentCard';
import Title from '../../../components/typography/title/title';
import LabelSection from '../../../components/treasures/labelsSection/labelSection';
import UsageAndTrackingSection from '../../../components/treasures/usageAndTrackingSection/usageAndTrackingSection';
import AssetTimelineSection from '../../../components/treasures/assetTimelineSection/AssetTimelineSection';
import DeliveryCardSection from '../../../components/treasures/deliveryCardSection/deliveryCardSection';
import ManageAssetSection from '../../../components/treasures/manageAsset/manageAssetSection';
import VideoCard from '../../../components/common/videoCard/videoCard';
import CollectionContentsSection from '../../../components/treasures/collectionsContent/collectionsContent';
import ConfirmationModal from '../../../components/common/confirmationModal/confirmationModal';

export default function TreasureDetails({ navigation, route }) {
  const { type } = route?.params;
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground />
      <HeaderWithSubtitle
        navigation={navigation}
        title={'My Treasure'}
        subtitle={'Your Preserved Vault'}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.screenTitle}>House Deed & Final Will</Text>
        </View>
        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <AppText text={'Used in 2 Legacies'} style={styles.badgeText} />
          </View>
          <AppText text={'Sep 14, 2026'} style={styles.dateText} />
        </View>
        {type === 'document' && <DocumentCard />}
        {type === 'video' && <VideoCard />}
        {type === 'collection' && (
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29sbGVjdGlvbnxlbnwwfHwwfHx8',
            }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 20,
              marginBottom: 20,
            }}
          />
        )}
        <View style={styles.section}>
          <Title text={'Description'} />
          <AppText
            text={
              'Certified scan of the summer house deed and latest will copy.'
            }
            style={styles.sectionBody}
          />
        </View>

        <LabelSection />
        <UsageAndTrackingSection />
        <AssetTimelineSection />
        <DeliveryCardSection />
        {type === 'collection' && (
          <CollectionContentsSection
            onAddTreasure={() => navigation.navigate('AddToCollections')}
          />
        )}
        <ManageAssetSection onArchieve={() => setModalVisible(true)} />
      </ScrollView>

      <ConfirmationModal
        visible={modalVisible}
        title="Archive this Treasure ?"
        description="This Treasure is not used in any active Legacies it is safe to Archive."
        cancelText="Cancel"
        confirmText="Yes Archive it"
        onCancel={() => setModalVisible(false)}
        onConfirm={() => {
          console.log('Archived!');
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 110,
  },

  screenTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'serif',
  },

  headerTitleRow: {
    marginBottom: 12,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  badge: {
    backgroundColor: '#D1FAF1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 16,
  },

  badgeText: {
    color: '#138265',
    fontSize: 13,
    fontWeight: '600',
  },

  dateText: {
    color: '#888888',
    fontSize: 13,
  },

  section: {
    marginBottom: 24,
  },

  sectionBody: {
    color: '#BBBBBB',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
});
