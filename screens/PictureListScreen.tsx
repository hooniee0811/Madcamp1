import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
``;
import {FlatList} from 'react-native-gesture-handler';
import {PictureStackParamList} from '../navigators/PictureStackNavigator';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntIcon from 'react-native-vector-icons/Entypo';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

import RNFS from 'react-native-fs';
import ImagePicker, {
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import {StackScreenProps} from '@react-navigation/stack';
type Props = StackScreenProps<PictureStackParamList, 'PictureList'>;

export type imageArr = {
  idx: number;
  src: {uri: string | undefined};
  heart: boolean;
};

const PictureListScreen = () => {
  const navigation = useNavigation<Props['navigation']>();

  const [imageArr, setImageArr] = useState<imageArr[]>([]);
  const [writefile, setWritefile] = useState<boolean>(false);

  const filePath = RNFS.DownloadDirectoryPath + '/images.json';

  const readImages = async () => {
    try {
      if (!(await RNFS.exists(filePath))) {
        await RNFS.writeFile(filePath, JSON.stringify([]), 'utf8');
      }
      const fileContent = await RNFS.readFile(filePath, 'utf8');
      setImageArr(JSON.parse(fileContent));
    } catch (error) {
      console.log(error);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  const requestWriteFilePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Write File Permission',
          message: 'This app needs access to write files to your storage.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Write file permission granted');
      } else {
        console.log('Write file permission denied');
      }
    } catch (error) {
      console.error('Error requesting write file permission:', error);
    }
  };

  useEffect(() => {
    requestCameraPermission();
    requestWriteFilePermission();
    readImages();
  }, []);

  useEffect(() => {
    if (writefile)
      RNFS.writeFile(filePath, JSON.stringify(imageArr), 'utf8')
        .then(success => {
          console.log('File written successfully');
        })
        .catch(error => {
          console.log('error');
        });
    setWritefile(true);
  }, [imageArr.length]);

  const [showHeart, setShowHeart] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const numColumns = 3;
  const containerWidth = Dimensions.get('window').width;
  const margin = containerWidth * 0.04;
  const thumbnailSize = (containerWidth - margin) / numColumns;

  const removeImage = (idxToRemove: number) => {
    const cp = [...imageArr];
    cp.splice(idxToRemove, 1);
    setImageArr(cp);
  };

  const longPressButton = (idx: number) => {
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
  const Item = ({item, index}) => {
    return (
      <TouchableHighlight
        key={item.idx}
        onPress={() =>
          navigation.navigate('PictureDetail', {
            index: index,
            imageArr: imageArr,
            setImageArr: setImageArr,
            removeImage: removeImage,
          })
        }
        onLongPress={() => longPressButton(index)} //길게 누르면 삭제
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
          <View style={styles.eachHeart}>
            {item.heart && (
              <AntIcon name="heart" size={20} color={'#D00B00'}></AntIcon>
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const options = {
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
      } else {
        console.log('Response = ', response);
        //이미지 배열에 추가
        const cp = [...imageArr];
        if (response.assets) {
          cp.push({
            idx: cp.length + 1,
            src: {uri: response.assets[0].uri},
            heart: false,
          });
        }
        setImageArr(cp);
      }
    });
    setShowButton(false);
  };

  const showCamera = (): void => {
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        console.log('Response = ', response);
        //이미지 배열에 추가
        const cp = [...imageArr];
        if (response.assets) {
          cp.push({
            idx: cp.length + 1,
            src: {uri: response.assets[0].uri},
            heart: false,
          });
        }
        setImageArr(cp);
      }
    });
    setShowButton(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{width: 20}}></View>
        <Text style={styles.pictureCount}>{imageArr.length}장의 사진</Text>
        <TouchableOpacity
          onPress={() => {
            setShowButton(!showButton);
          }}>
          <EntIcon name="dots-three-vertical" size={20} color="black"></EntIcon>
        </TouchableOpacity>
      </View>

      <FlatList
        data={
          showHeart ? imageArr.filter(item => item.heart === true) : imageArr
        }
        style={styles.imageArr}
        renderItem={({item, index}) => {
          return <Item item={item} index={index} key={item.idx} />;
        }}
        numColumns={numColumns}
        ListFooterComponent={<View style={{height: 100}}></View>}
      />

      <Modal
        visible={showButton}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowButton(false)}>
        <Pressable
          style={{flex: 1, backgroundColor: 'rgba(97,97,97, 0.70)'}}
          onPress={() => setShowButton(false)}
        />
        <View style={styles.footer}>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.camera} onPress={showCamera}>
              <AntIcon name="camera" size={25} color="#737373" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.gallery} onPress={showImagePicker}>
              <MatIcon name="insert-photo" size={25} color="#737373" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowHeart(!showHeart);
                setShowButton(false);
              }}
              style={styles.heartButton}>
              {showHeart ? (
                <AntIcon name="heart" size={25} color={'#D00B00'}></AntIcon>
              ) : (
                <AntIcon name="hearto" size={25} color={'#595959'}></AntIcon>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 0,
    backgroundColor: '#ffffff',
  },
  imageArr: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: 2,
  },
  imageThumbnailContainer: {
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
    height: 70,
    width: 70,
    backgroundColor: '#F5F7FE',
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 1,
    borderRadius: 35,
  },
  camera: {
    flexDirection: 'row',
    height: 70,
    width: 70,
    backgroundColor: '#F5F7FE',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderRadius: 35,
  },
  pictureCount: {
    color: '#000000',
    // justifyContent: 'center',
    // alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: '50%',
    transform: [{translateY: 35}],
    width: '100%',
    zIndex: 2,
    height: 70,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heartButton: {
    flexDirection: 'row',
    height: 70,
    width: 70,
    backgroundColor: '#F5F7FE',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderRadius: 35,
  },
  eachHeart: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default PictureListScreen;
