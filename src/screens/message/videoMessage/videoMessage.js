import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useVideoOutput,
} from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../../components/typography/appText/appText';
import { COLORS } from '../../../components/constants/color';
import GradientBackground from '../../../components/common/gradientBackground/gradientBackground';
import HeaderBack from '../../../components/common/headerBack/headerBack';
import {
  Radius,
  Responsive,
  Spacing,
} from '../../../components/constants/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { checkCameraPermission } from '../../../utils/cameraPermission/cameraPermission';

const VIDEO_RECORDER_DATA = {
  header: {
    recordingText: 'Record or Upload a video',
    recordedText: 'Video recorded!',
  },
  camera: {
    timerText: '00:00',
    label: 'Camera preview',
    icon: 'videocam-outline',
  },
  buttons: {
    retake: 'Retake',
    redo: 'Redo',
    continue: 'Continue',
    next: 'Next',
    record: 'Record',
  },
};

// Reusable Header Component
const HeaderIndicator = ({ isRecorded }) => {
  return (
    <View style={styles.headerRow}>
      <View style={[styles.redDot, isRecorded && styles.greenDot]} />
      <AppText
        text={
          isRecorded
            ? VIDEO_RECORDER_DATA.header.recordedText
            : VIDEO_RECORDER_DATA.header.recordingText
        }
        size="medium"
        color={COLORS.WHITE}
        style={styles.headerText}
      />
    </View>
  );
};

// Reusable Record Button Component
const RecordButton = ({ isRecording, onPress }) => {
  return (
    <View style={styles.recordControlWrapper}>
      <TouchableOpacity
        style={styles.recordOuterCircle}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View
          style={[styles.recordInnerCircle, isRecording && styles.recordSquare]}
        />
      </TouchableOpacity>
    </View>
  );
};

// Reusable Action Button Component
const ActionButton = ({
  type,
  text,
  icon,
  onPress,
  iconPosition = 'left',
  disabled = false,
}) => {
  const isGold = type === 'gold';
  const isOutlined = type === 'outlined';

  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        isGold && styles.goldButton,
        isOutlined && styles.outlinedButton,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      activeOpacity={isGold ? 0.85 : 0.7}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && (
        <Ionicons
          name={icon}
          size={Responsive.width(16)}
          color={isGold ? COLORS.BLACK : COLORS.WHITE}
          style={styles.buttonIcon}
        />
      )}
      <AppText
        text={text}
        size="medium"
        color={isGold ? COLORS.BLACK : COLORS.WHITE}
        style={[
          styles.actionButtonText,
          isGold && styles.goldButtonText,
          isOutlined && styles.outlinedButtonText,
          disabled && styles.disabledButtonText,
        ]}
      />
      {icon && iconPosition === 'right' && (
        <Ionicons
          name={icon}
          size={Responsive.width(16)}
          color={isGold ? COLORS.BLACK : COLORS.WHITE}
        />
      )}
    </TouchableOpacity>
  );
};

// Reusable Bottom Actions Bar Component
const BottomActions = ({
  hasRecorded,
  isRecording,
  onRetake,
  onRedo,
  onContinue,
  onRecord,
}) => {
  // Show record button when not recording and no video recorded
  if (!isRecording && !hasRecorded) {
    return (
      <View style={styles.bottomBar}>
        <ActionButton
          type="gold"
          text={VIDEO_RECORDER_DATA.buttons.record}
          icon="videocam"
          onPress={onRecord}
        />
      </View>
    );
  }

  // Show recording indicator when recording
  if (isRecording) {
    return (
      <View style={styles.bottomBar}>
        <ActionButton
          type="outlined"
          text="Recording..."
          icon="radio-button-on"
          disabled={true}
        />
        <ActionButton
          type="gold"
          text="Stop"
          icon="stop-circle"
          onPress={onRecord}
        />
      </View>
    );
  }

  // Show retake and continue when video is recorded
  if (hasRecorded) {
    return (
      <View style={styles.bottomBar}>
        <ActionButton
          type="outlined"
          text={VIDEO_RECORDER_DATA.buttons.redo}
          icon="refresh-outline"
          onPress={onRedo}
        />
        <ActionButton
          type="gold"
          text={VIDEO_RECORDER_DATA.buttons.continue}
          icon="arrow-forward"
          iconPosition="right"
          onPress={onContinue}
        />
      </View>
    );
  }

  return null;
};

