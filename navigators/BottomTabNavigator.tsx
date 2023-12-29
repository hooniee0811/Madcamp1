import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import ContactsScreen from '../screens/ContactsScreen';
import PictureScreen from '../screens/PictureScreen';
import Tab3Screen from '../screens/Tab3Screen';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Text, View} from 'react-native';

export type BottomTabParamList = {
  Contacts: undefined;
  Pictures: undefined;
  Tab3: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
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
      <Tab.Screen name="Tab3" component={Tab3Screen} options={{
          tabBarIcon: ({size, focused}) => (
            <View style={focused ? styles.focusedContainer : styles.container}>
              <Icon
                name="question"
                size={24}
                color={focused ? 'black' : '#616161'}
              />
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text style={focused ? styles.focusedLabel : styles.label}>
              Tab3
            </Text>
          ),
        }}/>
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
