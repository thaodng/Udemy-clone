import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import FavoriteScreen from '../components/Favorite/FavoriteScreen';
import CourseDetailScreen from '../components/CourseDetail/CourseDetailScreen'

import { SettingContext } from '../context/SettingContext';

import Colors from '../constants/Colors';
import ScreenKey from '../constants/ScreenKey';

const FavoriteStack = createStackNavigator();

const FavoriteStackScreens = () => {
  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  return (
    <FavoriteStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: bgColor },
        cardStyle: { backgroundColor: bgColor },
      }}
    >
      <FavoriteStack.Screen
        name={ScreenKey.FavoriteCoursesScreen}
        component={FavoriteScreen}
        options={{ title: 'Favorite courses' }}
      />

      <FavoriteStack.Screen
        name={ScreenKey.FavoriteCourseDetailScreen}
        component={CourseDetailScreen}
        options={{
          headerShown: false
        }}
      />
    </FavoriteStack.Navigator>
  );
};

export default FavoriteStackScreens;