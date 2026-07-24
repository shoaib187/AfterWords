import Sound from 'react-native-nitro-sound';

import { requestAudioPermission } from '../audioPermissions/audioPermissions';

let recordPath = '';
let recordListener = null;
let playListener = null;
let playEndListener = null;

export const recordVoice = async onTimeUpdate => {
  try {
    const granted = await requestAudioPermission();
    if (!granted) {
      throw new Error('Required permissions not granted');
    }

    recordListener = Sound.addRecordBackListener(e => {
      onTimeUpdate?.({
        currentPosition: e.currentPosition,
        formatted: Sound.mmssss(Math.floor(e.currentPosition)),
      });
    });

    const path = await Sound.startRecorder();
    recordPath = path;
    return path;
  } catch (error) {
    console.error('Recording error:', error);
    throw error;
  }
};

export const stopRecording = async () => {
  try {
    const path = await Sound.stopRecorder();
    Sound.removeRecordBackListener();
    recordListener = null;
    recordPath = path;
    return path;
  } catch (error) {
    console.error('Failed to stop recording:', error);
    throw error;
  }
};

// ---------- Playback ----------
export const playRecording = async (path, onTimeUpdate, onEnd) => {
  if (!path) {
    throw new Error('No recording found');
  }
  if (!recordPath) {
    throw new Error('No recording found');
  }

  try {
    playListener = Sound.addPlayBackListener(e => {
      const currentSec = e.currentPosition / 1000; // Convert ms to seconds
      const totalSec = e.duration / 1000;

      onTimeUpdate?.(currentSec, totalSec);
    });

    playEndListener = Sound.addPlaybackEndListener(() => {
      onEnd?.();
    });

    await Sound.startPlayer(recordPath || path);
  } catch (error) {
    console.error('Failed to play recording:', error);
    throw error;
  }
};
