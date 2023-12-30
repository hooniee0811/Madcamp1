import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ContactListScreen, {Contact} from '../screens/ContactListScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';
import EditContactScreen from '../screens/EditContactScreen';
import AddContactScreen from '../screens/AddContactScreen';

export type ContactsStackParamList = {
  ContactList: undefined;
  ContactDetail: {
    contacts: Contact[];
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
    index: number;
  };
  AddContact: {
    contacts: Contact[];
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  };
  EditContact: {
    contacts: Contact[];
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
    index: number;
  };
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
        component={AddContactScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditContact"
        component={EditContactScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ContactsStackNavigator;
