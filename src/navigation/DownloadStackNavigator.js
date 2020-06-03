import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import DownloadScreen from '../components/Download/DownloadScreen'
import CourseDetailScreen from '../components/CourseDetail/CourseDetailScreen';

import ScreenKey from '../constants/ScreenKey';

const DownloadStack = createStackNavigator();

const DownloadStackNavigator = () => {
  return (
    <DownloadStack.Navigator>
      <DownloadStack.Screen
        name={ScreenKey.DownloadedCoursesScreen}
        component={DownloadScreen}
        options={{ title: 'Downloaded courses' }}
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