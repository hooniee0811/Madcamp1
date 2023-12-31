import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
``;
import {FlatList} from 'react-native-gesture-handler';
import {PictureStackParamList} from '../navigators/PictureStackNavigator';
import picturesData from '../src/pictures.json';
import AntIcon from 'react-native-vector-icons/AntDesign';

const imageArr = [
  {idx: '1', src: require('../assets/img1.png')},
  {idx: '2', src: require('../assets/img2.png')},
  {idx: '3', src: require('../assets/img3.png')},
  {idx: '4', src: require('../assets/img4.png')},
  {idx: '5', src: require('../assets/img5.png')},
];
type Props = StackPictureProps<PictureStackParamList, 'PictureList'>;

const PictureListScreen = () => {
  const navigation = useNavigation<Props['navigation']>();

  const [containerWidth, setContainerWidth] = useState(0);

  const margin = 0; // 비율에 맞도록 수정하기
  // const margin = styles.imageThumbnailContainer.margin * 2;
  const numColumns = 3;
  const thumbnailSize = (containerWidth - margin) / numColumns;

  const pictureCamera = () => {
    navigation.navigate('PictureCamera');
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.idx}
        data={imageArr}
        style={styles.imageArr}
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.idx}
            onPress={
              () =>
                navigation.navigate('PictureDetail', {
                  src: item.src,
                  count: imageArr.length,
                  idx: item.idx,
                }) //이미지 넘기기
            }>
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
          </TouchableOpacity>
        )}
        numColumns={numColumns}
      />
      {/* <TouchableOpacity style={styles.camera} onPress={pictureCamera}>
        <AntIcon name="camera" size={30} color="black" />
      </TouchableOpacity> */}
      <Text style={styles.pictureCount}>{imageArr.length}장의 사진</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  imageArr: {
    // backgroundColor: 'skyblue',
    width: '100%',
    // marginHorizontal: '5%',
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
  pictureCount: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  camera: {
    justifyContent: 'flex-end',
  },
});

export default PictureListScreen;
