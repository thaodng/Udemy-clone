import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from '../components/Account/AccountScreen'
import ProfileScreen from '../components/Account/ProfileScreen';
import SettingsScreen from '../components/Account/SettingsScreen';

const AccountStack = createStackNavigator();

const AccountStackNavigator = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <AccountStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </AccountStack.Navigator>
  );
};

export default AccountStackNavigator;