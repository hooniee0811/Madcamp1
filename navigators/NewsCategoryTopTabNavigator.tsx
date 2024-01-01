import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';
import NewsListScreen from '../screens/NewsListScreen';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NewsStackParamList} from './NewsStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

export type NewsCategoryTopTabParamList = {
  General: {
    category: string;
  };
  Business: {
    category: string;
  };
  Entertainment: {
    category: string;
  };
  Science: {
    category: string;
  };
  Technology: {
    category: string;
  };
  Sports: {
    category: string;
  };
  Health: {
    category: string;
  };
};

type Props = StackScreenProps<NewsStackParamList, 'NewsList'>;

const Tab = createMaterialTopTabNavigator();

const NewsCategoryTopTabNavigator = () => {
  const [searchTitle, setSearchTitle] = useState<string>('');
  const navigation = useNavigation<Props['navigation']>();

  const onChangeSearchTitle = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setSearchTitle(evt.nativeEvent.text);
  };

  const search = () => {
    navigation.navigate('SearchedNewsList', {
      searchTitle: searchTitle,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
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
      <Tab.Navigator
        initialRouteName="General"
        screenOptions={{
          tabBarStyle: {
            height: 48,
            backgroundColor: '#F5F7FE',
            borderColor: '#F5F7FE',
          },
          tabBarLabelStyle: {
            fontFamily: 'Pretendard',
            fontSize: 14,
            width: 'auto',
          },
          tabBarScrollEnabled: true,
          tabBarItemStyle: {width: 80},
        }}>
        <Tab.Screen
          name="General"
          component={NewsListScreen}
          options={{tabBarLabel: '종합'}}
          initialParams={{
            category: 'general',
          }}
        />
        <Tab.Screen
          name="Business"
          component={NewsListScreen}
          options={{tabBarLabel: '경제'}}
          initialParams={{
            category: 'business',
          }}
        />
        <Tab.Screen
          name="Entertainment"
          component={NewsListScreen}
          options={{tabBarLabel: '연예'}}
          initialParams={{
            category: 'entertainment',
          }}
        />
        <Tab.Screen
          name="Science"
          component={NewsListScreen}
          options={{tabBarLabel: '과학'}}
          initialParams={{
            category: 'science',
          }}
        />
        <Tab.Screen
          name="Technology"
          component={NewsListScreen}
          options={{tabBarLabel: '기술'}}
          initialParams={{
            category: 'technology',
          }}
        />
        <Tab.Screen
          name="Sports"
          component={NewsListScreen}
          options={{tabBarLabel: '스포츠'}}
          initialParams={{
            category: 'sports',
          }}
        />
        <Tab.Screen
          name="Health"
          component={NewsListScreen}
          options={{tabBarLabel: '건강'}}
          initialParams={{
            category: 'health',
          }}
        />
      </Tab.Navigator>
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

export default NewsCategoryTopTabNavigator;
