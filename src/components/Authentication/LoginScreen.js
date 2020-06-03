import React, { useState, useContext } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Header from './Common/Header';
import Row from './Common/Row';
import LinkScreen from './Common/LinkScreen';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';

import { AuthContext } from '../../context/AuthContext';
import { login } from '../../core/services/authentication-service';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focus, setFocus] = useState(null);

  const { setAuthentication } = useContext(AuthContext);

  const onSubmit = () => {
    const { status, token, isAuthenicated, errorString } = login({ email, password });
    if (status === 200) {
      setAuthentication({ token, isAuthenicated });
      navigation.navigate('BrowseTabNavigator');
    } else {
      Alert.alert(errorString);
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

        <Row
          icon="lock-outline"
          placeholder="Password"
          value={password}
          color={focus === 'Password' ? Colors.tintColor : 'gray'}
          secureTextEntry={true}
          onFocus={() => setFocus('Password')}
          onChangeText={text => setPassword(text)}
        />

      </View>

      <LinkScreen
        content="Forgot password?"
        onPress={() => { navigation.navigate('ForgetScreen') }}
      />

      <ButtonConfirm
        content="Login"
        onPress={onSubmit}
      />

      <Footer
        label="Don't have an account?"
        onPress={() => { navigation.navigate('SignupScreen') }}
        content="Signup"
      />

    </View>
  );
};

export default LoginScreen;

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
