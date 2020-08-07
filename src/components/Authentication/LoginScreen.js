import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from './Common/Header';
import Row from './Common/Row';
import LinkScreen from './Common/LinkScreen';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { Context as AuthContext } from '../../context/AuthContext';
// import { UserContext } from '../../context/UserContext';
// import { SettingContext } from '../../context/SettingContext';

// import { getUserInfo } from '../../core/services/user-service';
// import { getUserSettings } from '../../core/services/user-setting-service';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focus, setFocus] = useState(null);

  const { state: { token, errorMessage }, signin, clearErrorMessage } = useContext(AuthContext);
  // const { setUserInfo } = useContext(UserContext);
  // const { setUserSettings } = useContext(SettingContext);

  useEffect(() => {
    if (token) {
      console.log('login');
      navigation.navigate(ScreenKey.BrowseTabNavigator);
      // setAuthentication({ token, isAuthenticated });

      // const { user } = getUserInfo({ token });
      // setUserInfo(user);

      // const { settings } = getUserSettings({ token });
      // setUserSettings(settings);
    }

    const unsubscribe = navigation.addListener('focus', () => {
      clearErrorMessage();
    });

    return unsubscribe;
  }, [token, navigation]);

  const onSubmit = () => {
    signin({ email, password });
    setEmail('');
    setPassword('');
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

      <Text style={{ color: Colors.errorBackground, textAlign: 'center' }}>{errorMessage}</Text>

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
