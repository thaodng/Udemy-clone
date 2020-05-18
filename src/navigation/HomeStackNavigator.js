import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../components/Home/HomeScreen';
import ListCoursesScreen from '../components/ListCourses/ListCoursesScreen';
import CourseDetailScreen from '../components/CourseDetail/CourseDetailScreen'

const HomeStack = createStackNavigator();

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="ListCoursesScreen" component={ListCoursesScreen} />
      <HomeStack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreens;