import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants/color';
import AppText from '../../typography/appText/appText';
import { FontSize, Responsive, Spacing } from '../../constants/styles';

const filterTabs = [
  { id: 'videos', label: 'Videos', icon: 'video-outline' },
  { id: 'voice', label: 'Voice', icon: 'microphone-outline' },
  { id: 'photos', label: 'Photos', icon: 'image-outline' },
  { id: 'documents', label: 'Documents', icon: 'file-document-outline' },
];

export default function TabItem({ selectedTab, setSelectedTab }) {
  return (
    <View style={styles.tabsHorizontalContainer}>
      {filterTabs.map(tab => {
        const isSelected = selectedTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItemButton}
            activeOpacity={0.8}
            onPress={() => setSelectedTab(tab.id)}
          >
            {isSelected ? (
              <LinearGradient
                colors={['#EEDBB2', '#C59353']}
                style={styles.activeTabGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon
                  name={tab.icon}
                  size={Responsive.width(26)}
                  color={COLORS.BLACK}
                />
              </LinearGradient>
            ) : (
              <View style={styles.inactiveTabFrame}>
                <Icon
                  name={tab.icon}
                  size={Responsive.width(26)}
                  color="#D5A760"
                />
              </View>
            )}
            <AppText text={tab.label} size="small" color={COLORS.WHITE} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabsHorizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: Spacing.medium,
  },
  tabItemButton: {
    alignItems: 'center',
  },
  activeTabGradient: {
    width: Responsive.width(56),
    height: Responsive.width(56),
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  inactiveTabFrame: {
    width: Responsive.width(56),
    height: Responsive.width(56),
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(197, 147, 83, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  tabLabelText: {
    fontSize: FontSize.small,
    textAlign: 'center',
  },
});
