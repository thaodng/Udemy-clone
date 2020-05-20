import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from '../components/Account/AccountScreen'
import ProfileScreen from '../components/Account/ProfileScreen';

const AccountStack = createStackNavigator();

const AccountStackNavigator = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={ProfileScreen} />
    </AccountStack.Navigator>
  );
};

export default AccountStackNavigator;