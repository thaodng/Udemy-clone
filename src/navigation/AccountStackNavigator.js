import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import {
  useTheme, DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { useTranslation } from "react-i18next";

import AccountScreen from '../components/Account/AccountScreen'
import ProfileScreen from '../components/Account/ProfileScreen';
import SettingsScreen from '../components/Account/SettingsScreen';

import { SettingContext } from '../context/SettingContext';
import Colors from '../constants/Colors';
import ScreenKey from '../constants/ScreenKey';

const AccountStack = createStackNavigator();

const AccountStackNavigator = () => {
  const { colors } = useTheme();
  const [t] = useTranslation('common');

  // console.log(colors, DefaultTheme, DarkTheme);
  const { userSettings } = useContext(SettingContext);
  const bg = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;

  return (
    <AccountStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: bg },
        cardStyle: { backgroundColor: bg },
      }}
    >
      <AccountStack.Screen
        name={ScreenKey.AccountScreen}
        component={AccountScreen}
        options={{ headerShown: false }}
      />

      <AccountStack.Screen
        name={ScreenKey.ProfileScreen}
        component={ProfileScreen}
        options={{ title: t('screen.profile') }}
      />

      <AccountStack.Screen
        name={ScreenKey.SettingScreen}
        component={SettingsScreen}
        options={{ title: t('screen.setting') }}
      />

    </AccountStack.Navigator>
  );
};

export default AccountStackNavigator;

