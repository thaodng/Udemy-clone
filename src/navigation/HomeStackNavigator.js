import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../components/Home/HomeScreen';
import ListCoursesScreen from '../components/ListCourses/ListCoursesScreen';
import CourseDetailScreen from '../components/CourseDetail/CourseDetailScreen'

import ScreenKey from '../constants/ScreenKey';

const HomeStack = createStackNavigator();

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator >
      <HomeStack.Screen
        name={ScreenKey.HomeScreen}
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <HomeStack.Screen
        name={ScreenKey.ListCoursesScreen}
        component={ListCoursesScreen}
        options={({ route }) => (
          {
            title: route.params.subject
          }
        )}
      />
      <HomeStack.Screen
        name={ScreenKey.CourseDetailScreen}
        component={CourseDetailScreen}
        options={{
          headerShown: false
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreens;