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
} from 'react-native';
``;
import {FlatList} from 'react-native-gesture-handler';
import {PictureStackParamList} from '../navigators/PictureStackNavigator';
import picturesData from '../src/pictures.json';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FonIcon from 'react-native-vector-icons/Fontisto';

type Props = StackPictureProps<PictureStackParamList, 'PictureList'>;

const PictureListScreen = () => {
  const navigation = useNavigation<Props['navigation']>();

  const [containerWidth, setContainerWidth] = useState(0);

  const [imageArr, setImageArr] = useState([
    {idx: '1', src: require('../assets/img1.png')},
    {idx: '2', src: require('../assets/img2.png')},
    {idx: '3', src: require('../assets/img3.png')},
    {idx: '4', src: require('../assets/img4.png')},
    {idx: '5', src: require('../assets/img5.png')},
  ]);

  const margin = 0; // 비율에 맞도록 수정하기
  // const margin = styles.imageThumbnailContainer.margin * 2;
  const numColumns = 3;
  const thumbnailSize = (containerWidth - margin) / numColumns;

  const pictureGallery = () => {
    navigation.navigate('PictureGallery');
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
      <TouchableOpacity style={styles.gallery} onPress={pictureGallery}>
        <FonIcon name="photograph" size={30} color="black" />
      </TouchableOpacity>
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
  pictureCount: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  gallery: {
    justifyContent: 'flex-start',
  },
});

export default PictureListScreen;
