import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Alert, Text } from 'react-native'
import Header from './Common/Header';
import Row from './Common/Row';
import LinkScreen from './Common/LinkScreen';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { Context as AuthContext } from '../../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [focus, setFocus] = useState(null);

  const { state: { message, errorMessage }, signup, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    if (message === 'signup') {
      Alert.alert(
        'Message',
        'Đăng ký thành công, vui lòng kích hoạt tài khoản!',
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

    if (password === password2) {
      // signup({ username: 'mrtester1234', email: 'mrtester1234@gmail.com', phone: '0909991234', password: '123456' })
      signup({ username, email, phone, password });

      setUsername('');
      setPhone('');
      setEmail('');
      setPassword('');
      setPassword2('');

    } else {
      Alert.alert(
        'Message',
        "Password doesn't match!!",
        [{ text: 'OK' }]
      );
      setPassword('');
      setPassword2('');
    };
  }

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
        backgroundColor={Colors.tintColor}
      />

      <Footer
        label="Already have an account?"
        onPress={() => { navigation.navigate(ScreenKey.LoginScreen) }}
        content="Login"
      />

      <Text style={{ color: Colors.errorBackground, textAlign: 'center' }}>{errorMessage}</Text>

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
