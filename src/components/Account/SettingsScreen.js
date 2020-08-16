import React, { useState, useEffect, useContext } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import { Context as AuthContext } from '../../context/AuthContext';
import { SettingContext } from '../../context/SettingContext';
import Colors from '../../constants/Colors';

import { getUserSettings } from '../../core/services/user-setting-service';

const SettingsScreen = () => {
  const { state: { token } } = useContext(AuthContext);
  const { userSettings, setUserSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;
  const [currentLanguague, setCurrentLanguague] = useState('en');

  const [darkTheme, setDarkTheme] = useState(false);

  const [t, i18n] = useTranslation('common');

  useEffect(() => {
    const { settings } = getUserSettings({ token });
    setUserSettings(settings); // update context
  }, [])

  const toggleSwitch = (value) => {
    setDarkTheme(value);
    setUserSettings({
      "Dark theme": value
    });
  };

  const Setting = ({ label, value, toggleSwitch }) => {
    return (
      <View style={{ ...styles.itemContainer, backgroundColor: bgColor }}>
        <Text style={{ ...styles.itemText, color: txColor }}>{label}</Text>
        <Switch
          trackColor={{ false: txColor, true: Colors.tintColor }}
          thumbColor={value ? Colors.tintColor : txColor}
          onValueChange={toggleSwitch}
          value={value}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Setting
        label={t('settingScreen.darkTheme')}
        value={darkTheme}
        toggleSwitch={value => toggleSwitch(value)}
      />
      <TouchableOpacity onPress={() => { i18n.changeLanguage('vi'); setCurrentLanguague('vi') }} style={{ ...styles.itemContainer, backgroundColor: bgColor }}>
        <Text style={{ ...styles.itemText, color: currentLanguague === 'vi' ? Colors.tintColor : txColor }}>{'Vietnamese'}</Text>
      </TouchableOpacity >
      <TouchableOpacity onPress={() => { i18n.changeLanguage('en'); setCurrentLanguague('en') }} style={{ ...styles.itemContainer, backgroundColor: bgColor }}>
        <Text style={{ ...styles.itemText, color: currentLanguague === 'en' ? Colors.tintColor : txColor }}>{'English'}</Text>
      </TouchableOpacity >
    </View >
  );
};



export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
});


