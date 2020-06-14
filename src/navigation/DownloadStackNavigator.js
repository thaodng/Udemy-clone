import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import DownloadScreen from '../components/Download/DownloadScreen'
import CourseDetailScreen from '../components/CourseDetail/CourseDetailScreen';

import { SettingContext } from '../context/SettingContext';

import Colors from '../constants/Colors';
import ScreenKey from '../constants/ScreenKey';

const DownloadStack = createStackNavigator();

const DownloadStackNavigator = () => {
  const { userSettings } = useContext(SettingContext);
  const bg = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;

  return (
    <DownloadStack.Navigator 
      screenOptions={{
        headerStyle: { backgroundColor: bg },
        cardStyle: { backgroundColor: bg },
      }}
    >
      <DownloadStack.Screen
        name={ScreenKey.DownloadedCoursesScreen}
        component={DownloadScreen}
        // options={{ title: 'Downloaded courses' }}
        options={{ title: 'Favorite courses' }}
      />
      <DownloadStack.Screen
        name={ScreenKey.DownloadedCourseDetailScreen}
        component={CourseDetailScreen}
        options={{ headerShown: false }}
      />
    </DownloadStack.Navigator>
  );
};

export default DownloadStackNavigator;