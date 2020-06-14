import React, { useContext } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper'

import RowItem from '../Common/RowItem';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { SettingContext } from '../../context/SettingContext';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';

const AccountScreen = ({ navigation }) => {
  const { authentication: { isAuthenticated }, setAuthentication } = useContext(AuthContext);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { name, avatar } = userInfo;

  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  const onSignOut = () => {
    setAuthentication({});
    setUserInfo({});
    navigation.navigate(ScreenKey.LoginScreen);
  }

  const Intro = () => {
    return (
      <View style={styles.userContainer}>
        <View style={styles.avatarContainer}>
          {
            avatar
              ? <Image style={{ width: '100%', height: '100%' }} source={{ uri: avatar }} resizeMode="stretch" />
              : <MaterialIcons name="person" size={26} color={Colors.lightText} />
          }
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome to online education</Text>
          <View style={{ flexDirection: 'row' }}>
            {
              name
                ? <Text style={styles.authText}>{name}</Text>
                : (
                  <>
                    <TouchableOpacity TouchableOpacity onPress={() => { navigation.navigate(ScreenKey.LoginScreen) }}>
                      <Text style={styles.authText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.authText}>/</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate(ScreenKey.SignupScreen) }}>
                      <Text style={styles.authText}>Signup</Text>
                    </TouchableOpacity>
                  </>
                )
            }
          </View>
        </View>
      </View >
    );
  };

  const renderUserInfo = () => {
    return (
      <>
        <RowItem
          icon="account-circle"
          title="User profile"
          txColor={txColor}
          bgColor={bgColor}
          onPress={() => {
            navigation.navigate(ScreenKey.ProfileScreen, {
              user: userInfo,
              // setUser: setUserInfo -> don't do this
            })
          }}
        />
        <RowItem
          icon="settings"
          title="Settings"
          txColor={txColor}
          bgColor={bgColor}
          onPress={() => {
            navigation.navigate(ScreenKey.SettingScreen), {
              userInfo
            }
          }}
        />
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Intro />

        {isAuthenticated
          ? <>
            <View style={styles.divider} />
            {renderUserInfo()}
          </>
          : <>
            <View style={styles.divider} />
            {renderSupport()}
          </>

        }
      </ScrollView>

      {
        isAuthenticated &&
        <Button
          mode="outlined"
          theme={{
            colors: {
              primary: Colors.tintColor
            },
          }}
          style={styles.buttonSignOut}
          onPress={onSignOut}>
          Sign out
      </Button>
      }
    </View >
  );
}


const OptionButton = ({ icon, label, onPress, isLastOption }) => {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.optionIconContainer}>
          <MaterialIcons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const renderSupport = () => {
  return (
    <>
      <OptionButton
        icon="school"
        label="Read the documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />

      <OptionButton
        icon="chat"
        label="Ask a question on the forums"
        onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
        isLastOption
      />

      <OptionButton
        icon="help"
        label="Contacts help"
        onPress={() => WebBrowser.openBrowserAsync('https://google.com')}
        isLastOption
      />
    </>
  );
};


export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    // paddingTop: 10,
  },
  userContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tintColor,
    borderWidth: 1,
    borderColor: Colors.lightgray
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  welcomeText: {
    color: Colors.lightGray,
  },
  authText: {
    color: Colors.tintColor,
    fontSize: 18,
    fontWeight: '500',
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  buttonSignOut: {
    borderWidth: 2,
    borderColor: Colors.tintColor,
    margin: 4
  },
  divider: {
    height: 5,
  },
});
