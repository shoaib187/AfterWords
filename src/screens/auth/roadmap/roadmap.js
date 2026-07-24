import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
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
import {
  completeOnboarding,
  getEstateReadinessStatus,
} from '../../../utils/apis/user/api';
import { useAuth } from '../../../configs/authContext/authContext';
import { useUser } from '../../../hooks/useUser/useUser';

export default function Roadmap({ navigation }) {
  const { token, setIsAuthenticated } = useAuth();
  const [checklist, setChecklist] = useState([]);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [totalSteps, setTotalSteps] = useState(5);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { refetch } = useUser();

  useEffect(() => {
    getMyAccountStatus();
  }, []);

  const getMyAccountStatus = async () => {
    try {
      setLoading(true);
      const res = await getEstateReadinessStatus(token);

      if (res?.success && res?.data) {
        setChecklist(res.data.checklist || []);
        setCompletedSteps(res.data.completedSteps || 0);
        setTotalSteps(res.data.totalSteps || 5);
        setPercentage(res.data.percentage || 0);
      }
      console.log('Estate Readiness:', res);
    } catch (error) {
      console.error('Error fetching estate readiness:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getMyAccountStatus();
    setRefreshing(false);
  };

  const handleCompleteOnboard = async () => {
    try {
      setLoading(true);
      await completeOnboarding(token);
      setIsAuthenticated(true);
      await refetch();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'TabNavigation' }],
        }),
      );
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  const isAllCompleted = checklist.every(item => item.completed);
  const getNextStepText = () => {
    if (isAllCompleted) {
      return 'Go to My Vault';
    }
    const nextStep = checklist.find(item => !item.completed);
    return nextStep ? `Complete: ${nextStep.label}` : 'Go to My Vault';
  };

  const getStepIcon = item => {
    if (item.completed) {
      return 'check-circle';
    }
    const iconMap = {
      accountCreated: 'account-check',
      executorsComplete: 'account-group',
      recipientAdded: 'account-plus',
      firstTreasureAdded: 'treasure-chest',
      legacyCreated: 'heart',
    };
    return iconMap[item.key] || 'circle-outline';
  };

  return (
    <SafeAreaView style={styles.masterContainer}>
      <HeaderBack title={'Estate Readiness'} />

      <ScrollView
        contentContainerStyle={styles.scrollContentLayout}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.GOLD}
            colors={[COLORS.GOLD]}
          />
        }
      >
        <View style={styles.headerContainer}>
          {/* <View style={styles.progressHeader}>
            <AppText
              text="Your Estate Readiness"
              size="large"
              color={COLORS.WHITE}
              weight="bold"
            />
            <View style={styles.progressBadge}>
              <AppText
                text={`${percentage}%`}
                size="medium"
                color={COLORS.GOLD}
                weight="bold"
              />
            </View>
          </View> */}
          {/* <View style={styles.progressBarContainer}>
            <View style={styles.progressBarTrack}>
              <View
                style={[styles.progressBarFill, { width: `${percentage}%` }]}
              />
            </View>
            <AppText
              text={`${completedSteps} of ${totalSteps} steps completed`}
              size="small"
              color={COLORS.GRAY}
              style={styles.progressText}
            />
          </View> */}
          <AppText
            text="Complete these steps to secure your legacy"
            align="center"
            size="medium"
            color={COLORS.GRAY}
            style={styles.subtitleText}
          />
        </View>

        <View style={styles.listStackWrapper}>
          {checklist.map((item, index) => {
            const isCompleted = item.completed;

            if (isCompleted) {
              return (
                <LinearGradient
                  key={item.key || index}
                  colors={['#EAD9B5', '#C49753']}
                  start={{ x: 0.1, y: 0 }}
                  end={{ x: 0.9, y: 1 }}
                  style={styles.completedCardFrame}
                >
                  <View style={styles.statusIconFrame}>
                    <Icon name="check-circle" size={28} color="#10B981" />
                  </View>
                  <View style={styles.textDetailsColumn}>
                    <AppText
                      text={item.label}
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
                  <View style={styles.completedBadge}>
                    <AppText
                      text="Done"
                      size="tiny"
                      color="#10B981"
                      weight="bold"
                    />
                  </View>
                </LinearGradient>
              );
            }

            return (
              <View key={item.key || index} style={styles.pendingCardFrame}>
                <View style={styles.statusIconFrame}>
                  <Icon name={getStepIcon(item)} size={24} color="#71717A" />
                </View>
                <View style={styles.textDetailsColumn}>
                  <AppText
                    text={item.label}
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
                <View style={styles.pendingBadge}>
                  <AppText
                    text={`Step ${index + 1}`}
                    size="tiny"
                    color="#71717A"
                  />
                </View>
              </View>
            );
          })}
        </View>

        <Button
          title={getNextStepText()}
          onPress={handleCompleteOnboard}
          loading={loading}
          disabled={loading}
          style={styles.actionButton}
        />

        {isAllCompleted && (
          <View style={styles.completionMessage}>
            <Icon name="party-popper" size={24} color={COLORS.GOLD} />
            <AppText
              text="🎉 Congratulations! Your estate is ready!"
              size="small"
              color={COLORS.GOLD}
              style={styles.completionText}
            />
          </View>
        )}
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
    paddingTop: Responsive.height(20),
    paddingBottom: Responsive.height(30),
  },
  headerContainer: {
    width: '100%',
    marginBottom: Responsive.height(24),
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },
  progressBadge: {
    backgroundColor: 'rgba(197, 147, 83, 0.15)',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.tiny,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: COLORS.GOLD,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: Spacing.small,
  },
  progressBarTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#333',
    borderRadius: Radius.tiny,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.GOLD,
    borderRadius: Radius.tiny,
  },
  progressText: {
    marginTop: Spacing.tiny,
    textAlign: 'right',
  },
  subtitleText: {
    marginTop: Spacing.small,
  },
  listStackWrapper: {
    width: '100%',
    marginBottom: Spacing.medium,
  },
  completedCardFrame: {
    width: '100%',
    minHeight: Responsive.height(66),
    borderRadius: Radius.circle,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small,
    marginBottom: Spacing.medium,
  },
  pendingCardFrame: {
    width: '100%',
    minHeight: Responsive.height(66),
    borderRadius: Radius.circle,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small,
    marginBottom: Spacing.medium,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  statusIconFrame: {
    marginRight: Spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDetailsColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  cardDescOffset: {
    marginTop: 2,
  },
  completedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: Spacing.small,
    paddingVertical: 2,
    borderRadius: Radius.tiny,
  },
  pendingBadge: {
    backgroundColor: 'rgba(113, 113, 122, 0.1)',
    paddingHorizontal: Spacing.small,
    paddingVertical: 2,
    borderRadius: Radius.tiny,
  },
  actionButton: {
    width: '100%',
    marginTop: Spacing.medium,
  },
  completionMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.medium,
    gap: Spacing.small,
  },
  completionText: {
    marginLeft: Spacing.tiny,
  },
});
