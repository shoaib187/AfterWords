import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/color';
import { Radius, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/font';
import AppText from '../../typography/appText/appText';
import { playRecording } from '../../../utils/audioRecordFunctions/audioRecordFunctions';

const WAVEFORM_BARS = [
  12, 18, 14, 24, 20, 16, 22, 14, 18, 24, 12, 16, 20, 14, 22, 18, 24, 14, 16,
  12, 20, 14, 22, 16,
];

const COLORS_CONFIG = {
  waveform: {
    active: '#FFFFFF',
    inactive: '#4A3515',
  },
  gradient: {
    start: '#EEDBB2',
    end: '#C59353',
  },
};

// Helper function to format time
const formatTime = seconds => {
  if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function VoiceMessageBubble({
  path,
  duration = 70, // Default 1:10
  timestamp = '4:20 pm',
  onPlaybackStateChange, // Optional callback for parent
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration);
  const isMounted = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      // Stop playback if component unmounts
      if (isPlaying) {
        // You might want to add a stop function here
      }
    };
  }, []);

  const handlePlayPress = async () => {
    if (!path) {
      console.error('No audio path provided');
      return;
    }

    // If already playing, stop and reset
    if (isPlaying) {
      setIsPlaying(false);
      setCurrentTime(0);
      onPlaybackStateChange?.(false);
      return;
    }

    try {
      setIsPlaying(true);
      setCurrentTime(0);
      onPlaybackStateChange?.(true);

      await playRecording(
        path,
        // Progress callback
        (currentSec, totalSec) => {
          if (isMounted.current) {
            setCurrentTime(currentSec);
            setTotalDuration(totalSec || duration);
          }
        },
        // End callback
        () => {
          if (isMounted.current) {
            setIsPlaying(false);
            setCurrentTime(0);
            onPlaybackStateChange?.(false);
          }
        },
      );
    } catch (error) {
      console.error('Playback error:', error);
      if (isMounted.current) {
        setIsPlaying(false);
        setCurrentTime(0);
        onPlaybackStateChange?.(false);
      }
    }
  };

  const renderWaveform = () => {
    // Calculate active index based on current playback progress
    const progress = totalDuration > 0 ? currentTime / totalDuration : 0;
    const activeIndex = Math.floor(progress * WAVEFORM_BARS.length);

    return (
      <View style={styles.waveformContainer}>
        {WAVEFORM_BARS.map((height, index) => (
          <View
            key={index}
            style={[
              styles.waveformBar,
              {
                height,
                backgroundColor:
                  isPlaying && index <= activeIndex
                    ? COLORS_CONFIG.waveform.active
                    : COLORS_CONFIG.waveform.inactive,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[COLORS_CONFIG.gradient.start, COLORS_CONFIG.gradient.end]}
      style={styles.cardContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.topRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePlayPress}
          style={styles.playButton}
        >
          <Icon
            name={isPlaying ? 'pause' : 'play'}
            size={Responsive.width(28)}
            color={COLORS.BLACK}
          />
        </TouchableOpacity>

        {renderWaveform()}
      </View>

      <View style={styles.bottomRow}>
        <AppText
          text={isPlaying ? formatTime(currentTime) : formatTime(duration)}
          size="tiny"
          color={COLORS_CONFIG.waveform.inactive}
          fontFamily={FONT.TTForseMedium}
        />
        <AppText
          text={timestamp}
          size="tiny"
          color={COLORS_CONFIG.waveform.inactive}
          fontFamily={FONT.TTForseMedium}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: Radius.large,
    paddingHorizontal: Spacing.medium,
    paddingTop: Spacing.medium,
    paddingBottom: Spacing.small,
    marginBottom: Responsive.height(32),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    marginRight: Spacing.small,
    padding: Responsive.width(4),
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.tiny,
    height: Responsive.height(30),
  },
  waveformBar: {
    width: 3,
    borderRadius: Radius.tiny,
    marginHorizontal: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: Responsive.width(36),
    marginTop: Spacing.tiny,
  },
});

// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { COLORS } from '../../constants/color';
// import { Radius, Responsive, Spacing } from '../../constants/styles';
// import { FONT } from '../../constants/font';
// import AppText from '../../typography/appText/appText';
// import { playRecording } from '../../../utils/audioRecordFunctions/audioRecordFunctions';

// const WAVEFORM_BARS = [
//   12, 18, 14, 24, 20, 16, 22, 14, 18, 24, 12, 16, 20, 14, 22, 18, 24, 14, 16,
//   12, 20, 14, 22, 16,
// ];

// const ACTIVE_BAR_INDEX = 10;
// const COLORS_CONFIG = {
//   waveform: {
//     active: '#FFFFFF',
//     inactive: '#4A3515',
//   },
//   gradient: {
//     start: '#EEDBB2',
//     end: '#C59353',
//   },
// };

// // Helper function to format time
// const formatTime = seconds => {
//   if (!seconds || isNaN(seconds)) return '0:00';
//   const mins = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${mins}:${secs.toString().padStart(2, '0')}`;
// };

// export default function VoiceMessageBubble({
//   path,
//   duration = 70, // Default 1:10
//   timestamp = '4:20 pm',
// }) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);

//   const handlePlayPress = async () => {
//     if (!path) return;

//     try {
//       setIsPlaying(true);
//       await playRecording(path);
//     } catch (error) {
//       setIsPlaying(false);
//       setCurrentTime(0);
//     }
//   };

//   const renderWaveform = () => {
//     return (
//       <View style={styles.waveformContainer}>
//         {WAVEFORM_BARS.map((height, index) => (
//           <View
//             key={index}
//             style={[
//               styles.waveformBar,
//               {
//                 height,
//                 backgroundColor:
//                   index < ACTIVE_BAR_INDEX
//                     ? COLORS_CONFIG.waveform.inactive
//                     : COLORS_CONFIG.waveform.active,
//               },
//             ]}
//           />
//         ))}
//       </View>
//     );
//   };

//   return (
//     <LinearGradient
//       colors={[COLORS_CONFIG.gradient.start, COLORS_CONFIG.gradient.end]}
//       style={styles.cardContainer}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//     >
//       <View style={styles.topRow}>
//         <TouchableOpacity
//           activeOpacity={0.7}
//           onPress={handlePlayPress}
//           style={styles.playButton}
//         >
//           <Icon
//             name={isPlaying ? 'pause' : 'play'}
//             size={Responsive.width(28)}
//             color={COLORS.BLACK}
//           />
//         </TouchableOpacity>

//         {renderWaveform()}
//       </View>

//       <View style={styles.bottomRow}>
//         <AppText
//           text={formatTime(currentTime || duration)}
//           size="tiny"
//           color={COLORS_CONFIG.waveform.inactive}
//           fontFamily={FONT.TTForseMedium}
//         />
//         <AppText
//           text={timestamp}
//           size="tiny"
//           color={COLORS_CONFIG.waveform.inactive}
//           fontFamily={FONT.TTForseMedium}
//         />
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   cardContainer: {
//     width: '100%',
//     borderRadius: Radius.large,
//     paddingHorizontal: Spacing.medium,
//     paddingTop: Spacing.medium,
//     paddingBottom: Spacing.small,
//     marginBottom: Responsive.height(32),
//   },
//   topRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   playButton: {
//     marginRight: Spacing.small,
//     padding: Responsive.width(4),
//   },
//   waveformContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'space-between',
//     paddingHorizontal: Spacing.tiny,
//     height: Responsive.height(30),
//   },
//   waveformBar: {
//     width: 3,
//     borderRadius: Radius.tiny,
//     marginHorizontal: 1,
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingLeft: Responsive.width(36),
//     marginTop: Spacing.tiny,
//   },
// });
