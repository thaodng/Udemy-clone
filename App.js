import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './src/hooks/useCachedResources';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import BrowseTabNavigator from './src/navigation/BrowseTabNavigator';
import LinkingConfiguration from './src/navigation/LinkingConfiguration';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <StatusBar />
        <View style={styles.container}>
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="AuthStackNavigator" component={AuthStackNavigator} />
              <Stack.Screen name="BrowseTabNavigator" component={BrowseTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
