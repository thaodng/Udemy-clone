import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import * as Google from "expo-google-app-auth";
import Header from './Common/Header';
import Row from './Common/Row';
import LinkScreen from './Common/LinkScreen';
import ButtonConfirm from './Common/ButtonConfirm';
import Footer from './Common/Footer';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { Context as AuthContext } from '../../context/AuthContext';

const ANDROID_CLIENT_ID = '999772301023-hebd8ma90o6im9vdccg342jdcpj076bu.apps.googleusercontent.com';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focus, setFocus] = useState(null);
  const [loading, setLoading] = useState(false);

  const { state: { token, isAuthenticated, errorMessage }, signin, signinGoogle, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    if (token && isAuthenticated) {
      navigation.navigate(ScreenKey.BrowseTabNavigator);
    }

    const unsubscribe = navigation.addListener('focus', () => {
      clearErrorMessage();
    });

    return unsubscribe;
  }, [token, navigation]);

  const onSubmitLogin = () => {
    setLoading(true);
    signin({ email, password });
    setEmail('');
    setPassword('');
    setLoading(false);
  };

  const onSubmitLoginGoogle = async () => {
    try {
      const { user, type, accessToken } = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email", "openid"]
      });

      if (type === "success") {
        signinGoogle({ email: user.email, id: user.id });

        return accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };


  return (
    <View style={styles.container}>
      {
        loading
          ? (<ActivityIndicator size="large" />)
          : (
            <>
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
                onPress={onSubmitLogin}
                backgroundColor={Colors.tintColor}
              />

              <ButtonConfirm
                content="Login with Google"
                onPress={onSubmitLoginGoogle}
                backgroundColor={Colors.errorBackground}
              />

              <Footer
                label="Don't have an account?"
                onPress={() => { navigation.navigate(ScreenKey.SignupScreen) }}
                content="Signup"
              />
              <Text style={{ color: Colors.errorBackground, textAlign: 'center' }}>{errorMessage}</Text>
            </>
          )
      }


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
