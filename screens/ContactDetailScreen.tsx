import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeaIcon from 'react-native-vector-icons/Feather';
import {ContactsStackParamList} from '../navigators/ContactsStackNavigator';
import {useNavigation, useRoute} from '@react-navigation/native';
import FonIcon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';

type Props = StackScreenProps<ContactsStackParamList, 'ContactDetail'>;

const ContactDetailScreen = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();

  const contact = route.params.contacts[route.params.index];
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const goBack = () => {
    navigation.goBack();
  };

  const editContact = () => {
    navigation.navigate('EditContact', {
      contacts: route.params.contacts,
      setContacts: route.params.setContacts,
      index: route.params.index,
    });
  };

  const deleteContact = () => {
    const cp = [...route.params.contacts];
    cp.splice(route.params.index, 1);
    route.params.setContacts(cp);
    const filePath = RNFS.DocumentDirectoryPath + '/contacts.json';

    RNFS.writeFile(filePath, JSON.stringify(cp), 'utf8')
      .then(success => {
        console.log('File written successfully');
      })
      .catch(error => {
        console.error('Error');
      });

    setModalVisible(false);
    Alert.alert('Deleted!');
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <IonIcon name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.topBarRightContainer}>
          <TouchableOpacity onPress={editContact}>
            <FeaIcon name="edit" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FeaIcon name="trash-2" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{alignItems: 'center', gap: 24}}>
        <View style={styles.nameContainer}>
          <View style={styles.userIconContainer}>
            <Text style={styles.firstName}>{contact.name[0]}</Text>
          </View>
          <Text style={styles.name}>{contact.name}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Phone Number</Text>
          <View style={styles.textContainer}>
            <FonIcon name="phone" color="#7A7A7A" size={24} />
            <Text style={styles.contentText}>{contact.phoneNumber}</Text>
          </View>
        </View>
        {contact.email != '' && (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>E-mail</Text>
            <View style={styles.textContainer}>
              <IonIcon name="mail" color="#7A7A7A" size={24} />
              <Text style={styles.contentText}>{contact.email}</Text>
            </View>
          </View>
        )}
        {contact.memo != '' && (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Memo</Text>
            <View style={styles.textContainer}>
              <MatIcon name="note-edit" color="#7A7A7A" size={24} />
              <Text style={styles.contentText}>{contact.memo}</Text>
            </View>
          </View>
        )}
        {contact.group != 'None' && (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Group</Text>
            <View style={styles.textContainer}>
              <FonIcon name="group" color="#7A7A7A" size={24} />
              <Text style={styles.contentText}>{contact.group}</Text>
            </View>
          </View>
        )}
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modalOutside}
          onPress={() => setModalVisible(false)}
        />
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitleText}>Delete</Text>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalText}>Are you sure to delete?</Text>
          </View>
          <View style={styles.modalBtnContainer}>
            <Pressable
              style={styles.modalBtn}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalBtnText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.modalBtn} onPress={deleteContact}>
              <Text style={styles.modalBtnText}>Yes</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginRight: 12,
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 48,
    gap: 8,
  },
  userIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 30,
    backgroundColor: '#F5F7FE',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  firstName: {
    color: '#7A7A7A',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '800',
  },
  name: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '800',
  },
  contentContainer: {
    gap: 4,
  },
  contentTitle: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    color: '#7A7A7A',
    fontWeight: '500',
    paddingLeft: 6,
  },
  textContainer: {
    flexDirection: 'row',
    width: 340,
    paddingLeft: 16,
    borderRadius: 12,
    backgroundColor: '#F5F7FE',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  contentText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    flex: 1,
  },
  modalOutside: {
    flex: 1,
    backgroundColor: 'rgba(97, 97, 97, 0.70)',
    // alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 320,
    height: 200,
    transform: [{translateX: -160}, {translateY: -100}],
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  modalTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  modalTitleText: {
    fontFamily: 'Pretendard',
    fontSize: 24,
    color: 'black',
    fontWeight: '700',
    marginBottom: 30,
  },
  modalText: {
    fontFamily: 'Pretendard',
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  modalBtnContainer: {
    flexDirection: 'row',
  },
  modalBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtnText: {
    fontFamily: 'Pretendard',
    fontSize: 20,
    color: '#5878E8',
    fontWeight: '500',
  },
});

export default ContactDetailScreen;
