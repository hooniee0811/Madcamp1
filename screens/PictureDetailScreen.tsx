import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View, Animated, Easing} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeaIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';

import {PictureStackParamList} from '../navigators/PictureStackNavigator';
import Swiper from 'react-native-web-swiper';

import RNFS from 'react-native-fs'; // react-native-fs 라이브러리 추가

type Props = StackScreenProps<PictureStackParamList, 'PictureDetail'>;

const PictureDetailScreen = () => {
  const navigation = useNavigation<Props['navigation']>();

  const route = useRoute<Props['route']>();

  const goBack = () => {
    navigation.goBack();
  };
  const filePath = RNFS.DownloadDirectoryPath + '/images.json';

  const [currentIndex, setCurrentIndex] = useState<number>(route.params.index);

  const imageArr = route.params.imageArr;
  const setImageArr = route.params.setImageArr;
  const removeImage = route.params.removeImage;

  const [rerender, setRerender] = useState<boolean>(false);
  useEffect(() => {
    setRerender(!rerender);
  }, [imageArr[currentIndex].heart]);

  const deleteItem = (index: number) => {
    removeImage(index);
    setRerender(!rerender);
    RNFS.writeFile(filePath, JSON.stringify(imageArr), 'utf8')
      .then(success => {
        console.log('File written successfully');
      })
      .catch(error => {
        console.log('error');
      });
    goBack();
  };

  //하트 기능 만들기
  const opacity = useRef(new Animated.Value(0)).current;

  const handleDoubleTap = (idx: number) => () => {
    var lastTap = null;
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    //두번째 tap이 지난 tap을 한지 0.03초 이내에 이뤄졌을 때 -> Double tap
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleHeart(idx);
    } else {
      lastTap = now;
    }
  };

  const toggleHeart = (idx: number) => () => {
    const cp = [...route.params.imageArr]; // imageArr 복사
    cp[idx].heart = !cp[idx].heart;
    route.params.setImageArr(cp);
    fillHeart();
    setRerender(!rerender);
    RNFS.writeFile(filePath, JSON.stringify(imageArr), 'utf8')
      .then(success => {
        console.log('File written successfully');
      })
      .catch(error => {
        console.log('error');
      });
  };

  const fillHeart = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
      Animated.delay(600),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const renderSwiper = () => {
    return (
      <Swiper
        controlsEnabled={false}
        from={currentIndex}
        controlsProps={{prevTitle: '', nextTitle: ''}}
        onIndexChanged={setCurrentIndex}>
        {imageArr.map((item, index) => (
          <View key={item.idx}>
            <TouchableWithoutFeedback onPress={handleDoubleTap(currentIndex)}>
              <Image source={item.src} style={styles.image} />
            </TouchableWithoutFeedback>
          </View>
        ))}
      </Swiper>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack}>
          <IonIcon name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.topBarRightContainer}>
          {/* 하트 */}
          <TouchableOpacity
            onPress={toggleHeart(currentIndex)}
            style={{width: 25, height: 25}}>
            {imageArr[currentIndex].heart ? (
              <AntIcon name="heart" size={24} color={'#D00B00'}></AntIcon>
            ) : (
              <AntIcon name="hearto" size={24} color={'#595959'}></AntIcon>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              deleteItem(currentIndex);
            }}>
            <FeaIcon name="trash-2" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {renderSwiper()}
      <Animated.View
        style={{
          position: 'absolute',
          opacity: opacity,
          justifyContent: 'center',
          alignItems: 'center', // 수평 정렬을 위해 추가
          top: '50%', // 수직 정렬을 위해 추가
          left: '50%', // 수평 정렬을 위해 추가
          transform: [
            {translateX: -25}, // 아이콘의 절반 크기만큼 왼쪽으로 이동
            {translateY: -25}, // 아이콘의 절반 크기만큼 위로 이동
          ],
        }}>
        {imageArr[currentIndex].heart && (
          <AntIcon name="heart" size={70} color={'#D00B00'}></AntIcon>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingTop: 12,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBarRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginRight: 12,
  },
  image: {width: '100%', height: '100%', objectFit: 'contain'}, //height 화면 크기에 맞도록 수정하기
  pictureNum: {
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',

    color: '#000000',
  },
});

export default PictureDetailScreen;
