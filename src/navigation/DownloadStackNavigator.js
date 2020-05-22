import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import DownloadScreen from '../components/Download/DownloadScreen'

const DownloadStack = createStackNavigator();

const DownloadStackNavigator = () => {
  return (
    <DownloadStack.Navigator>
      <DownloadStack.Screen
        name="DownloadScreen"
        component={DownloadScreen}
        options={{ title: 'Download courses' }}
      />
    </DownloadStack.Navigator>
  );
};

export default DownloadStackNavigator;