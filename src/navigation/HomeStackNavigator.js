import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../components/Home/HomeScreen';
import ListCoursesScreen from '../components/ListCourses/ListCoursesScreen';
import CourseDetailScreen from '../components/CourseDetail/CourseDetailScreen'

import { SettingContext } from '../context/SettingContext';

import Colors from '../constants/Colors';
import ScreenKey from '../constants/ScreenKey';

const HomeStack = createStackNavigator();

const HomeStackScreens = () => {
  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: bgColor },
        cardStyle: { backgroundColor: bgColor },
      }}
    >
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