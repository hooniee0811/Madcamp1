import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeaIcon from 'react-native-vector-icons/Feather';
import {ContactsStackParamList} from '../navigators/ContactsStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {PictureStackParamList} from '../navigators/PictureStackNavigator';

type Props = StackScreenProps<PictureStackParamList, 'PictureDetail'>;

const PictureDetailScreen = ({route}) => {
  const navigation = useNavigation<Props['navigation']>();

  const goBack = () => {
    navigation.goBack();
  };

  const deletePicture = () => {
    // route.params.idx를 사용하여 현재 화면에서 보여지고 있는 이미지의 idx를 가져옵니다.
    const idxToRemove = route.params.idx;

    // PictureListScreen에 있는 removeImage 함수를 호출하여 이미지를 삭제합니다.
    const removeImage = route.params.removeImage;
    removeImage(idxToRemove);

    // 이미지 삭제 후 이전 화면으로 돌아갑니다.
    goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack}>
          <IonIcon name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.topBarRightContainer}>
          <TouchableOpacity>
            <FeaIcon name="edit" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={deletePicture}>
            <FeaIcon name="trash-2" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.pictureNum}>
          {route.params.idx}/{route.params.count}
        </Text>
      </View>
      <ScrollView>
        <Image source={route.params.src} style={styles.image} />
      </ScrollView>
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
  image: {width: '100%', height: 750, objectFit: 'contain'}, //height 화면 크기에 맞도록 수정하기
  pictureNum: {
    justifyContent: 'center', //이게 적용이 안 된다.
    marginHorizontal: '47%',

    color: '#000000',
  },
});

export default PictureDetailScreen;
