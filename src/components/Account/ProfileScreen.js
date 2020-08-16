import React, { useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Avatar } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useTranslation } from "react-i18next";

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

import { Context as AuthContext } from '../../context/AuthContext';


const theme = {
  colors: {
    primary: Colors.tintColor
  }
}

const { width, height } = Layout.window;

const ProfileScreen = ({ route }) => {
  const { user } = route.params;
  const [t, i18n] = useTranslation('common');

  const { state: { token }, updateUserInfo } = useContext(AuthContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [userType, setUserType] = useState(user.type);
  const [avatar, setAvatar] = useState(user.avatar);
  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);

  const updateDetails = () => {
    // update in database
    updateUserInfo({ token, newInfo: { name, avatar, phone } });

    Alert.alert(t('profileScreen.updateSuccess'));
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
    // hosting file

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
          label={t('profileScreen.email')}
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          value={email}
          onFocus={() => setenableShift(false)}
          onChangeText={text => setEmail(text)}
          disabled
        />
        <TextInput
          label={t('profileScreen.name')}
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          value={name}
          onFocus={() => setenableShift(false)}
          onChangeText={text => setName(text)}
        />
        <TextInput
          label={t('profileScreen.phone')}
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          value={phone}
          keyboardType="number-pad"
          onFocus={() => setenableShift(false)}
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          label={t('profileScreen.type')}
          style={styles.inputStyle}
          mode="outlined"
          theme={theme}
          value={userType}
          onFocus={() => setenableShift(false)}
          disabled
        />
        {/*  */}
      </View>
      <Button
        style={styles.inputStyle}
        icon="content-save"
        mode="contained"
        theme={theme}
        onPress={() => updateDetails()}>
        {t('profileScreen.updateProfile')}
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
              {t('profileScreen.gallery')}
              </Button>
            <Button mode="contained" icon="image-area" theme={theme} onPress={() => pickImage('Camera')}>
              Camera
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

