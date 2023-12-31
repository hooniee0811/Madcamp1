import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';

const PictureGalleryScreen = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  //이미지 추가 함수를 추가
  const addImageToPictureList = newImage => {
    navigation.navigate('PictureList', {selectedImage: newImage});
  }; // PictureList화면으로 이동 기능

  //렌더링 된 selectedImage값 보기 위해
  useEffect(() => {
    console.log('useEffect selectImage:', selectedImage);
  }, [selectedImage]);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo', // 미디어 타입을 사진으로 설정
    };
    launchImageLibrary(options, response => {
      console.log('ImagePicker Response:', response);

      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (!response.assets || response.assets.length === 0) {
        console.log('No image selected');
      } else {
        // 이미지를 선택한 경우
        const selectedImagePath = response.assets[0].uri;
        //file 형식의 파일을 받을 수 있도록
        const cleanSelectedImagePath = selectedImagePath.replace('file://', '');
        setSelectedImage(cleanSelectedImagePath);
        console.log('Selected Image:', selectedImagePath); //여기까지는 잘 됨. selectedImage가 잘 나옴

        // 선택한 이미지를 PictureListScreen으로 전달
        addImageToPictureList(cleanSelectedImagePath);
      }
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={openImagePicker}>
        <Text>Select Image from Gallery</Text>
      </TouchableOpacity>
      {selectedImage && (
        <View style={{marginTop: 20}}>
          <Image
            source={{uri: selectedImage}}
            style={{width: 200, height: 200}}
          />
        </View>
      )}
      <View style={{marginTop: 20}}>
        <Image
          source={{uri: selectedImage}}
          style={{width: 200, height: 200}}
        />
      </View>
    </View>
  );
};

export default PictureGalleryScreen;
