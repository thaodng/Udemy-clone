import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Alert, Text } from 'react-native'
import Header from './Common/Header';
import Row from './Common/Row';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { Context as AuthContext } from '../../context/AuthContext';


const ForgetScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [focus, setFocus] = useState(null);

  const { state: { message, errorMessage }, forgetPass, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    if (message === 'forget') {
      Alert.alert(
        'Message',
        'Hệ thống đã gửi link reset mật khẩu!',
        [{
          text: 'OK', onPress: () => {
            clearErrorMessage();
            navigation.navigate(ScreenKey.NewPassword)
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
    if (email) {
      forgetPass({ email });
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
          color={focus === 'Email' ? Colors.tintColor : Colors.lightGray}
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

      <Text style={{ color: Colors.errorBackground, textAlign: 'center' }}>{errorMessage}</Text>

    </View>
  );
};

export default ForgetScreen;

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
