import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SwiperScreen from '../components/Authentication/SwiperScreen';
import LoginScreen from '../components/Authentication/LoginScreen';
import SignupScreen from '../components/Authentication/SignupScreen';
import ForgetScreen from '../components/Authentication/ForgetScreen';
import NewPassword from '../components/Authentication/NewPassword';
import BrowseTabNavigator from './BrowseTabNavigator';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="SwiperScreen" component={SwiperScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
      <AuthStack.Screen name="ForgetScreen" component={ForgetScreen} />
      <AuthStack.Screen name="NewPassword" component={NewPassword} />
      <AuthStack.Screen name="BrowseTabNavigator" component={BrowseTabNavigator} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;