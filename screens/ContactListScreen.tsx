import React, {useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import initialContactsData from '../src/contacts.json';
import uuid from 'react-native-uuid';
import {TextInput} from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FonIcon from 'react-native-vector-icons/FontAwesome';
import {StackScreenProps} from '@react-navigation/stack';
import {ContactsStackParamList} from '../navigators/ContactsStackNavigator';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';

export type Contact = {
  id: string | number[];
  name: string;
  phoneNumber: string;
  group: string;
  email: string;
  memo: string;
};

type Props = StackScreenProps<ContactsStackParamList, 'ContactList'>;

const ContactListScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useNavigation<Props['route']>();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [searchedContacts, setSearchedContacts] = useState<Contact[]>([]);

  const filePath = RNFS.DocumentDirectoryPath + '/contacts.json';

  useEffect(() => {
    readContacts();
    // RNFS.unlink(filePath)
    //   .then(() => {
    //     console.log('File deleted successfully');
    //   })
    //   .catch(err => {
    //     console.error('Error deleting file:', err);
    //   });
  }, []);

  useEffect(() => {
    const searched = contacts
      .filter(contact => contact.name.includes(searchTitle))
      .sort((a, b) => {
        const indexA = a.name.indexOf(searchTitle);
        const indexB = b.name.indexOf(searchTitle);

        return indexA - indexB;
      });

    setSearchedContacts(searched);
  }, [searchTitle]);

  const onChagneSearchTitle = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setSearchTitle(evt.nativeEvent.text);
  };

  const addContact = () => {
    navigation.navigate('AddContact', {
      contacts: contacts,
      setContacts: setContacts,
    });
  };

  const showContactDetail = (index: number) => () => {
    if (searchTitle == '') {
      navigation.navigate('ContactDetail', {
        contacts: contacts,
        setContacts: setContacts,
        index: index,
      });
    } else {
      const realIndex = contacts.findIndex(
        contact => contact.id === searchedContacts[index].id,
      );
      navigation.navigate('ContactDetail', {
        contacts: contacts,
        setContacts: setContacts,
        index: realIndex,
      });
    }
  };

  const readContacts = async () => {
    try {
      if (!(await RNFS.exists(filePath))) {
        await RNFS.writeFile(
          filePath,
          JSON.stringify(initialContactsData),
          'utf8',
        );
      }

      const fileContent = await RNFS.readFile(filePath, 'utf8');
      const contactData = JSON.parse(fileContent);
      setContacts(contactData);
    } catch (error) {
      console.log(error);
    }
  };

  const renderColoredName = (name: string) => {
    const index = name.indexOf(searchTitle);
    const parts = name.split(searchTitle);

    if (index !== -1) parts.splice(index, 0, searchTitle);

    return parts.map((part, i) => {
      return part === searchTitle ? (
        <Text style={{color: '#5878E8'}} key={i}>
          {searchTitle}
        </Text>
      ) : (
        <Text style={{color: 'black'}} key={i}>
          {part}
        </Text>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.searchBox}>
          <AntIcon name="search1" color="#7A7A7A" size={20} />
          <TextInput
            style={styles.searchText}
            placeholder="Search"
            placeholderTextColor={'#C9C9C9'}
            value={searchTitle}
            onChange={onChagneSearchTitle}
            multiline={true}
          />
        </View>
      </View>
      <ScrollView>
        {searchTitle == ''
          ? contacts.map((contact, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.contactContainer}
                  onPress={showContactDetail(index)}>
                  <View style={styles.userIconContainer}>
                    <Text style={styles.firstName}>{contact.name[0]}</Text>
                  </View>
                  <Text
                    style={
                      index != contacts.length - 1
                        ? styles.nameTextWithLine
                        : styles.nameText
                    }>
                    {contact.name}
                  </Text>
                </TouchableOpacity>
              );
            })
          : searchedContacts.map((searchedContact, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.contactContainer}
                  onPress={showContactDetail(index)}>
                  <View style={styles.userIconContainer}>
                    <Text style={styles.firstName}>
                      {searchedContact.name[0]}
                    </Text>
                  </View>
                  <Text
                    style={
                      index != searchedContacts.length - 1
                        ? styles.nameTextWithLine
                        : styles.nameText
                    }>
                    {/* {searchedContact.name} */}
                    {renderColoredName(searchedContact.name)}
                  </Text>
                </TouchableOpacity>
              );
            })}
      </ScrollView>
      <TouchableOpacity style={styles.addUserContainer} onPress={addContact}>
        <AntIcon name="adduser" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  topBar: {
    flexDirection: 'row',
  },
  searchBox: {
    flexDirection: 'row',
    flex: 1,
    height: 40,
    backgroundColor: '#F5F7FE',
    borderRadius: 20,
    paddingHorizontal: 16,
    gap: 4,
    alignItems: 'center',
    marginBottom: 8,
  },
  searchText: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },
  addUserContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    right: 16,
    bottom: 16,
    backgroundColor: '#5878E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    // paddingHorizontal: 8,
    gap: 12,
    alignItems: 'center',
    zIndex: 1,
  },
  userIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 18,
    backgroundColor: '#F5F7FE',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  firstName: {
    color: '#C9C9C9',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '800',
  },
  nameTextWithLine: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
    height: '100%',
    textAlignVertical: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C9C9C9',
    paddingVertical: 16,
  },
  nameText: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
    height: '100%',
    textAlignVertical: 'center',
    paddingVertical: 16,
  },
});

export default ContactListScreen;
