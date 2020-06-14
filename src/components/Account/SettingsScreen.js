import React, { useState, useEffect, useContext } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { AuthContext } from '../../context/AuthContext';
import { SettingContext } from '../../context/SettingContext';
import Colors from '../../constants/Colors';

import { getUserSettings } from '../../core/services/user-setting-service';

const SettingsScreen = () => {
  const { authentication: { token } } = useContext(AuthContext);
  const { userSettings, setUserSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  useEffect(() => {
    const { settings } = getUserSettings({ token });
    setUserSettings(settings); // update context
  }, [])

  const toggleSwitch = (label, value) => {
    userSettings[label] = value;
    setUserSettings({
      ...userSettings,
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
      {
        Object.keys(userSettings).length > 0 && Object.keys(userSettings).map((label) =>
          <Setting
            key={`${label}`}
            label={label}
            value={userSettings[label]}
            toggleSwitch={value => toggleSwitch(label, value)} />
        )
      }
    </View>
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


