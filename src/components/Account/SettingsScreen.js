import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

import Colors from '../../constants/Colors';

const Setting = ({ title }) => {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{title}</Text>
      <Switch
        trackColor={{ false: Colors.lightgray, true: Colors.tintColor }}
        thumbColor={isEnabled ? Colors.tintColor : 'white'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const SettingsScreen = () => {


  return (
    <View style={styles.container}>
      <Setting title="Notifications" />
      <Setting title="Require Wi-Fi for downloading" />
      <Setting title="Show quiz at the end of video" />
      <Setting title="Recommended content push notifications" />
    </View>
  );
}

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


