import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SwiperScreen from '../components/Authentication/SwiperScreen';
import LoginScreen from '../components/Authentication/LoginScreen';
import SignupScreen from '../components/Authentication/SignupScreen';
import ForgetScreen from '../components/Authentication/ForgetScreen';
import NewPassword from '../components/Authentication/NewPassword';
import BrowseTabNavigator from './BrowseTabNavigator';

import ScreenKey from '../constants/ScreenKey';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name={ScreenKey.SwiperScreen} component={SwiperScreen} />
      <AuthStack.Screen name={ScreenKey.LoginScreen} component={LoginScreen} />
      <AuthStack.Screen name={ScreenKey.SignupScreen} component={SignupScreen} />
      <AuthStack.Screen name={ScreenKey.ForgetScreen} component={ForgetScreen} />
      <AuthStack.Screen name={ScreenKey.NewPassword} component={NewPassword} />
      <AuthStack.Screen name={ScreenKey.BrowseTabNavigator} component={BrowseTabNavigator} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;