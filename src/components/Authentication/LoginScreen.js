import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from './Common/Header';
import Row from './Common/Row';
import LinkScreen from './Common/LinkScreen';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';


const LoginScreen = ({ navigation }) => {
  const [focus, setFocus] = useState(null);

  return (
    <View style={styles.container}>

      <Header title="Udemy" />

      <View style={styles.action}>
        <Row
          icon="email"
          placeholder="Email"
          color={focus === 'Email' ? Colors.tintColor : 'gray'}
          secureTextEntry={false}
          onFocus={() => setFocus('Email')}
        />

        <Row
          icon="lock-outline"
          placeholder="Password"
          color={focus === 'Password' ? Colors.tintColor : 'gray'}
          secureTextEntry={true}
          onFocus={() => setFocus('Password')}
        />

      </View>

      <LinkScreen
        content="Forgot password?"
        onPress={() => { navigation.navigate('ForgetScreen') }}
      />

      <ButtonConfirm
        content="Login"
        onPress={() => { navigation.navigate('BrowseTabNavigator') }}
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
