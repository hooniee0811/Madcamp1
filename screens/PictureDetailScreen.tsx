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
  const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const deletePicture = () => {
    const idxToRemove = route.params.idx;

    const removeImage = route.params.removeImage;
    const updatedImageArr = route.params.imageArr.filter(
      item => item.idx !== idxToRemove,
    );
    removeImage(idxToRemove, updatedImageArr);

    goBack();
  };
  const renderPictureNum = () => {
    if (deleteButtonPressed) {
      return (
        <Text style={styles.pictureNum}>
          {route.params.idx}/{route.params.count}
        </Text>
      );
    } else {
      return (
        <Text style={styles.pictureNum}>
          {route.params.imageArr.findIndex(
            item => item.idx === route.params.idx,
          ) + 1}
          /{route.params.imageArr.length}
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack}>
          <IonIcon name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.topBarRightContainer}>
          {/* <TouchableOpacity>
            <FeaIcon name="edit" size={20} color="black" />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              deletePicture();
              setDeleteButtonPressed(true);
            }}>
            <FeaIcon name="trash-2" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View>{renderPictureNum()}</View>
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
  image: {width: '100%', height: 730, objectFit: 'contain'}, //height 화면 크기에 맞도록 수정하기
  pictureNum: {
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',

    color: '#000000',
  },
});

export default PictureDetailScreen;
