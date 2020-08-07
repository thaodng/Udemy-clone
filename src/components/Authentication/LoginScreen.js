import React, { useState, useContext } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Header from './Common/Header';
import Row from './Common/Row';
import LinkScreen from './Common/LinkScreen';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

// import { Context as AuthContext } from '../../context/AuthContext';
// import { UserContext } from '../../context/UserContext';
// import { SettingContext } from '../../context/SettingContext';

// import { login } from '../../core/services/authentication-service';
// import { getUserInfo } from '../../core/services/user-service';
// import { getUserSettings } from '../../core/services/user-setting-service';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focus, setFocus] = useState(null);

  // const { setAuthentication } = useContext(AuthContext);
  // const { setUserInfo } = useContext(UserContext);
  // const { setUserSettings } = useContext(SettingContext);

  const onSubmit = () => {
    // const { status, token, isAuthenticated, errorString } = login({ email, password });
    // if (status === 200) {
    //   setAuthentication({ token, isAuthenticated });

    //   const { user } = getUserInfo({ token });
    //   setUserInfo(user);

    //   const { settings } = getUserSettings({ token });
    //   setUserSettings(settings);

    //   navigation.navigate(ScreenKey.BrowseTabNavigator);
    // } else {
    //   Alert.alert(errorString);
    // }

    // setEmail('');
    // setPassword('');
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
          icon="lock-outline"
          placeholder="Password"
          value={password}
          color={focus === 'Password' ? Colors.tintColor : Colors.lightGray}
          secureTextEntry={true}
          onFocus={() => setFocus('Password')}
          onChangeText={text => setPassword(text)}
        />

      </View>

      <LinkScreen
        content="Forgot password?"
        onPress={() => { navigation.navigate(ScreenKey.ForgetScreen) }}
      />

      <ButtonConfirm
        content="Login"
        onPress={onSubmit}
      />

      <Footer
        label="Don't have an account?"
        onPress={() => { navigation.navigate(ScreenKey.SignupScreen) }}
        content="Signup"
      />

    </View>
  );
};

export default LoginScreen;

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
