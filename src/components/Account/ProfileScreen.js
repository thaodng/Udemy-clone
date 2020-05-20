import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';

const ProfileItem = ({ icon, name }) => (
  <View style={styles.itemContainer}>
    <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
    <Text style={[styles.itemText, { marginLeft: icon ? 20 : 0 }]}>{name}</Text>
    <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
  </View>
);

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
        <ProfileItem icon="format-list-bulleted" name="Setting one" />
        <ProfileItem icon="eye-outline" name="Setting two" />
        <ProfileItem icon="heart-outline" name="Setting three" />
        <ProfileItem icon="bookmark-outline" name="Setting four" />
        <ProfileItem icon="star-outline" name="Setting five" />
        {/*  */}
        <View style={styles.divider} />
        <ProfileItem name="Other setting one" />
        <ProfileItem name="Other setting two" />
        {/*  */}
        <View style={styles.divider} />
        <ProfileItem icon="headphones" name="Support" />
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
  //
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
  },
  //
  divider: {
    height: 10,
  },
});

export default ProfileScreen;
