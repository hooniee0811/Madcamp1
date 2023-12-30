import {useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {ContactsStackParamList} from '../navigators/ContactsStackNavigator';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import {Contact} from './ContactListScreen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FonIcon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';
import GroupSelectModal from '../components/GroupSelectModal';

type Props = StackScreenProps<ContactsStackParamList, 'EditContact'>;

const EditContactScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const oldContact = route.params.contacts;
  const index = route.params.index;

  const [newContact, setNewContact] = useState<Contact>({
    id: oldContact[index].id,
    name: oldContact[index].name,
    phoneNumber: oldContact[index].phoneNumber,
    group: oldContact[index].group,
    email: oldContact[index].email,
    memo: oldContact[index].memo,
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const goBack = () => {
    navigation.goBack();
  };

  const onChangeContactName = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = {...newContact};
    cp.name = evt.nativeEvent.text;
    setNewContact(cp);
  };

  const onChangeContactPhoneNumber = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = {...newContact};
    cp.phoneNumber = evt.nativeEvent.text;
    setNewContact(cp);
  };

  const onChangeContactEmail = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = {...newContact};
    cp.email = evt.nativeEvent.text;
    setNewContact(cp);
  };

  const onChangeContactMemo = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const cp = {...newContact};
    cp.memo = evt.nativeEvent.text;
    setNewContact(cp);
  };

  console.log(RNFS.DocumentDirectoryPath + '/contacts.json');

  const saveContact = () => {
    const cp = [...route.params.contacts];
    const filePath = RNFS.DocumentDirectoryPath + '/contacts.json';

    cp.splice(route.params.index, 1, newContact);
    cp.sort((a, b) => a.name.localeCompare(b.name));

    route.params.setContacts(cp);

    RNFS.writeFile(filePath, JSON.stringify(cp), 'utf8')
      .then(success => {
        console.log('File written successfully');
      })
      .catch(error => {
        console.error('Error');
      });

    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack}>
          <IonIcon name="chevron-back" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{alignItems: 'center', gap: 24}}>
        <View style={styles.textInputContainer}>
          <FonIcon name="user" color="#7A7A7A" size={24} />
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            placeholderTextColor={'#C9C9C9'}
            value={newContact.name}
            onChange={onChangeContactName}
            multiline={true}
          />
        </View>
        <View style={styles.textInputContainer}>
          <FonIcon name="phone" color="#7A7A7A" size={24} />
          <TextInput
            style={styles.textInput}
            placeholder="Phone Number"
            placeholderTextColor={'#C9C9C9'}
            value={newContact.phoneNumber}
            onChange={onChangeContactPhoneNumber}
            multiline={true}
          />
        </View>
        <View style={styles.textInputContainer}>
          <IonIcon name="mail" color="#7A7A7A" size={24} />
          <TextInput
            style={styles.textInput}
            placeholder="E-Mail"
            placeholderTextColor={'#C9C9C9'}
            value={newContact.email}
            onChange={onChangeContactEmail}
            multiline={true}
          />
        </View>
        <View style={styles.textInputContainer}>
          <MatIcon name="note-edit" color="#7A7A7A" size={24} />
          <TextInput
            style={styles.textInput}
            placeholder="Memo"
            placeholderTextColor={'#C9C9C9'}
            value={newContact.memo}
            onChange={onChangeContactMemo}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          style={styles.textInputContainer}
          onPress={() => setModalVisible(true)}>
          <FonIcon name="group" color="#7A7A7A" size={24} />
          <Text style={styles.groupText}>{newContact.group}</Text>
          <AntIcon name="caretdown" color="#7A7A7A" size={16} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.createBtn} onPress={saveContact}>
          <Text style={styles.createText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
      <GroupSelectModal
        visible={modalVisible}
        setVisible={setModalVisible}
        newContact={newContact}
        setNewContact={setNewContact}
      />
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
  },
  contentContainer: {
    paddingTop: 32,
  },
  textInputContainer: {
    flexDirection: 'row',
    width: 340,
    paddingLeft: 16,
    borderRadius: 12,
    backgroundColor: '#F5F7FE',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  textInput: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    flex: 1,
  },
  groupText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    flex: 1,
    paddingVertical: 12,
  },
  createBtn: {
    width: 340,
    padding: 5,
    borderRadius: 12,
    backgroundColor: '#5878E8',
    alignItems: 'center',
  },
  createText: {
    color: 'white',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '900',
  },
});

export default EditContactScreen;
