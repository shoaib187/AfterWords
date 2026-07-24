import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../components/constants/color';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import AppText from '../../../components/typography/appText/appText';

export default function VideoMessagePreview({ route, navigation }) {
  const { videoPath, videoUri } = route?.params || {};
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  // If no video path, show error
  if (!videoPath && !videoUri) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderBack title={'Video Preview'} />
        <GradientBackground />
        <View style={styles.errorContainer}>
          <Ionicons
            name="videocam-off-outline"
            size={Responsive.width(50)}
            color={COLORS.GOLD}
          />
          <AppText
            text="No video found"
            size="large"
            color={COLORS.WHITE}
            style={styles.errorText}
          />
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <AppText text="Go Back" size="medium" color={COLORS.BLACK} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Use videoPath (with file://) or fallback to videoUri
  const videoSource = videoPath || (videoUri ? `file://${videoUri}` : null);
  console.log('vides', videoSource);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    console.log('Video loaded successfully');
  };

  const handleVideoError = error => {
    console.log('Video error:', error);
    setIsLoading(false);
    Alert.alert('Error', 'Failed to load video');
  };

  const handleProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const handleLoad = data => {
    setDuration(data.duration);
  };

  const formatTime = seconds => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleSend = () => {
    // Handle sending the video
    Alert.alert('Success', 'Video sent successfully!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Video Preview'} />
      <GradientBackground />

      <View style={styles.content}>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: videoSource }}
            style={styles.videoPlayer}
            resizeMode="cover"
            paused={!isPlaying}
            muted={isMuted}
            repeat={false}
            onLoad={handleLoad}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={handleVideoLoad}
            onError={handleVideoError}
            onProgress={handleProgress}
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
          />

          {/* Loading Overlay */}
          {isLoading && (
            <View style={styles.loadingOverlay}>
              {/* <View style={styles.loadingSpinner} /> */}
              <AppText
                text="Loading video..."
                size="small"
                color={COLORS.WHITE}
                style={styles.loadingText}
              />
            </View>
          )}

          {/* Play/Pause Button Overlay */}
          {!isLoading && (
            <TouchableOpacity
              style={styles.playButtonOverlay}
              onPress={handlePlayPause}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={Responsive.width(40)}
                color={COLORS.WHITE}
                style={styles.playButtonIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Video Controls */}
        <View style={styles.controlsContainer}>
          {/* Time Display */}
          <View style={styles.timeContainer}>
            <AppText
              text={formatTime(currentTime)}
              size="small"
              color="#888888"
            />
            <AppText text="/" size="small" color="#888888" />
            <AppText text={formatTime(duration)} size="small" color="#888888" />
          </View>

          {/* Control Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleMuteToggle}
            >
              <Ionicons
                name={isMuted ? 'volume-mute' : 'volume-high'}
                size={Responsive.width(24)}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => {
                const newTime = Math.max(0, currentTime - 5);
                videoRef.current?.seek(newTime);
              }}
            >
              <Ionicons
                name="play-back"
                size={Responsive.width(24)}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => {
                const newTime = Math.min(duration, currentTime + 5);
                videoRef.current?.seek(newTime);
              }}
            >
              <Ionicons
                name="play-forward"
                size={Responsive.width(24)}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.outlinedButton}
            onPress={() => navigation.goBack()}
          >
            <AppText text="Retake" size="medium" color={COLORS.WHITE} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <AppText text="Send Video" size="medium" color={COLORS.BLACK} />
            <Ionicons
              name="send"
              size={Responsive.width(18)}
              color={COLORS.BLACK}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.large,
    paddingTop: Spacing.medium,
    paddingBottom: Spacing.xLarge,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xLarge,
  },
  errorText: {
    marginTop: Spacing.medium,
    marginBottom: Spacing.xLarge,
  },
  videoContainer: {
    height: Responsive.height(420),
    width: '100%',
    borderRadius: Radius.xLarge,
    overflow: 'hidden',
    backgroundColor: '#000000',
    position: 'relative',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  loadingSpinner: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    borderRadius: Responsive.width(20),
    borderWidth: 3,
    borderColor: COLORS.GOLD,
    borderTopColor: 'transparent',
  },
  loadingText: {
    marginTop: Spacing.medium,
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  playButtonIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: Responsive.width(16),
    borderRadius: Responsive.width(40),
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.small,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.tiny,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.medium,
  },
  controlButton: {
    padding: Spacing.tiny,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.medium,
    gap: Spacing.medium,
  },
  outlinedButton: {
    flex: 1,
    height: Responsive.height(48),
    borderRadius: Radius.xLarge,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    flex: 2,
    flexDirection: 'row',
    height: Responsive.height(48),
    borderRadius: Radius.xLarge,
    backgroundColor: COLORS.GOLD,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.small,
  },
  retryButton: {
    backgroundColor: COLORS.GOLD,
    paddingHorizontal: Spacing.xLarge,
    paddingVertical: Spacing.medium,
    borderRadius: Radius.xLarge,
    alignSelf: 'center',
  },
});
