import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from '../components/Account/AccountScreen'
import ProfileScreen from '../components/Account/ProfileScreen';
import SettingsScreen from '../components/Account/SettingsScreen';

import ScreenKey from '../constants/ScreenKey';

const AccountStack = createStackNavigator();

const AccountStackNavigator = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name={ScreenKey.AccountScreen}
        component={AccountScreen}
        options={{ headerShown: false }}
      />

      <AccountStack.Screen
        name={ScreenKey.ProfileScreen}
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />

      <AccountStack.Screen
        name={ScreenKey.SettingScreen}
        component={SettingsScreen}
        options={{ title: 'Setting' }}
      />

    </AccountStack.Navigator>
  );
};

export default AccountStackNavigator;