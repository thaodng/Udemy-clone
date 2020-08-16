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

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import common_vi from './src/translations/vi/common.json'
import common_en from "./src/translations/en/common.json";

import useCachedResources from './src/hooks/useCachedResources';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import LinkingConfiguration from './src/navigation/LinkingConfiguration';

// import ScreenKey from './src/constants/ScreenKey';
// const Stack = createStackNavigator();

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',                              // language to use
  resources: {
    en: {
      common: common_en               // 'common' is our custom namespace
    },
    vi: {
      common: common_vi
    },
  },
});

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
                      <I18nextProvider i18n={i18next}>
                        <MenuProvider >
                          <NavigationContainer linking={LinkingConfiguration}>
                            <AuthStackNavigator />
                            {/* <Stack.Navigator headerMode="none">
                          <Stack.Screen name={ScreenKey.AuthStackNavigator} component={AuthStackNavigator} />
                        </Stack.Navigator> */}
                          </NavigationContainer>
                        </MenuProvider>
                      </I18nextProvider>
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
