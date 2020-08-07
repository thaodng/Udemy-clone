import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Alert, Text } from 'react-native'
import Header from './Common/Header';
import Row from './Common/Row';
import ButtonConfirm from './Common/ButtonConfirm';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { Context as AuthContext } from '../../context/AuthContext';

const NewPassword = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [focus, setFocus] = useState(null);

  const { state: { message, errorMessage }, resetPass, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    if (message === 'newpass') {
      Alert.alert(
        'Message',
        'Reset mật khẩu thành công!',
        [{
          text: 'OK', onPress: () => {
            clearErrorMessage();
            navigation.navigate(ScreenKey.LoginScreen)
          }
        }]
      );
    }

    const unsubscribe = navigation.addListener('focus', () => {
      clearErrorMessage();
    });

    return unsubscribe;
  }, [navigation, message]);

  const onSubmit = () => {
    if (password && password2) {
      resetPass({ id, password });
    } else {
      Alert.alert(`Password doesn't match!`)
    }
  };

  return (
    <View style={styles.container}>

      <Header title="Udemy" />

      <View style={styles.action}>
        <Row
          icon="people"
          placeholder="Id"
          value={id}
          color={focus === 'Id' ? Colors.tintColor : Colors.lightGray}
          secureTextEntry={false}
          onFocus={() => setFocus('Id')}
          onChangeText={text => setId(text)}
        />

        <Row
          icon="lock-outline"
          placeholder="New password"
          value={password}
          color={focus === 'Password' ? Colors.tintColor : Colors.lightBackground}
          secureTextEntry={true}
          onFocus={() => setFocus('Password')}
          onChangeText={text => setPassword(text)}
        />

        <Row
          icon="check"
          placeholder="Confirm new password"
          value={password2}
          color={focus === 'ConfirmPassword' ? Colors.tintColor : Colors.lightBackground}
          secureTextEntry={true}
          onFocus={() => setFocus('ConfirmPassword')}
          onChangeText={text => setPassword2(text)}
        />
      </View>

      <ButtonConfirm
        content="Reset password"
        onPress={onSubmit}
      />

      <Text style={{ color: Colors.errorBackground, textAlign: 'center' }}>{errorMessage}</Text>


    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 100
  },
  action: {
    width: '100%'
  },
});
