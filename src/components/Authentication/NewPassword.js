import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Header from './Common/Header';
import Row from './Common/Row';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';

const NewPassword = ({navigation}) => {
  const [focus, setFocus] = useState(null);

  return (
    <View style={styles.container}>

      <Header title="Udemy" />

      <View style={styles.action}>
        <Row
          icon="lock-outline"
          placeholder="New password"
          color={focus === 'Password' ? Colors.mainColor : 'gray'}
          secureTextEntry={true}
          onFocus={() => setFocus('Password')}
        />

        <Row
          icon="check"
          placeholder="Confirm new password"
          color={focus === 'ConfirmPassword' ? Colors.mainColor : 'gray'}
          secureTextEntry={true}
          onFocus={() => setFocus('ConfirmPassword')}
        />
      </View>

      <ButtonConfirm
        content="Reset password"
        onPress={() => {
          Alert.alert(
            "Message",
            "Reset password success",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
          navigation.navigate('LoginScreen');
        }}
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
