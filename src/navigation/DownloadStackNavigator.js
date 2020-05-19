import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import DownloadScreen from '../components/Download/DownloadScreen'

const DownloadStack = createStackNavigator();

const DownloadStackNavigator = () => {
  return (
    <DownloadStack.Navigator>
      <DownloadStack.Screen name="Download" component={DownloadScreen} />
    </DownloadStack.Navigator>
  );
};

export default DownloadStackNavigator;