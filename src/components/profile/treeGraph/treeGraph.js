import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const MIN_SCALE = 0.6;
const MAX_SCALE = 1.8;
const STEP = 0.2;

const TreeGraph = () => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Saved values to preserve position between gestures
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // Pan Gesture for dragging left, right, top, bottom
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  // Dynamic zoom functions for controls
  const handleZoomIn = () => {
    if (scale.value < MAX_SCALE) {
      scale.value = withTiming(scale.value + STEP, { duration: 250 });
    }
  };

  const handleZoomOut = () => {
    if (scale.value > MIN_SCALE) {
      scale.value = withTiming(scale.value - STEP, { duration: 250 });
    }
  };

  const handleReset = () => {
    scale.value = withTiming(1, { duration: 250 });
    translateX.value = withTiming(0, { duration: 250 });
    translateY.value = withTiming(0, { duration: 250 });
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  };

  // Combined animated styles for scaling + panning
  const animatedGraphStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Draggable & Scalable Graph Canvas */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.graphWrapper, animatedGraphStyle]}>
          <Svg width={width} height={180}>
            {/* Left Branch */}
            <Path
              d={`M ${width / 2} 55
                  C ${width / 2} 100,
                    ${width / 2 - 60} 90,
                    ${width / 2 - 60} 125`}
              stroke="#D1A354"
              strokeWidth={1.5}
              fill="none"
            />

            {/* Right Branch */}
            <Path
              d={`M ${width / 2} 55
                  C ${width / 2} 100,
                    ${width / 2 + 60} 90,
                    ${width / 2 + 60} 125`}
              stroke="#D1A354"
              strokeWidth={1.5}
              fill="none"
            />

            {/* Root Node */}
            <Circle
              cx={width / 2}
              cy={35}
              r={32}
              stroke="#3B301B"
              strokeWidth={1}
              fill="none"
            />
            <Circle
              cx={width / 2}
              cy={35}
              r={30}
              fill="#14120C"
              stroke="#D1A354"
              strokeWidth={1.5}
            />

            <SvgText
              x={width / 2}
              y={40}
              textAnchor="middle"
              fill="#FFF"
              fontSize={13}
              fontWeight="bold"
            >
              YOU
            </SvgText>

            {/* Left Node */}
            <Circle
              cx={width / 2 - 60}
              cy={145}
              r={20}
              fill="#0A1817"
              stroke="#2EC4B6"
              strokeWidth={2}
            />

            <SvgText
              x={width / 2 - 60}
              y={150}
              textAnchor="middle"
              fill="#2EC4B6"
              fontSize={14}
              fontWeight="bold"
            >
              J
            </SvgText>

            {/* Right Node */}
            <Circle
              cx={width / 2 + 60}
              cy={145}
              r={20}
              fill="#1F0D13"
              stroke="#E71D36"
              strokeWidth={2}
            />

            <SvgText
              x={width / 2 + 60}
              y={150}
              textAnchor="middle"
              fill="#E71D36"
              fontSize={14}
              fontWeight="bold"
            >
              S
            </SvgText>
          </Svg>

          <View style={styles.labels}>
            <Text style={[styles.label, { left: width / 2 - 82 }]}>James</Text>
            <Text style={[styles.label, { left: width / 2 + 42 }]}>Sofia</Text>
          </View>
        </Animated.View>
      </GestureDetector>

      {/* Control Buttons */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleZoomIn}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={18} color="#D1A354" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleZoomOut}
          activeOpacity={0.7}
        >
          <Ionicons name="remove" size={18} color="#D1A354" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleReset}
          activeOpacity={0.7}
        >
          <Ionicons name="scan-outline" size={16} color="#D1A354" />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    position: 'relative',
    marginTop: 10,
    overflow: 'hidden',
  },

  graphWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  labels: {
    position: 'absolute',
    bottom: 5,
    width,
  },

  label: {
    position: 'absolute',
    width: 44,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  controls: {
    position: 'absolute',
    top: 30,
    right: 16,
    gap: 8,
    zIndex: 10,
  },

  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262010',
    borderWidth: 1,
    borderColor: '#3B301B',
  },
});

export default memo(TreeGraph);
