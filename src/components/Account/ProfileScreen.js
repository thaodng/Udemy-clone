import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';

import RowItem from '../Common/RowItem';

const ProfileScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.bodyContainer}>
        <View style={styles.userContainer}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={26} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome to T - Education</Text>
            <Text style={styles.authText}>Login/Signup</Text>
          </View>
          <FontAwesome name="angle-right" size={26} color="#1e88e5" />
        </View>
        {/*  */}
        <View style={styles.divider} />
        <RowItem title="Other setting one" />
        <RowItem title="Other setting two" />
        {/*  */}
        <View style={styles.divider} />
        <RowItem icon="headphones" title="Support" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  //
  userContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e88e5',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  welcomeText: {
    color: '#828282',
  },
  authText: {
    color: '#1e88e5',
    fontSize: 18,
    fontWeight: '500',
  },
  divider: {
    height: 10,
  },
});

export default ProfileScreen;