export default function VideoMessageRecorder({ navigation, route }) {
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const recorderRef = useRef(null);
  const devices = useCameraDevices();

  const backDevice = devices.find(device => device.position === 'back');
  const frontDevice = devices.find(device => device.position === 'front');
  const device = backDevice || frontDevice || devices[0];

  const videoOutput = useVideoOutput({ enableAudio: true });

  useEffect(() => {
    checkAndRequestPermission();
  }, []);

  useEffect(() => {
    if (device) {
      setIsLoading(false);
    }
  }, [device]);

  const checkAndRequestPermission = async () => {
    try {
      const hasPermission = await checkCameraPermission();
      console.log('hasPermission', hasPermission);
      setCameraPermission(hasPermission);
    } catch (error) {
      console.error('Error checking permission:', error);
      setCameraPermission(false);
    }
  };

  const handleRecordToggle = async () => {
    if (!cameraPermission) {
      Alert.alert('Permission Denied', 'Please grant camera permission.');
      return;
    }

    if (!device) {
      Alert.alert('Error', 'No camera device available');
      return;
    }

    if (!videoOutput) {
      Alert.alert('Error', 'Video output not ready yet');
      return;
    }

    if (isRecording) {
      try {
        console.log('Stopping recording...');
        const recorder = recorderRef.current;
        if (recorder) {
          await recorder.stopRecording();
        }
      } catch (error) {
        console.error('Error stopping:', error);
        setIsRecording(false);
      }
    } else {
      try {
        console.log('Starting recording...');
        const recorder = await videoOutput.createRecorder({});
        recorderRef.current = recorder;

        setIsRecording(true);

        await recorder.startRecording(
          path => {
            console.log('Recording finished:', path);
            setVideoUri(path);
            setHasRecorded(true);
            setIsRecording(false);
          },
          error => {
            console.error('Recording error:', error);
            setIsRecording(false);
            Alert.alert('Error', 'Failed to record: ' + error.message);
          },
        );
      } catch (error) {
        console.error('Error starting recording:', error);
        setIsRecording(false);
        Alert.alert('Error', 'Failed to start recording: ' + error.message);
      }
    }
  };

  const handleRedo = () => {
    setHasRecorded(false);
    setIsRecording(false);
    setVideoUri(null);
    recorderRef.current = null;
  };

  const handleContinue = () => {
    console.log('Continue pressed with video:', videoUri);

    // Format the video path for the next screen
    const formattedPath =
      Platform.OS === 'android' ? `file://${videoUri}` : videoUri;

    // Navigate to the next screen with the video path
    if (navigation) {
      navigation.navigate('VideoMessagePreview', {
        videoPath: formattedPath,
        videoUri: videoUri,
      });
    } else {
      // If navigation is not available, just show the path
      Alert.alert('Video Path', `Video saved at: ${formattedPath}`);
    }
  };

  const handleRecord = () => {
    if (!hasRecorded && !isRecording) {
      handleRecordToggle();
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <AppText
            text="Initializing camera..."
            size="medium"
            color={COLORS.WHITE}
            align="center"
          />
          <View style={styles.loadingSpinner} />
        </View>
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <AppText
            text="No camera device found"
            size="medium"
            color={COLORS.WHITE}
            align="center"
          />
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => setIsLoading(true)}
          >
            <AppText text="Retry" size="medium" color={COLORS.BLACK} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!cameraPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons
            name="camera-outline"
            size={Responsive.width(60)}
            color={COLORS.GOLD}
          />
          <AppText
            text="Camera Permission Required"
            size="large"
            color={COLORS.WHITE}
            align="center"
            style={styles.permissionTitle}
          />
          <AppText
            text="This app needs access to your camera to record video messages."
            size="medium"
            color="#888888"
            align="center"
            style={styles.permissionDescription}
          />
          <TouchableOpacity
            style={styles.goldButton}
            onPress={checkAndRequestPermission}
          >
            <AppText
              text="Grant Permission"
              size="medium"
              color={COLORS.BLACK}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Video Recorder'} />
      <GradientBackground />
      <View style={styles.content}>
        <HeaderIndicator isRecorded={hasRecorded} />

        <View style={styles.cameraBox}>
          <Camera
            style={styles.cameraView}
            device={device}
            isActive={true}
            outputs={[videoOutput]}
          />
          <View style={styles.cameraOverlayBottom}>
            <AppText
              text={
                isRecording ? '● REC' : VIDEO_RECORDER_DATA.camera.timerText
              }
              size="medium"
              color={isRecording ? '#FF0000' : '#E55B6E'}
              style={styles.recordingTimer}
            />
            <View style={styles.cameraLabelGroup}>
              <Ionicons
                name="videocam-outline"
                size={Responsive.width(20)}
                color={COLORS.WHITE}
              />
              <AppText
                text="Camera preview"
                size="small"
                color="#A0A0A0"
                style={styles.cameraLabelText}
              />
            </View>
          </View>
          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
            </View>
          )}
        </View>

        <RecordButton isRecording={isRecording} onPress={handleRecordToggle} />

        <BottomActions
          hasRecorded={hasRecorded}
          isRecording={isRecording}
          onRetake={handleRedo}
          onRedo={handleRedo}
          onContinue={handleContinue}
          onRecord={handleRecord}
        />
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
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
  },
  loadingSpinner: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    borderRadius: Responsive.width(20),
    borderWidth: 3,
    borderColor: COLORS.GOLD,
    borderTopColor: 'transparent',
    marginTop: Spacing.medium,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
  },
  permissionTitle: {
    marginTop: Spacing.large,
    marginBottom: Spacing.small,
  },
  permissionDescription: {
    marginBottom: Spacing.xLarge,
    lineHeight: Responsive.height(22),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },
  redDot: {
    width: Responsive.width(8),
    height: Responsive.width(8),
    borderRadius: Responsive.width(4),
    backgroundColor: '#E55B6E',
    marginRight: Spacing.tiny,
  },
  greenDot: {
    backgroundColor: '#4CAF50',
  },
  headerText: {
    fontWeight: 'bold',
  },
  cameraBox: {
    height: Responsive.height(420),
    width: '100%',
    backgroundColor: '#030303',
    borderRadius: Radius.xLarge,
    borderWidth: 1.5,
    borderColor: '#3B301B',
    overflow: 'hidden',
    position: 'relative',
  },
  cameraView: {
    flex: 1,
    width: '100%',
  },
  cameraOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: Spacing.large,
    backgroundColor: 'transparent',
  },
  recordingTimer: {
    fontWeight: '500',
  },
  cameraLabelGroup: {
    alignItems: 'center',
  },
  cameraLabelText: {
    marginTop: Spacing.tiny,
  },
  recordingIndicator: {
    position: 'absolute',
    top: Spacing.medium,
    right: Spacing.medium,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: Radius.small,
    padding: Spacing.tiny,
  },
  recordingDot: {
    width: Responsive.width(10),
    height: Responsive.width(10),
    borderRadius: Responsive.width(5),
    backgroundColor: '#FF0000',
    animation: 'pulse 1s infinite',
  },
  recordControlWrapper: {
    alignItems: 'center',
    marginVertical: Spacing.small,
  },
  recordOuterCircle: {
    width: Responsive.width(68),
    height: Responsive.width(68),
    borderRadius: Responsive.width(34),
    borderWidth: 2,
    borderColor: '#E55B6E',
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordInnerCircle: {
    width: Responsive.width(44),
    height: Responsive.width(44),
    borderRadius: Responsive.width(22),
    backgroundColor: '#E55B6E',
  },
  recordSquare: {
    width: Responsive.width(22),
    height: Responsive.width(22),
    borderRadius: Radius.tiny,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.medium,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: Responsive.height(48),
    paddingHorizontal: Spacing.xLarge,
    borderRadius: Radius.xLarge,
    minWidth: Responsive.width(120),
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: COLORS.BLACK,
  },
  outlinedButtonText: {
    fontWeight: '600',
  },
  goldButton: {
    backgroundColor: COLORS.GOLD,
    gap: Responsive.width(6),
    paddingHorizontal: Spacing.xLarge,
    paddingVertical: Spacing.medium,
    borderRadius: Radius.xLarge,
    alignSelf: 'center',
    minWidth: Responsive.width(150),
  },
  goldButtonText: {
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: Responsive.width(6),
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    opacity: 0.5,
  },
  retryButton: {
    backgroundColor: COLORS.GOLD,
    paddingHorizontal: Spacing.xLarge,
    paddingVertical: Spacing.medium,
    borderRadius: Radius.xLarge,
    alignSelf: 'center',
    marginTop: Spacing.medium,
  },
});
