import React, { useState, useEffect, useContext } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { AuthContext } from '../../context/AuthContext';
import { SettingContext } from '../../context/SettingContext';
import Colors from '../../constants/Colors';

import { getUserSettings, updateUserSettings } from '../../core/services/user-setting-service';

const SettingsScreen = () => {
  const { authentication: { token } } = useContext(AuthContext);
  const { userSettings, setUserSettings } = useContext(SettingContext);

  useEffect(() => {
    const { settings } = getUserSettings({ token });
    setUserSettings(settings); // update context
  }, [])


  const toggleSwitch = (id, value) => {
    const index = userSettings.findIndex(s => s.id === id);
    const copySettings = [...userSettings];
    copySettings[index].value = value;
    setUserSettings(copySettings);
  };


  return (
    <View style={styles.container}>
      {
        userSettings && userSettings.map(({ id, label, value }) =>
          <Setting key={`${id}-${label}`} label={label} value={value} toggleSwitch={(value) => toggleSwitch(id, value)} />
        )
      }
    </View>
  );
};

const Setting = ({ label, value, toggleSwitch }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{label}</Text>
      <Switch
        trackColor={{ false: Colors.lightgray, true: Colors.tintColor }}
        thumbColor={value ? Colors.tintColor : 'white'}
        onValueChange={toggleSwitch}
        value={value}
      />
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
    backgroundColor: '#fff',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.dark,
  },
});


