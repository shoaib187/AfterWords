import { Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

export const pickImage = callback => {
  const options = {
    mediaType: 'mixed',
    quality: 0.7,
    includeBase64: true,
    videoQuality: 'medium',
  };

  launchImageLibrary(options, response => {
    if (response.didCancel) return;
    if (response.errorCode) {
      Alert.alert('Error', response.errorMessage);
      return;
    }

    const asset = response.assets[0];
    // This creates the exact format Cloudinary expects
    const base64String = `data:${asset.type};base64,${asset.base64}`;

    callback({
      uri: asset.uri,
      base64: base64String,
    });
  });
};

const options = {
  mediaType: 'mixed',
  quality: 0.5,
  includeBase64: true,
  multiple: true,
};

const handlePickerResponse = async (response, callback) => {
  if (response.didCancel) return;

  if (response.errorCode) {
    Alert.alert('Picker Error', response.errorMessage);
    return;
  }

  if (response.assets && response.assets.length > 0) {
    const asset = response.assets[0];

    let base64String = null;

    // IMAGE
    if (asset.type?.startsWith('image')) {
      base64String = asset.base64
        ? `data:${asset.type};base64,${asset.base64}`
        : null;
    }

    // VIDEO
    if (asset.type?.startsWith('video')) {
      try {
        const path = asset.uri.replace('file://', '');

        const videoBase64 = await RNFS.readFile(path, 'base64');

        base64String = `data:${asset.type};base64,${videoBase64}`;
      } catch (error) {
        console.log('Video Base64 Error:', error);
      }
    }

    callback({
      uri: asset.uri,
      base64: base64String,
      mediaType: asset.type?.startsWith('video') ? 'video' : 'image',
    });
  }
};

export const pickImageFromLibrary = callback => {
  launchImageLibrary(options, res => handlePickerResponse(res, callback));
};

export const pickImageFromCamera = callback => {
  launchCamera(options, res => handlePickerResponse(res, callback));
};

export const convertImageToBase64 = async imageUri => {
  try {
    const path = imageUri.replace('file://', '');

    const base64 = await RNFS.readFile(path, 'base64');

    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.log('Base64 Error:', error);
    return null;
  }
};
