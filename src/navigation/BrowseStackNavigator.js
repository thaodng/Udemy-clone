import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import BrowseScreen from '../components/Browse/BrowseScreen';
import ListCoursesScreen from '../components/ListCourses/ListCoursesScreen';
import CourseDetailScreen from '../components/CourseDetail/CourseDetailScreen';

import { SettingContext } from '../context/SettingContext';

import Colors from '../constants/Colors';
import ScreenKey from '../constants/ScreenKey';

const BrowseStack = createStackNavigator();

const BrowseStackNavigator = () => {
  const { userSettings } = useContext(SettingContext);
  const bg = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  
  return (
    <BrowseStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: bg  },
        cardStyle: { backgroundColor: bg },
      }}
    >
      <BrowseStack.Screen
        name={ScreenKey.BrowseScreen}
        component={BrowseScreen}
        options={{ headerShown: false }}
      />

      <BrowseStack.Screen
        name={ScreenKey.BrowseCoursesScreen}
        component={ListCoursesScreen}
        options={({ route }) => (
          {
            title: route.params.subject
          }
        )}
      />

      <BrowseStack.Screen
        name={ScreenKey.BrowseCourseDetailScreen}
        component={CourseDetailScreen}
        options={{ headerShown: false }}
      />
    </BrowseStack.Navigator>
  );
};

export default BrowseStackNavigator;