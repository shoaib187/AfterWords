import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppGradient from '../../../components/gradientBackground/gradientBackground';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import InputField from '../../../components/common/inputField/inputField';
import { COLORS } from '../../../components/constants/color';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';

export default function MPin() {
  const [code, setCode] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const headerAnim = useRef(new Animated.Value(0)).current;
  const heroAnim = useRef(new Animated.Value(0)).current;
  const bottomAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(150, [
      Animated.spring(headerAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }),
      Animated.spring(heroAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }),
      Animated.spring(bottomAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }),
    ]).start();
  }, []);

  const slideUp = anim => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0],
        }),
      },
    ],
  });

  return (
    <AppGradient
      colors={[COLORS.BLACK, COLORS.DARK_GRAY, COLORS.BLACK, '#1E1B24']}
      style={styles.gradientRoot}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <HeaderBack />
          <Animated.View style={[styles.bottom, slideUp(bottomAnim)]}>
            <View style={styles.inputRow}>
              <InputField
                value={code}
                label="Enter the code sent to your email"
                onChangeText={setCode}
                placeholder="*****"
                isFocused={isFocused}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                wrapperStyle={styles.inputFlex}
              />

              <TouchableOpacity
                style={styles.chevronBtn}
                activeOpacity={0.8}
                onPress={() => {}}
              >
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={Responsive.width(26)}
                  color={COLORS.BLACK}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  gradientRoot: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  flex: { flex: 1 },
  header: { paddingHorizontal: Spacing.medium, paddingTop: 8 },
  bottom: {
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.large,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputFlex: {
    flex: 1,
  },
  chevronBtn: {
    width: Responsive.width(48),
    height: Responsive.width(48),
    borderRadius: Radius.full * 2,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.small,
  },
});
