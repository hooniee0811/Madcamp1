import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import NewsListScreen from '../screens/NewsListScreen';

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

const Tab = createMaterialTopTabNavigator();

const NewsCategoryTopTabNavigator = () => {
  return (
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
  );
};

export default NewsCategoryTopTabNavigator;
