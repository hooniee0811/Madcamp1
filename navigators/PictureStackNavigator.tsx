import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import PictureListScreen from '../screens/PictureListScreen';
import PictureDetailScreen from '../screens/PictureDetailScreen';
import PictureGalleryScreen from '../screens/PictureGalleryScreen';
import PictureCameraScreen from '../screens/PictureCameraScreen';

export type PictureStackParamList = {
  PictureList: undefined;
  PictureDetail: undefined;
  PictureGallery: undefined;
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
      name="PictureGallery"
      component={PictureGalleryScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="PictureCamera"
      component={PictureCameraScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default PictureStackNavigator;
