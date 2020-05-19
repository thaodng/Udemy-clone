import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from '../components/Account/AccountScreen'

const AccountStack = createStackNavigator();

const AccountStackNavigator = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={AccountScreen} />
    </AccountStack.Navigator>
  );
};

export default AccountStackNavigator;