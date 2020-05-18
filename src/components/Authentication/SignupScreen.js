import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from './Common/Header';
import Row from './Common/Row';
import LinkScreen from './Common/LinkScreen';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';


const SignupScreen = ({ navigation }) => {
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

        <Row
          icon="check"
          placeholder="Confirm password"
          color={focus === 'ConfirmPassword' ? Colors.tintColor : 'gray'}
          secureTextEntry={true}
          onFocus={() => setFocus('ConfirmPassword')}
        />

      </View>

      <LinkScreen
        content="Forgot password?"
        onPress={() => { navigation.navigate('ForgetScreen') }}
      />

      <ButtonConfirm
        content="Signup"
        onPress={() => { navigation.navigate('BrowseTabNavigator') }}
      />

      <Footer
        label="Already have an account?"
        onPress={() => { navigation.navigate('LoginScreen') }}
        content="Login"
      />

    </View>
  );
};

export default SignupScreen;

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
