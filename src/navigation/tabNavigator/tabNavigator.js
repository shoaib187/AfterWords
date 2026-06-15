import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { Responsive, Radius } from '../../components/constants/styles';
import { COLORS } from '../../components/constants/color';
import { HomeStack } from '../homeStack/homeStack';
import { VaultStack } from '../vaultStack/vaultStack';
import { InboxStack } from '../inboxStack/inboxStack';
import { ProfileStack } from '../profileStack/profileStack';

const Tab = createBottomTabNavigator();

const FloatingButton = ({ onPress }) => (
  <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
    <Octicons name="plus" size={28} color={COLORS.WHITE} />
  </TouchableOpacity>
);

function Placeholder() {
  return <View style={{ flex: 1, backgroundColor: 'transparent' }} />;
}

const TabNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: COLORS.WHITE,
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: COLORS.BLACK,
            height: Responsive.height(70),
            position: 'absolute',
            bottom: Responsive.isIOS ? 20 : 10,
            marginHorizontal: 15,
            borderRadius: Radius.circle,
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: COLORS.BLACK,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            display: getTabBarVisibility(route),
          },
          tabBarLabelStyle: {
            fontSize: 11,
            marginBottom: 8,
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              name={getIconName(route.name)}
              size={Responsive.width(22)}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Vault" component={VaultStack} />
        <Tab.Screen
          name="Create"
          component={Placeholder}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => <View />,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarButton: props => (
              <FloatingButton {...props} onPress={() => {}} />
            ),
          }}
        />

        <Tab.Screen name="Inbox" component={InboxStack} />
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

    case 'Inbox':
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
    'CreateLegacy',
    'VideoMessageRecorder',
    'VoiceMessageRecorder',
    'PhotoMessage',
    'DocumentMessage',
    'AssignRecipients',
    'NewRecipient',
    'ReviewSummary',
    'VaultItemDetail',
  ];

  if (hiddenScreens.includes(routeName)) {
    return 'none';
  }

  return 'flex';
};

export { TabNavigator };

const styles = StyleSheet.create({
  floatingButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    elevation: 8,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
