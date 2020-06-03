import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, StyleSheet, View } from 'react-native';

import { MenuProvider } from 'react-native-popup-menu';
import { AuthenticationProvider } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';

import useCachedResources from './src/hooks/useCachedResources';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import LinkingConfiguration from './src/navigation/LinkingConfiguration';

// import ScreenKey from './src/constants/ScreenKey';
// const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <StatusBar />
        <View style={styles.container}>
          <AuthenticationProvider>
            <UserProvider>
              <MenuProvider >
                <NavigationContainer linking={LinkingConfiguration}>
                  {/* 
                    <Stack.Navigator headerMode="none">
                      <Stack.Screen name={ScreenKey.AuthStackNavigator} component={AuthStackNavigator} />
                    </Stack.Navigator> 
                    */
                  }
                  <AuthStackNavigator />
                </NavigationContainer>
              </MenuProvider>
            </UserProvider>
          </AuthenticationProvider>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});
