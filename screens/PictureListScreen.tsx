import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
``;
import {FlatList} from 'react-native-gesture-handler';
import {PictureStackParamList} from '../navigators/PictureStackNavigator';
import picturesData from '../src/pictures.json';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FonIcon from 'react-native-vector-icons/Fontisto';
import FonAweIcon from 'react-native-vector-icons/FontAwesome';
import EntIcon from 'react-native-vector-icons/Entypo';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker'; // image-picker 라이브러리 추가

import RNFS from 'react-native-fs'; // react-native-fs 라이브러리 추가
import {writeFile, DocumentDirectoryPath} from 'react-native-fs';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {openCamera} from './PictureCameraScreen';
// type Props = StackPictureProps<PictureStackParamList, 'PictureList'>;

type PictureListProps = {
  route: any;
};

const PictureListScreen = ({route}) => {
  const navigation = useNavigation<Props['navigation']>();

  const [containerWidth, setContainerWidth] = useState(0);

  const [imageArr, setImageArr] = useState([
    {idx: '1', src: require('../assets/img1.png')},
    {idx: '2', src: require('../assets/img2.png')},
    {idx: '3', src: require('../assets/img3.png')},
    {idx: '4', src: require('../assets/img4.png')},
    {idx: '5', src: require('../assets/img5.png')},
  ]);

  useEffect(() => {
    // route에서 selectedImage를 가져와서 이미지 배열에 추가
    const selectedImage = route.params?.selectedImage;
    if (selectedImage) {
      // 이미지를 로컬 파일로 저장
      const saveImageToLocalFile = async () => {
        try {
          const imagePath = `${DocumentDirectoryPath}/${Date.now()}.jpg`;

          // 이미지를 로컬 파일로 저장
          await RNFS.moveFile(selectedImage, imagePath);

          // 이미지 배열을 복제하여 업데이트
          setImageArr(prevImageArr => [
            ...prevImageArr,
            {idx: String(prevImageArr.length + 1), src: imagePath},
          ]);

          console.log('이미지가 로컬 파일로 저장되었습니다:', imagePath);
        } catch (error) {
          console.error('이미지 저장 실패:', error);
        }
      };

      saveImageToLocalFile();
    }
  }, [route.params?.selectedImage]);

  const margin = 0; // 비율에 맞도록 수정하기
  // const margin = styles.imageThumbnailContainer.margin * 2;
  const numColumns = 3;
  const thumbnailSize = (containerWidth - margin) / numColumns;
  //pictureGalleryScreen으로 이동
  const pictureGallery = () => {
    navigation.navigate('PictureGallery');
  };
  //pictureCameraScreen으로 이동
  const PictureCamera = () => {
    navigation.navigate('PictureCamera');
  };

  const removeImage = idxToRemove => {
    const updatedImageArr = imageArr.filter(item => item.idx !== idxToRemove);
    setImageArr(updatedImageArr);
  };

  const longPressButton = idx => {
    Alert.alert(
      '삭제하시겠습니까?',
      '',
      [
        {
          text: '아니요',
          onPress: () => console.log('취소되었습니다.'),
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => removeImage(idx),
        },
      ],
      {cancelable: true},
    );
  };
  const Item = ({item}) => {
    return (
      <TouchableHighlight
        key={item.idx}
        onPress={() =>
          navigation.navigate('PictureDetail', {
            src: item.src,
            count: imageArr.length,
            idx: item.idx,
            imageArr: imageArr,
            removeImage: removeImage,
          })
        }
        onLongPress={() => longPressButton(item.idx)} //길게 누르면 삭제
      >
        <View style={styles.imageThumbnailContainer}>
          <Image
            style={[
              styles.imageThumbnail,
              {
                width: thumbnailSize,
                height: thumbnailSize,
              },
            ]}
            source={item.src}
          />
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.idx}
        data={imageArr}
        style={styles.imageArr}
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        renderItem={({item}) => <Item item={item} />}
        numColumns={numColumns}
      />
      <Text style={styles.pictureCount}>{imageArr.length}장의 사진</Text>
      <TouchableOpacity style={styles.camera} onPress={PictureCamera}>
        <AntIcon name="camera" size={25} color="#737373" />
        <Text>카메라로 촬영하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.gallery} onPress={pictureGallery}>
        <MatIcon name="insert-photo" size={25} color="#737373" />
        <Text>앨범에서 가져오기</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  imageArr: {
    width: '100%',
    marginVertical: '5%',
  },
  imageThumbnailContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 2,
  },
  imageThumbnail: {
    backgroundColor: '#C2C2C2',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', //w, h에 맞게 사진 크기 조절
  },
  gallery: {
    flexDirection: 'row',
    position: 'absolute',
    height: 60,
    width: '45%',
    right: 16,
    bottom: 20,
    backgroundColor: '#F5F7FE',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    elevation: 1,
    borderRadius: 10,
  },
  camera: {
    flexDirection: 'row',
    position: 'absolute',
    height: 60,
    width: '45%',
    left: 16,
    bottom: 20,
    backgroundColor: '#F5F7FE',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    elevation: 1,
    borderRadius: 10,
  },
  pictureCount: {
    marginBottom: 90,
    color: '#737373',
  },
});

export default PictureListScreen;
