import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import RowItem from '../Common/RowItem';

const ProfileScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});

export default ProfileScreen;
