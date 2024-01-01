import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {
  CompositeScreenProps,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {NewsCategoryTopTabParamList} from '../navigators/NewsCategoryTopTabNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {NewsStackParamList} from '../navigators/NewsStackNavigator';
import NewsItem from '../components/NewsItem';
import {format, subDays} from 'date-fns';
import {RefreshControl} from 'react-native-gesture-handler';

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<
    NewsCategoryTopTabParamList,
    | 'General'
    | 'Business'
    | 'Entertainment'
    | 'Science'
    | 'Technology'
    | 'Sports'
    | 'Health'
  >,
  StackScreenProps<NewsStackParamList, 'NewsList'>
>;

export type Article = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
};

const NewsListScreen = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const category = route.params.category;

  async function fetchData() {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=9069b176faf64afc98a65a42c3b02ac1`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    console.log('----------------------------');
    // console.log(data.articles);
    setArticles(data.articles);
    // setRefreshing(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const onSelect = (article: Article) => {
    navigation.navigate('NewsDetail', {article: article, category: category});
  };

  return (
    <FlatList
      data={articles}
      style={{backgroundColor: 'white'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({item}) => (
        <NewsItem
          title={item.title}
          publishedAt={item.publishedAt}
          imageUrl={item.urlToImage}
          onSelect={() => onSelect(item)}
        />
      )}
      keyExtractor={(item, index) => item.url}
    />
  );
};

export default NewsListScreen;
