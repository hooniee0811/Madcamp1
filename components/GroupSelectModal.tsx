import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Contact} from '../screens/ContactListScreen';
import EntIcon from 'react-native-vector-icons/Entypo';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newContact: Contact;
  setNewContact: React.Dispatch<React.SetStateAction<Contact>>;
};

const GroupSelectModal = (props: Props) => {
  const selectGroup = (value: string) => () => {
    const cp = {...props.newContact};
    cp.group = value;
    props.setNewContact(cp);
    props.setVisible(false);
  };

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => props.setVisible(false)}>
      <Pressable
        style={styles.modalOutside}
        onPress={() => props.setVisible(false)}
      />
      <View style={styles.selectorContainer}>
        <Pressable
          onPress={selectGroup('None')}
          style={{
            ...styles.selectorBtn,
            borderBottomWidth: 0.5,
            borderColor: '#7A7A7A',
          }}>
          <Text style={styles.selectorText}>None</Text>
          {props.newContact.group === 'None' && (
            <EntIcon name="check" color="#5878E8" size={24} />
          )}
        </Pressable>
        <Pressable
          onPress={selectGroup('Family')}
          style={{
            ...styles.selectorBtn,
            borderBottomWidth: 0.5,
            borderColor: '#7A7A7A',
          }}>
          <Text style={styles.selectorText}>Family</Text>
          {props.newContact.group === 'Family' && (
            <EntIcon name="check" color="#5878E8" size={24} />
          )}
        </Pressable>
        <Pressable
          onPress={selectGroup('Friends')}
          style={{
            ...styles.selectorBtn,
            borderBottomWidth: 0.5,
            borderColor: '#7A7A7A',
          }}>
          <Text style={styles.selectorText}>Friends</Text>
          {props.newContact.group === 'Friends' && (
            <EntIcon name="check" color="#5878E8" size={24} />
          )}
        </Pressable>
        <Pressable
          onPress={selectGroup('Coworkers')}
          style={styles.selectorBtn}>
          <Text style={styles.selectorText}>Coworkers</Text>
          {props.newContact.group === 'Coworkers' && (
            <EntIcon name="check" color="#5878E8" size={24} />
          )}
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOutside: {
    flex: 1,
    backgroundColor: 'rgba(97, 97, 97, 0.70)',
    // alignItems: 'center',
  },
  selectorContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 240,
    height: 280,
    transform: [{translateX: -120}, {translateY: -140}],
    backgroundColor: 'white',
    borderRadius: 12,
  },
  selectorBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  selectorText: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GroupSelectModal;
