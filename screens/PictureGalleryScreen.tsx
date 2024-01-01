import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import ImagePicker, {
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const PictureGalleryScreen = () => {
  const [imageSource, setImageSource] = useState<string>('');

  const options = {
    title: 'Load Photo',
    customButtons: [
      {name: 'button_id_1', title: 'CustomButton 1'},
      {name: 'button_id_2', title: 'CustomButton 2'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const showImagePicker = (): void => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
        setImageSource(response.assets[0].uri); // 얘가 잘 넘어가는지 모르겠음
        console.log('이미지 소스가 설정되었습니다:', response.assets[0].uri);
      }
    });
  };

  const showCamera = (): void => {
    launchCamera(options, response => {
      if (response.error) {
        console.log('LaunchCamera Error: ', response.error);
      } else {
        setImageSource(response.assets[0].uri);
      }
    });
  };

  return (
    <View>
      {imageSource && (
        <Image source={{uri: imageSource}} style={{width: 100, height: 100}} />
      )}
      <TouchableOpacity onPress={showImagePicker}>
        <Text>Load Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showCamera}>
        <Text>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PictureGalleryScreen;
