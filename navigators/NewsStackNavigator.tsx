import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import NewsListScreen, {Article} from '../screens/NewsListScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import NewsCategoryTopTabNavigator from './NewsCategoryTopTabNavigator';
import SearchedNewsScreen from '../screens/SearchedNewsScreen';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

export type NewsStackParamList = {
  NewsList: undefined;
  NewsDetail: {
    article: Article;
    category: string;
  };
  SearchedNewsList: {
    searchTitle: string;
  };
};

const Stack = createStackNavigator<NewsStackParamList>();

const NewsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewsList"
        component={NewsCategoryTopTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchedNewsList"
        component={SearchedNewsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default NewsStackNavigator;
