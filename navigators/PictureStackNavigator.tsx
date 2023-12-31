import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import PictureListScreen from '../screens/PictureListScreen';
import PictureDetailScreen from '../screens/PictureDetailScreen';
import PictureDeleteScreen from '../screens/PictureDeleteScreen';
import PictureCameraScreen from '../screens/PictureCameraScreen';

export type PictureStackParamList = {
  PictureList: undefined;
  PictureDetail: undefined;
  PictureDelete: undefined;
  PictureCamera: undefined;
};

const Stack = createStackNavigator<PictureStackParamList>();

const PictureStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PictureList"
      component={PictureListScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="PictureDetail"
      component={PictureDetailScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="PictureDelete"
      component={PictureDeleteScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default PictureStackNavigator;
