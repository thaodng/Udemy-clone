import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, StyleSheet, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
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
          <MenuProvider >
            <NavigationContainer linking={LinkingConfiguration}>
              <Stack.Navigator headerMode="none">
                {/* Not login */}
                <Stack.Screen name="AuthStackNavigator" component={AuthStackNavigator} />
                {/* Already login  */}
                <Stack.Screen name="BrowseTabNavigator" component={BrowseTabNavigator} />
              </Stack.Navigator>
            </NavigationContainer>
          </MenuProvider>
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
