import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NewsStackParamList} from '../navigators/NewsStackNavigator';
import {useNavigation, useRoute} from '@react-navigation/native';
import {format} from 'date-fns';
import IonIcon from 'react-native-vector-icons/Ionicons';

type Props = StackScreenProps<NewsStackParamList, 'NewsDetail'>;

const NewsDetailScreen = () => {
  const categories: {[key: string]: string} = {
    general: '종합',
    business: '경제',
    entertainment: '연예',
    science: '과학',
    technology: '기술',
    sports: '스포츠',
    health: '건강',
  };
  const route = useRoute<Props['route']>();
  const navigation = useNavigation<Props['navigation']>();
  const article = route.params.article;
  const category = route.params.category;
  console.log(category);

  const onOpenLink = () => {
    Linking.openURL(article.url);
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <IonIcon name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.categoryText}>{categories[category]}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.smallText}>
          Published At: {format(article.publishedAt, 'yyyy.MM.dd HH:mm')}
        </Text>
        {article.urlToImage && (
          <Image source={{uri: article.urlToImage}} style={styles.image} />
        )}
        <Text style={styles.descText}>{article.description}</Text>
        <Text style={styles.smallText}>Author: {article.author}</Text>
        <TouchableOpacity onPress={onOpenLink}>
          <Text style={styles.linkText}>Read More</Text>
        </TouchableOpacity>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  categoryText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    color: '#7A7A7A',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Pretendard',
    fontSize: 22,
    fontWeight: '900',
    color: 'black',
    marginBottom: 8,
  },
  image: {
    resizeMode: 'cover',
    height: 250,
    marginBottom: 24,
  },
  descText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginBottom: 32,
  },
  smallText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: '#7A7A7A',
    marginBottom: 24,
  },
  linkText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    color: '#5878E8',
    textDecorationLine: 'underline',
  },
});

export default NewsDetailScreen;
