import * as React from 'react';
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from '@expo/vector-icons';

import SearchScreen from '../components/Search/SearchScreen';
import SearchResult from '../components/Search/SearchResult';
import FilterScreen from '../components/Search/FilterScreen';
import ListCoursesScreen from '../components/ListCourses/ListCoursesScreen';
import CourseDetailScreen from '../components/CourseDetail/CourseDetailScreen';

import ScreenKey from '../constants/ScreenKey';

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  const navigation = useNavigation();

  return (
    <SearchStack.Navigator>

      <SearchStack.Screen
        name={ScreenKey.SearchScreen}
        component={SearchScreen}
        options={{
          headerShown: false
        }} />

      <SearchStack.Screen
        name={ScreenKey.SearchResultScreen}
        component={SearchResult}
        options={({ route }) => ({
          title: route.params.keyword,
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => { navigation.navigate(ScreenKey.SearchFilterScreen) }}
            >
              <MaterialIcons name="filter-list" size={24} color="black" />
            </TouchableOpacity>
          )
        })}
      />

      <SearchStack.Screen
        name={ScreenKey.SearchFilterScreen}
        component={FilterScreen}
        options={{
          title: 'Filter',
          // headerRight: () => (
          //   <TouchableOpacity
          //     style={{ paddingHorizontal: 10 }}
          //     onPress={() => { navigation.pop() }}
          //   >
          //     <MaterialIcons name="check" size={24} color="black" />
          //   </TouchableOpacity>
          // )
        }}
      />

      <SearchStack.Screen
        name={ScreenKey.SearchCoursesScreen}
        component={ListCoursesScreen}
        options={({ route }) => (
          {
            title: route.params.subject
          }
        )}
      />

      <SearchStack.Screen
        name={ScreenKey.SearchCourseDetailScreen}
        component={CourseDetailScreen}
        options={{ headerShown: false }}
      />

    </SearchStack.Navigator>
  );
};

export default SearchStackNavigator;