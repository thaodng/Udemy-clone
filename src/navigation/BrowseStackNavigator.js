import * as React from 'react';
import { View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import BrowseScreen from '../components/Browse/BrowseScreen'

const BrowseStack = createStackNavigator();

const BrowseStackNavigator = () => {
  return (
    <BrowseStack.Navigator>
      <BrowseStack.Screen name="Browse" component={BrowseScreen} />
    </BrowseStack.Navigator>
  );
};

export default BrowseStackNavigator;