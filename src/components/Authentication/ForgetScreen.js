import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Header from './Common/Header';
import Row from './Common/Row';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { forgetPassword } from '../../core/services/authentication-service';

const ForgetScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [focus, setFocus] = useState(null);

  const onSubmit = () => {
    if (email) {
      const { status, message, errorString } = forgetPassword({ email });
      if (status === 200) {
        Alert.alert('Message', message,
          [
            { text: 'OK', onPress: () => navigation.navigate(ScreenKey.NewPassword) }
          ]
        );
      } else {
        Alert.alert('Error', errorString);
      }
    } else {
      Alert.alert('Please fill in your email!')
    }
  };

  return (
    <View style={styles.container}>

      <Header title="Udemy" />

      <View style={styles.action}>
        <Row
          icon="email"
          placeholder="Email"
          value={email}
          color={focus === 'Email' ? Colors.tintColor : 'gray'}
          secureTextEntry={false}
          onFocus={() => setFocus('Email')}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <ButtonConfirm
        content="Send password reset link"
        onPress={onSubmit}
      />

      <Footer
        label="Remeber your password?"
        onPress={() => { navigation.navigate(ScreenKey.LoginScreen) }}
        content="Login"
      />

    </View>
  );
};

export default ForgetScreen;

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
