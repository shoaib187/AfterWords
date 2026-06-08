import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Responsive, Radius, Spacing } from '../../components/constants/styles';
import { COLORS } from '../../components/constants/color';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../components/common/appText/appText';

function Locations() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppText text="Locations Screen" />
    </View>
  );
}

function Slides() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppText text="Slides Screen" />
    </View>
  );
}

function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppText text="Home Screen" />
    </View>
  );
}

function Chats() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppText text="Chats Screen" />
    </View>
  );
}

function Tickets() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppText text="Chats Screen" />
    </View>
  );
}
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Home"
        detachInactiveScreens={true}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: COLORS.WHITE,
          tabBarStyle: {
            backgroundColor: COLORS.BLACK,
            height: Responsive.height(60),
            paddingTop: Spacing.medium,
            position: 'absolute',
            bottom: Responsive.isIOS ? Spacing.medium : Spacing.small,
            marginHorizontal: Spacing.medium,
            borderRadius: Radius.circle,
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: COLORS.BLACK,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            display: getTabBarVisibility(route),
          },
          tabBarItemStyle: {
            height: Responsive.height(60),
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarIcon: ({ focused, color }) => {
            const iconName = getIconName(route.name);

            return (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.activeIconContainer,
                ]}
              >
                <Octicons name={iconName} color={color} size={22} />
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Locations" component={Locations} />
        <Tab.Screen name="Slide" component={Slides} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Tickets" component={Tickets} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

// Helper: Determine Icon based on route
const getIconName = routeName => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Explore':
      return 'flame';
    case 'Favorite':
      return 'heart';
    case 'Chat':
      return 'comment-discussion';
    case 'Profile':
      return 'person';
    default:
      return 'home';
  }
};

// Hide Tab Bar on specific screens
const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const hiddenScreens = [
    'UserDetails',
    'Chats',
    'ViewImage',
    'ProfileInfo',
    'Inbox',
    'MatchFound',
    'ViewStory',
    'StoryTypes',
    'TextStory',
    'MediaStory',
    'MagicStory',

    // New Profile & Payment screens
    'PaymentMethods',
    'AddPaymentMethod',
    'ChoosePlan',
    'YourProfile',
    'EditProfile',
    'Language',
    'HelpCenter',
    'PasswordManager',
    'Settings',
    'PrivacyPolicy',
    'SubscriptionSuccess',
    'CreateStory',
    'ViewStory',
    'Notifications',
    'UpdateLocation',
    'Matches',
    'Preferences',
    'ProfileDetails',
    'BlockedUsers',
    'MediaPreview',
    'MyProfile',
    'Activity',
    'MatchFromBoth',
    'SystemNotifications',
    'InviteFriends',
  ];

  if (hiddenScreens.includes(routeName)) {
    return 'none';
  }
  return 'flex';
};

export { TabNavigator };

const styles = StyleSheet.create({
  iconContainer: {
    width: Responsive.height(45),
    height: Responsive.height(45),
    borderRadius: Responsive.height(45) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconContainer: {
    backgroundColor: COLORS.PRIMARY, // Your brand color circle
    // Optional: add a subtle shadow to the active circle
    elevation: 4,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
