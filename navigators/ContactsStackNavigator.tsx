import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ContactListScreen from '../screens/ContactListScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';

export type ContactsStackParamList = {
  ContactList: undefined;
  ContactDetail: {index: number};
  AddContact: undefined;
};

const Stack = createStackNavigator<ContactsStackParamList>();

const ContactsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactList"
        component={ContactListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddContact"
        component={ContactDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ContactsStackNavigator;
