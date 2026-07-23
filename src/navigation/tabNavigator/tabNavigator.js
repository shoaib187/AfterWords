import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { Responsive, Radius, Spacing } from '../../components/constants/styles';
import { COLORS } from '../../components/constants/color';
import { HomeStack } from '../homeStack/homeStack';
import { TreasuresStack } from '../treasuresStack/treasuresStack';
import { LegacyStack } from '../legacyStack/legacyStack';
import { ProfileStack } from '../profileStack/profileStack';
import { TreasureStack } from '../treasureStack/treasureStack';

const Tab = createBottomTabNavigator();
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TAB_BAR_MARGIN = Spacing.medium;
const AVAILABLE_WIDTH = SCREEN_WIDTH - TAB_BAR_MARGIN * 2;
const TAB_COUNT = 5;
const TAB_WIDTH = AVAILABLE_WIDTH / TAB_COUNT;

// CUSTOM PREMIUM ANIMATED TAB BAR COMPONENT
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const animationPosition = useRef(new Animated.Value(0)).current;
  const animationOpacity = useRef(new Animated.Value(0)).current;

  // Track the active index directly from state to trigger animations smoothly
  const activeIndex = state.index;

  useEffect(() => {
    if (activeIndex === 2) {
      // Fade out background gradient completely when center floating Legacy button is active
      Animated.timing(animationOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start();
    } else {
      // Smoothly slide and fade in gradient directly under active tab
      Animated.parallel([
        Animated.timing(animationOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(animationPosition, {
          toValue: activeIndex * TAB_WIDTH,
          tension: 70,
          friction: 11,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [activeIndex]);

  // Read focus state to determine tab bar visibility parameters
  const activeRoute = state.routes[activeIndex];
  const isTabBarVisible = getTabBarVisibility(activeRoute) === 'flex';

  if (!isTabBarVisible) return null;

  return (
    <View style={styles.tabBarWrapper}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.animatedGradientIndicator,
          {
            width: TAB_WIDTH,
            opacity: animationOpacity,
            transform: [{ translateX: animationPosition }],
          },
        ]}
      >
        <LinearGradient
          colors={[COLORS.WHITE, COLORS.GOLD]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.indicatorGlowCore}
        />
      </Animated.View>

      {/* 
        LAYER 2: INTERACTIVE TABS VIEW LAYER
      */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Center Action button: Floating "Plus"
        if (route.name === 'Treasure') {
          return (
            <View key={route.key} style={styles.tabItemContainer}>
              <TouchableOpacity
                onPress={onPress}
                style={styles.floatingButton}
                activeOpacity={0.9}
              >
                <Octicons
                  name="plus"
                  size={Responsive.width(28)}
                  color={COLORS.WHITE}
                />
              </TouchableOpacity>
            </View>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabItemContainer}
            activeOpacity={0.8}
          >
            <View style={styles.iconTextCenteringFrame}>
              <Octicons
                name={getIconName(route.name)}
                size={Responsive.width(18)}
                color={isFocused ? COLORS.BLACK : COLORS.WHITE}
                style={styles.tabIconSpacing}
              />
              <Animated.Text
                style={[
                  styles.tabLabelText,
                  { color: isFocused ? COLORS.BLACK : COLORS.WHITE },
                ]}
              >
                {route.name}
              </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigator = () => {
  return (
    <SafeAreaView style={styles.masterContainer}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.BLACK} />

      <Tab.Navigator
        initialRouteName="Treasure"
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Treasures" component={TreasuresStack} />
        <Tab.Screen name="Treasure" component={TreasureStack} />
        <Tab.Screen name="Legacy" component={LegacyStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const getIconName = routeName => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Vault':
      return 'archive';
    case 'Legacy':
      return 'inbox';
    case 'Profile':
      return 'person';
    default:
      return 'home';
  }
};

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);

  const hiddenScreens = [
    'CreateTreasure',
    'VideoMessageRecorder',
    'VoiceMessageRecorder',
    'PhotoMessage',
    'DocumentMessage',
    'AssignRecipients',
    'NewRecipient',
    'ReviewSummary',
    'VaultItemDetail',
    'Review',
    'VoiceMessagePreview',
    'PhotoMessagePreview',
    'FileDetails',
    'GiftsScreen',
    'MessageDetails',
    'RecipientDirectory',
    'FamilyTree',
    'AccountRecovery',
    'EstateExecutor',
    'SecurityAndPrivacy',
    'Subscription',
    'TrustedDelegates',
    'AddMessageDetails',
    'TreasureSaved',
    'TreasureDetails',
    'AddToCollections',
    'GiftDetails',
    'ExploreEncestors',
    'FamilyHistory',
    'LegalExecutor',
    'AddExecutor',
  ];

  if (hiddenScreens.includes(routeName)) {
    return 'none';
  }
  return 'flex';
};

export { TabNavigator };

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  tabBarWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.BLACK,
    height: Responsive.height(64),
    position: 'absolute',
    bottom: Responsive.isIOS ? 20 : 10,
    left: TAB_BAR_MARGIN,
    right: TAB_BAR_MARGIN,
    borderRadius: Radius.large,
    borderWidth: 0.5,
    borderColor: COLORS.GOLD,
    alignItems: 'center',
  },
  tabItemContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  iconTextCenteringFrame: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconSpacing: {
    marginBottom: 4,
  },
  tabLabelText: {
    fontSize: 10,
    fontWeight: '700',
  },
  floatingButton: {
    width: Responsive.width(54),
    height: Responsive.width(54),
    borderRadius: Radius.circle,
    backgroundColor: COLORS.GOLD,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: Spacing.xLarge,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    zIndex: 5,
  },
  animatedGradientIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: '100%',
    zIndex: 1,
  },
  indicatorGlowCore: {
    width: '90%',
    height: '70%',
    alignSelf: 'center',
    top: Spacing.small - 4,
    borderRadius: Radius.full,
  },
});
