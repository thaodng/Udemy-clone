import React, { useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Avatar } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

import { updateUserInfo } from '../../core/services/user-service';

import { AuthContext } from '../../context/AuthContext'
import { UserContext } from '../../context/UserContext';

const theme = {
  colors: {
    primary: Colors.tintColor
  }
}

const { width, height } = Layout.window;

const ProfileScreen = ({ route }) => {
  const { user } = route.params;

  const { authentication: { token } } = useContext(AuthContext);
  const { setUserInfo } = useContext(UserContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [avatar, setAvatar] = useState(user.avatar);
  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);

  const updateDetails = () => {
    // update in database
    const result = updateUserInfo({ token, newInfo: { name, email, phone, address, avatar } });
    if (result.status === 200) {
      // update in user context
      setUserInfo(result.user);
      Alert.alert('Update success!');
    }
  }

  const pickImage = async (type) => {

    const permissionType = type === 'Gallery' ? Permissions.CAMERA_ROLL : Permissions.CAMERA;
    const { granted } = await Permissions.askAsync(permissionType);

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    };
    if (granted) {
      const result = (type === 'Gallery')
        ? await ImagePicker.launchImageLibraryAsync(options)
        : await ImagePicker.launchCameraAsync(options);

      if (!result.cancelled) {
        let newfile = {
          uri: result.uri,
        }
        handleUpload(newfile)
      }
    } else {
      Alert.alert("Permission denied!");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData()
    data.append('file', image)
    // save to database

    // update image
    setAvatar(image.uri);
  };

  return (
    <KeyboardAvoidingView style={styles.container} enabled={enableshift}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setModal(true)}
      >
        <Avatar.Image
          size={height / 4}
          source={{ uri: avatar }}
          theme={theme}
        />
      </TouchableOpacity>
      {/*  */}
      <View style={styles.profileContainer}>
        <TextInput
          label='Name'
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          value={name}
          onFocus={() => setenableShift(false)}
          onChangeText={text => setName(text)}
        />
        <TextInput
          label='Email'
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          value={email}
          onFocus={() => setenableShift(false)}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label='Phone'
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          value={phone}
          keyboardType="number-pad"
          onFocus={() => setenableShift(false)}
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          label='Address'
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          value={address}
          onFocus={() => setenableShift(false)}
          onChangeText={text => setAddress(text)}
        />
        {/*  */}
      </View>
      <Button
        style={styles.inputStyle}
        icon="content-save"
        mode="contained"
        theme={theme}
        onPress={() => updateDetails()}>
        Update profile
        </Button>
      {/*  */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false)
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button mode="contained" icon="camera" theme={theme} onPress={() => pickImage('Gallery')}>
              Camera
              </Button>
            <Button mode="contained" icon="image-area" theme={theme} onPress={() => pickImage('Camera')}>
              Gallery
              </Button>
          </View>
          <Button theme={theme} onPress={() => setModal(false)}>
            Cancel
            </Button>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileContainer: {
    flex: 2,
  },
  inputStyle: {
    margin: 4
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 2,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

