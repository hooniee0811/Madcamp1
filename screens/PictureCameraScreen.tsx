import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';

const PictureCameraScreen = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
    };

    // 이미지 라이브러리 열기
    launchImageLibrary(options, response => {
      handleImagePickerResponse(response);
    });
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
    };

    // 카메라 열기
    launchCamera(options, response => {
      console.log('launchCamera!', response);
      handleImagePickerResponse(response);
    });
  };

  const handleImagePickerResponse = async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else if (response.uri) {
      // uri가 정의되어 있는 경우에만 처리
      // 선택한 이미지 처리
      console.log('Selected Image:', response.uri);
      setSelectedImage(response.uri);

      // 이미지를 로컬 파일로 저장
      const imagePath = `${RNFS.DocumentDirectoryPath}/${Date.now()}.jpg`;

      try {
        await RNFS.moveFile(response.uri, imagePath);
        console.log('이미지가 로컬 파일로 저장되었습니다:', imagePath);
      } catch (error) {
        console.error('이미지 저장 실패:', error);
      }
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={openCamera}>
        <Text>Take a Photo</Text>
      </TouchableOpacity>

      {selectedImage && (
        <View style={{marginTop: 20}}>
          <Image
            source={{uri: selectedImage}}
            style={{width: 200, height: 200}}
          />
        </View>
      )}
    </View>
  );
};

export default PictureCameraScreen;
