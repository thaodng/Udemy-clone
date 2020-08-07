import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import Header from './Common/Header';
import Row from './Common/Row';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';
import { Context as AuthContext } from '../../context/AuthContext';


const ActiveScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const { state, state: { message, errorMessage }, sendActivateEmail, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    if (message !== '') {
      Alert.alert(
        'Message',
        message,
        [{ text: 'OK', onPress: () => navigation.navigate(ScreenKey.LoginScreen) }]
      );
    }

    const unsubscribe = navigation.addListener('focus', () => {
      clearErrorMessage();
    });

    return unsubscribe;
  }, [navigation, message]);


  const onSubmit = () => {
    sendActivateEmail({ email });
  };

  return (
    <View style={styles.container}>

      <Header title="Udemy" />

      <View style={styles.action}>
        <Row
          icon="email"
          placeholder="Email"
          value={email}
          color={Colors.tintColor}
          secureTextEntry={false}
          onChangeText={text => setEmail(text)}
        />

      </View>

      <ButtonConfirm
        content="Send active email"
        onPress={onSubmit}
      />

      <Footer
        label="Already active account?"
        onPress={() => { navigation.navigate(ScreenKey.LoginScreen) }}
        content="Login now"
      />

      <Text style={{ color: Colors.errorBackground, textAlign: 'center' }}>{errorMessage}</Text>

    </View>
  );
};

export default ActiveScreen;

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
