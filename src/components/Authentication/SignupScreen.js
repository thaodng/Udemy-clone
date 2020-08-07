import React, { useState, useContext } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Header from './Common/Header';
import Row from './Common/Row';
import LinkScreen from './Common/LinkScreen';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { Context as AuthContext } from '../../context/AuthContext';

import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [focus, setFocus] = useState(null);

  const { signup } = useContext(AuthContext);

  const onSubmit = () => {
    
    signup({
      username: 'testerasdssss',
      email: 'testerasdssss12@email.com',
      phone: '0909991157',
      password: '123456'
    })

    // if (password === password2) {
    //   const result = signup({ username, email, phone, password });
    //   console.log(result.data);

    // const { status, message, errorString } = signup({ username, email, phone, password });

    // if (status === 200) {
    //   Alert.alert(
    //     'Message',
    //     message,
    //     [
    //       { text: 'OK', onPress: () => navigation.navigate(ScreenKey.LoginScreen) }
    //     ]
    //   );
    // } else {
    //   Alert.alert(errorString);
    // }


    // setEmail('');
    // setPassword('');
    // setPassword2('');
  };

  return (
    <View style={styles.container}>

      <Header title="Udemy" />

      <View style={styles.action}>
        <Row
          icon="email"
          placeholder="Email"
          value={email}
          color={focus === 'Email' ? Colors.tintColor : Colors.lightGray}
          secureTextEntry={false}
          onFocus={() => setFocus('Email')}
          onChangeText={text => setEmail(text)}
        />

        <Row
          icon="people"
          placeholder="Username"
          value={username}
          color={focus === 'Username' ? Colors.tintColor : Colors.lightGray}
          secureTextEntry={false}
          onFocus={() => setFocus('Username')}
          onChangeText={text => setUsername(text)}
        />

        <Row
          icon="phone"
          placeholder="Phone"
          value={phone}
          color={focus === 'Phone' ? Colors.tintColor : Colors.lightGray}
          secureTextEntry={false}
          onFocus={() => setFocus('Phone')}
          onChangeText={text => setPhone(text)}
        />

        <Row
          icon="lock-outline"
          placeholder="Password"
          value={password}
          color={focus === 'Password' ? Colors.tintColor : Colors.lightGray}
          secureTextEntry={true}
          onFocus={() => setFocus('Password')}
          onChangeText={text => setPassword(text)}
        />

        <Row
          icon="check"
          placeholder="Confirm password"
          value={password2}
          color={focus === 'ConfirmPassword' ? Colors.tintColor : Colors.lightGray}
          secureTextEntry={true}
          onFocus={() => setFocus('ConfirmPassword')}
          onChangeText={text => setPassword2(text)}
        />

      </View>

      <LinkScreen
        content="Forgot password?"
        onPress={() => { navigation.navigate(ScreenKey.ForgetScreen) }}
      />

      <ButtonConfirm
        content="Signup"
        onPress={onSubmit}
      />

      <Footer
        label="Already have an account?"
        onPress={() => { navigation.navigate(ScreenKey.LoginScreen) }}
        content="Login"
      />

    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 100
  },
  action: {
    width: '100%'
  },
});
