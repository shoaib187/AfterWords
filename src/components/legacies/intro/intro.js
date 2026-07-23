import { View, Text, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import Feather from 'react-native-vector-icons/Feather';

const Intro = () => {
  return (
    <View>
      <Text style={styles.subHeaderTitle}>A LEGACY DELIVERED</Text>
      <Text style={styles.mainHeaderTitle}>Gift From James Whitfield</Text>
      <Text style={styles.verificationText}>Secure Access Verified</Text>

      <View style={styles.infoBanner}>
        <Feather
          name="alert-circle"
          size={20}
          color="#D1A354"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          James has prepared these preserved gifts for you. They have been
          securely unlocked based on his instructions.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeaderTitle: {
    color: '#D1A354',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  mainHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontFamily: 'serif',
    fontWeight: 'normal',
    marginBottom: 4,
  },
  verificationText: {
    color: '#D1A354',
    fontSize: 13,
    marginBottom: 20,
  },
  infoBanner: {
    backgroundColor: '#262626',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    color: '#A0A0A0',
    fontSize: 13,
    lineHeight: 18,
  },
});

export default memo(Intro);
