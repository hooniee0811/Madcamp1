import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {NewsStackParamList} from '../navigators/NewsStackNavigator';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Article} from './NewsListScreen';
import NewsItem from '../components/NewsItem';

type Props = StackScreenProps<NewsStackParamList, 'SearchedNewsList'>;

const SearchedNewsScreen = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const route = useRoute<Props['route']>();
  const navigation = useNavigation<Props['navigation']>();

  const [searchTitle, setSearchTitle] = useState<string>(
    route.params.searchTitle,
  );

  async function fetchData() {
    const response = await fetch(
      `https://newsapi.org/v2/everything?language=en&q=${searchTitle}&apiKey=9069b176faf64afc98a65a42c3b02ac1`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    console.log('----------------------------');
    console.log(data.articles);
    setArticles(data.articles);
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

  const onChangeSearchTitle = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setSearchTitle(evt.nativeEvent.text);
  };

  const search = () => {
    fetchData();
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onSelect = (article: Article) => {
    navigation.navigate('NewsDetail', {article: article, category: ''});
  };

  console.log(route.params.searchTitle);
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <IonIcon name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchText}
            placeholder="Search"
            placeholderTextColor={'#C9C9C9'}
            value={searchTitle}
            onChange={onChangeSearchTitle}
            onSubmitEditing={search}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={search}>
            <AntIcon name="search1" color="#7A7A7A" size={20} />
          </TouchableOpacity>
        </View>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 8,
  },
  topBar: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    flex: 1,
    height: 40,
    backgroundColor: '#F5F7FE',
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 8,
    gap: 4,
    alignItems: 'center',
  },
  searchText: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },
  searchBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
  },
});

export default SearchedNewsScreen;
