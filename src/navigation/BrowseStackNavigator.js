import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import BrowseScreen from '../components/Browse/BrowseScreen';
import ListCoursesScreen from '../components/ListCourses/ListCoursesScreen';
import CourseDetailScreen from '../components/CourseDetail/CourseDetailScreen';

import ScreenKey from '../constants/ScreenKey';

const BrowseStack = createStackNavigator();

const BrowseStackNavigator = () => {
  return (
    <BrowseStack.Navigator>
      <BrowseStack.Screen
        name={ScreenKey.BrowseScreen}
        component={BrowseScreen}
        options={{ headerShown: false }}
      />

      <BrowseStack.Screen
        name={ScreenKey.BrowseCoursesScreen}
        component={ListCoursesScreen}
        options={{ headerShown: false }}
      />

      <BrowseStack.Screen
        name={ScreenKey.BrowseCourseDetailScreen}
        component={CourseDetailScreen}
      />
    </BrowseStack.Navigator>
  );
};

export default BrowseStackNavigator;