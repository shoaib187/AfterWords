import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../components/constants/color';
import AppText from '../../../components/typography/appText/appText';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import { Button } from '../../../components/common/button/button';
import { useAuth } from '../../../configs/authContext/authContext';

export default function Roadmap({ navigation }) {
  const { saveToken } = useAuth();

  const roadmapItems = [
    {
      id: '1',
      title: 'Account Created',
      description: 'Your private Vault is secure',
      completed: true,
    },
    {
      id: '2',
      title: 'Add Executors',
      description: 'Assign trusted contacts to manage your estate',
      completed: false,
    },
    {
      id: '3',
      title: 'Add Recipients',
      description: 'Build your directory of loved ones',
      completed: false,
    },
    {
      id: '4',
      title: 'Create First Treasure',
      description: 'Upload a photo, video, or document',
      completed: false,
    },
    {
      id: '5',
      title: 'Create First Legacy',
      description: 'Assign a treasure to a recipient',
      completed: false,
    },
  ];

  return (
    <SafeAreaView style={styles.masterContainer}>
      <HeaderBack title={'Estate Readlines'} />
      <ScrollView
        contentContainerStyle={styles.scrollContentLayout}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Text Block Context */}
        <View style={styles.headerTextSection}>
          <AppText
            text="Your secure vault has been created. Here is your roadmap to preserving your legacy."
            align="center"
            size="medium"
            color={COLORS.GRAY}
          />
        </View>
        <View style={styles.listStackWrapper}>
          {roadmapItems?.map(item => {
            if (item?.completed) {
              return (
                <LinearGradient
                  key={item.id}
                  colors={['#EAD9B5', '#C49753']}
                  start={{ x: 0.1, y: 0 }}
                  end={{ x: 0.9, y: 1 }}
                  style={styles.completedCardFrame}
                >
                  <View style={styles.statusIconFrame}>
                    <Icon name="check-circle" size={26} color="#10B981" />
                  </View>
                  <View style={styles.textDetailsColumn}>
                    <AppText
                      text={item.title}
                      size="medium"
                      color="#1C1917"
                      weight="bold"
                    />
                    <AppText
                      text={item.description}
                      size="small"
                      color="#44403C"
                      style={styles.cardDescOffset}
                    />
                  </View>
                </LinearGradient>
              );
            }

            return (
              <View key={item.id} style={styles.pendingCardFrame}>
                <View style={styles.statusIconFrame}>
                  <View style={styles.emptyCheckboxCircle} />
                </View>
                <View style={styles.textDetailsColumn}>
                  <AppText
                    text={item.title}
                    size="medium"
                    color="#1C1917"
                    weight="bold"
                  />
                  <AppText
                    text={item.description}
                    size="small"
                    color="#71717A"
                    style={styles.cardDescOffset}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <Button
          title="Go to My Vault"
          onPress={() => saveToken('MY_NAME_IS_SHOAIB')}
          style={{ width: '100%', marginTop: Spacing.medium }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  scrollContentLayout: {
    paddingHorizontal: Spacing.medium,
    paddingTop: Responsive.height(40),
    paddingBottom: Responsive.height(30),
    alignItems: 'center',
  },
  headerTextSection: {
    marginBottom: Responsive.height(36),
    width: '100%',
  },
  subtextLineHeight: {
    marginBottom: 4,
  },
  listStackWrapper: {
    width: '100%',
  },
  completedCardFrame: {
    width: '100%',
    height: Responsive.height(66),
    borderRadius: Radius.circle,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
    marginBottom: Spacing.medium,
  },
  pendingCardFrame: {
    width: '100%',
    height: Responsive.height(66),
    borderRadius: Radius.circle || 38,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
    marginBottom: Spacing.medium,
  },
  statusIconFrame: {
    marginRight: Spacing.medium - 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCheckboxCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#A1A1AA',
    backgroundColor: 'transparent',
  },
  textDetailsColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  cardDescOffset: {
    marginTop: 2,
  },
  actionFooterButton: {
    width: '100%',
    height: Responsive.height(56),
    backgroundColor: COLORS.GOLD || '#DCA257',
    borderRadius: Radius.large || 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
});
