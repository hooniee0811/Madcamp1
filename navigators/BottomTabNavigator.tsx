import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import PictureScreen from '../screens/PictureScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import FonIcon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View} from 'react-native';
import ContactsStackNavigator from './ContactsStackNavigator';
import NewsStackNavigator from './NewsStackNavigator';

export type BottomTabParamList = {
  Contacts: undefined;
  Pictures: undefined;
  News: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#F5F7FE', borderColor: '#F5F7FE'},
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Contacts"
        component={ContactsStackNavigator}
        options={{
          tabBarIcon: ({size, focused}) => (
            <View style={focused ? styles.focusedContainer : styles.container}>
              <Icon
                name="contacts"
                size={24}
                color={focused ? 'black' : '#616161'}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.focusedLabel : styles.label}>
              Contacts
            </Text>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Pictures"
        component={PictureScreen}
        options={{
          tabBarIcon: ({size, focused}) => (
            <View style={focused ? styles.focusedContainer : styles.container}>
              <Icon
                name="picture"
                size={24}
                color={focused ? 'black' : '#616161'}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.focusedLabel : styles.label}>
              Pictures
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsStackNavigator}
        options={{
          tabBarIcon: ({size, focused}) => (
            <View style={focused ? styles.focusedContainer : styles.container}>
              <FonIcon
                name="newspaper-o"
                size={24}
                color={focused ? 'black' : '#616161'}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.focusedLabel : styles.label}>
              News
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedContainer: {
    width: 56,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CED7F8',
    borderRadius: 16,
  },
  label: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '700',
    color: '#616161',
    // marginBottom: 5,
  },
  focusedLabel: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '700',
    color: 'black',
    // marginBottom: 5,
  },
});

export default BottomTabNavigator;
