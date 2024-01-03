import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Contact} from '../screens/ContactListScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newContact: Contact;
  setNewContact: React.Dispatch<React.SetStateAction<Contact>>;
};

const ImageSelectModal = (props: Props) => {
  const showImagePicker = (): void => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        console.log('Response = ', response);
        //이미지 배열에 추가
        if (response.assets) {
          const cp = {...props.newContact};
          cp.image = {uri: response.assets[0].uri};
          props.setNewContact(cp);
        }
      }
    });
    props.setVisible(false);
  };

  const showCamera = (): void => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        console.log('Response = ', response);
        //이미지 배열에 추가
        if (response.assets) {
          const cp = {...props.newContact};
          cp.image = {uri: response.assets[0].uri};
          props.setNewContact(cp);
        }
      }
    });
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
      <TouchableOpacity style={styles.gallery} onPress={showImagePicker}>
        <MatIcon name="insert-photo" size={36} color="#737373" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.camera} onPress={showCamera}>
        <AntIcon name="camera" size={25} color="#737373" />
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOutside: {
    flex: 1,
    backgroundColor: 'rgba(97, 97, 97, 0.70)',
    // alignItems: 'center',
  },
  gallery: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    width: 80,
    height: 80,
    borderRadius: 40,
    transform: [{translateX: 35}, {translateY: -40}],
    zIndex: 2,
    backgroundColor: '#F5F7FE',
  },
  camera: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    width: 80,
    height: 80,
    borderRadius: 40,
    transform: [{translateX: -115}, {translateY: -40}],
    zIndex: 2,
    backgroundColor: '#F5F7FE',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default ImageSelectModal;
