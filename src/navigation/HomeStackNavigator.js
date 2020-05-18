import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../components/Home/HomeScreen';
import ListCoursesScreen from '../components/ListCourses/ListCoursesScreen';
import CourseDetailScreen from '../components/CourseDetail/CourseDetailScreen'

const HomeStack = createStackNavigator();

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={
          {
            title: 'Home',
          }
        }
      />
      <HomeStack.Screen
        name="ListCoursesScreen"
        component={ListCoursesScreen}
        options={({ route }) => (
          {
            title: '' // route.params.subject
          }
        )}
      />
      <HomeStack.Screen
        name="CourseDetailScreen"
        component={CourseDetailScreen}
        options={{
          headerShown: false
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreens;