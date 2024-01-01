import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import NewsListScreen, {Article} from '../screens/NewsListScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import NewsCategoryTopTabNavigator from './NewsCategoryTopTabNavigator';

export type NewsStackParamList = {
  NewsList: undefined;
  NewsDetail: {
    article: Article;
    category: string;
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
    </Stack.Navigator>
  );
};

export default NewsStackNavigator;
