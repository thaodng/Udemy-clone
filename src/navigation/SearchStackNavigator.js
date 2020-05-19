import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from '../components/Search/SearchScreen'
const SearckStack = createStackNavigator();

const SearckStackNavigator = () => {
  return (
    <SearckStack.Navigator>
      <SearckStack.Screen name="Searck" component={SearchScreen} />
    </SearckStack.Navigator>
  );
};

export default SearckStackNavigator;