import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Header from './Common/Header';
import Row from './Common/Row';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';

const ForgetScreen = ({ navigation }) => {
  const [focus, setFocus] = useState(null);

  return (
    <View style={styles.container}>

      <Header title="Udemy" />

      <View style={styles.action}>
        <Row
          icon="email"
          placeholder="Email"
          color={focus === 'Email' ? Colors.mainColor : 'gray'}
          secureTextEntry={false}
          onFocus={() => setFocus('Email')}
        />
      </View>

      <ButtonConfirm
        content="Send password reset link"
        onPress={() => {
          /* Alert.alert(
            "Message",
            "We have e-mailed your password reset link",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          ); */
          navigation.navigate('NewPassword')
        }
      }
      />

      <Footer
        label="Remeber your password?"
        onPress={() => { navigation.navigate('LoginScreen') }}
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
