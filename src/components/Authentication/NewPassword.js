import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Header from './Common/Header';
import Row from './Common/Row';
import ButtonConfirm from './Common/ButtonConfirm';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { newPassword } from '../../core/services/authentication-service';

const NewPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [focus, setFocus] = useState(null);

  const onSubmit = () => {
    if (password && password2) {
      const { status, message, errorString } = newPassword({ password, password2 });
      if (status === 200) {
        Alert.alert('Message', message,
          [
            { text: 'OK', onPress: () => navigation.navigate(ScreenKey.LoginScreen) }
          ]
        );
      } else {
        Alert.alert('Error', errorString);
      }
    } else {
      Alert.alert(`Password doesn't match!`)
    }
  };

  return (
    <View style={styles.container}>

      <Header title="Udemy" />

      <View style={styles.action}>
        <Row
          icon="lock-outline"
          placeholder="New password"
          value={password}
          color={focus === 'Password' ? Colors.tintColor : 'gray'}
          secureTextEntry={true}
          onFocus={() => setFocus('Password')}
          onChangeText={text => setPassword(text)}
        />

        <Row
          icon="check"
          placeholder="Confirm new password"
          value={password2}
          color={focus === 'ConfirmPassword' ? Colors.tintColor : 'gray'}
          secureTextEntry={true}
          onFocus={() => setFocus('ConfirmPassword')}
          onChangeText={text => setPassword2(text)}
        />
      </View>

      <ButtonConfirm
        content="Reset password"
        onPress={onSubmit}
      />

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
