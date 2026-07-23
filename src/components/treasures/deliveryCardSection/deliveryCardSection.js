import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../../components/typography/appText/appText';
import { Responsive } from '../../constants/styles';

export default function DeliveryCardSection() {
  return (
    <View style={styles.deliveryCard}>
      <View style={styles.deliveryHeader}>
        <View>
          <AppText text="Delivering to" style={styles.deliveringLabel} />

          <AppText
            text="Sarah Jenkins ( Executor )"
            style={styles.recipientName}
          />
        </View>

        <View style={styles.sealedBadge}>
          <AppText text="Sealed" style={styles.sealedBadgeText} />
        </View>
      </View>

      <View style={styles.rulesRow}>
        <Ionicons
          name="time-outline"
          size={Responsive.width(16)}
          color="#888888"
        />
        <AppText text="Rules: Executor Release" style={styles.rulesText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginTop: 8,
  },

  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  deliveringLabel: {
    color: '#666666',
    fontSize: 12,
    marginBottom: 4,
  },

  recipientName: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
  },

  sealedBadge: {
    backgroundColor: '#D1FAF1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  sealedBadgeText: {
    color: '#138265',
    fontSize: 12,
    fontWeight: '600',
  },

  rulesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  rulesText: {
    color: '#666666',
    fontSize: 12,
  },
});
