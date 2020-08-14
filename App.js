import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, StyleSheet, View } from 'react-native';

import { MenuProvider } from 'react-native-popup-menu';
import { AuthorsProvider } from './src/context/AuthorsContext';
import { CategoriesProvider } from './src/context/CategoriesContext';
import { CoursesProvider } from './src/context/CoursesContext';
import { Provider as AuthenticationProvider } from './src/context/AuthContext';
import { UserFavoriteProvider } from './src/context/UserFavoriteContext';
import { SettingProvider } from './src/context/SettingContext';

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
          <AuthorsProvider>
            <CategoriesProvider>
              <CoursesProvider>
                <AuthenticationProvider>
                  <UserFavoriteProvider>
                    <SettingProvider>
                      <MenuProvider >
                        <NavigationContainer linking={LinkingConfiguration}>
                          <AuthStackNavigator />
                          {/* <Stack.Navigator headerMode="none">
                          <Stack.Screen name={ScreenKey.AuthStackNavigator} component={AuthStackNavigator} />
                        </Stack.Navigator> */}
                        </NavigationContainer>
                      </MenuProvider>
                    </SettingProvider>
                  </UserFavoriteProvider>
                </AuthenticationProvider>
              </CoursesProvider>
            </CategoriesProvider>
          </AuthorsProvider>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
