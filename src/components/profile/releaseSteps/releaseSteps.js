import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import Title from '../../typography/title/title';
import AppText from '../../typography/appText/appText';
import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';
import { Responsive, Spacing } from '../../constants/styles';

const RELEASE_STEPS = [
  {
    id: '1',
    step: '1. User Passes Away',
    subtitle: null,
    status: 'pending',
  },
  {
    id: '2',
    step: '2. Verification Submitted',
    subtitle: 'Executor initiates protocol securely.',
    status: 'pending',
  },
  {
    id: '3',
    step: '3. Security Buffer Period',
    subtitle: null,
    status: 'pending',
  },
  {
    id: '4',
    step: '4. Recipients Notified',
    subtitle: 'Secure links are distributed.',
    status: 'pending',
  },
  {
    id: '5',
    step: '5. Deliveries Begin',
    subtitle: 'Memories unlock according to your rules.',
    status: 'active',
  },
];

const ReleaseSteps = () => {
  return (
    <View style={styles.timelineWrapper}>
      <View style={styles.timelineLine} />

      {RELEASE_STEPS.map(item => {
        const isActive = item.status === 'active';

        return (
          <View key={item.id} style={styles.stepRow}>
            <View style={styles.nodeContainer}>
              <View
                style={[
                  styles.nodeDot,
                  isActive ? styles.nodeDotActive : styles.nodeDotPending,
                ]}
              />
            </View>

            <View style={styles.stepContent}>
              <Title
                text={item.step}
                size="small"
                fontFamily={FONT.TTForseSemiBold}
                color={isActive ? '#00FF66' : COLORS.WHITE}
              />

              {item.subtitle && (
                <AppText
                  text={item.subtitle}
                  size="small"
                  fontFamily={FONT.TTForseRegular}
                  color={isActive ? '#00FF66' : '#777777'}
                  style={styles.subtitle}
                />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  timelineWrapper: {
    position: 'relative',
    paddingLeft: 4,
  },

  timelineLine: {
    position: 'absolute',
    left: 13,
    top: 8,
    bottom: 24,
    width: 1.5,
    backgroundColor: '#333333',
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Responsive.height(20),
  },

  nodeContainer: {
    width: 20,
    alignItems: 'center',
    marginRight: Spacing.medium,
    paddingTop: 4,
  },

  nodeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  nodeDotPending: {
    backgroundColor: '#555555',
  },

  nodeDotActive: {
    backgroundColor: '#00FF66',
  },

  stepContent: {
    flex: 1,
  },

  subtitle: {
    marginTop: 2,
  },
});

export default memo(ReleaseSteps);
