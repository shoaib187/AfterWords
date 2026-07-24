import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppText from '../../../components/typography/appText/appText';
import { Button } from '../../../components/common/button/button';
import { COLORS } from '../../../components/constants/color';
import { Responsive, Spacing } from '../../../components/constants/styles';

const { width } = Dimensions.get('screen');

export const onboardingData = [
  {
    id: '1',
    image: require('../../../../assets/png/security.png'),
    icon: 'mail-open-outline',
    title: 'MESSAGES THAT LAST FOREVER',
    description:
      'Create heartfelt messages, letters, and memories that can be delivered to your loved ones when the time is right.',
  },
  {
    id: '2',
    image: require('../../../../assets/png/calendar.png'),
    icon: 'shield-checkmark-outline',
    title: 'SAFE & SECURE',
    description:
      'Your memories are encrypted and protected, ensuring only the people you choose can access them.',
  },
];

export default function OnboardingScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleScrollEnd = e => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(i);
  };

  const handleNext = () => {
    if (index < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({ index: index + 1 });
    } else {
      // navigation.navigate('Secure');
      navigation.navigate('Register');
    }
  };

  const buttonText =
    index === onboardingData.length - 1 ? 'Begin Your Journey' : 'Continue';

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const imageTranslate = scrollX.interpolate({
      inputRange,
      outputRange: [80, 0, -80],
      extrapolate: 'clamp',
    });

    const imageScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    const textTranslate = scrollX.interpolate({
      inputRange,
      outputRange: [40, 0, -40],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.slide}>
        <ImageBackground
          source={require('../../../../assets/png/circle-neon.png')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flex: 0.7,
          }}
          resizeMode="contain"
        >
          <Animated.Image
            source={item?.image}
            style={[
              styles.image,
              {
                transform: [
                  { translateX: imageTranslate },
                  { scale: imageScale },
                ],
              },
            ]}
            resizeMode="cover"
          />
        </ImageBackground>
        <Animated.View
          style={{
            opacity,
            transform: [{ translateY: textTranslate }],
          }}
        >
          <AppText text={item.title} color={COLORS.GOLD} style={styles.title} />
          <AppText text={item.description} style={styles.description} />
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ONBOARDING SLIDES */}
      <Animated.FlatList
        ref={flatListRef}
        data={onboardingData}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={renderItem}
        scrollEventThrottle={16}
      />

      {/* DOTS */}
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>

      {/* BUTTON */}
      <View style={styles.buttonContainer}>
        <Button title={buttonText} onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  image: {
    width: Responsive.width(100),
    height: Responsive.width(100),
    marginLeft: Spacing.large,
  },

  title: {
    textAlign: 'center',
    marginBottom: Spacing.medium,
  },

  description: {
    textAlign: 'center',
    color: '#ccc',
    lineHeight: 22,
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  dot: {
    height: 8,
    borderRadius: 10,
    backgroundColor: COLORS.GOLD,
    marginHorizontal: 4,
  },

  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});
