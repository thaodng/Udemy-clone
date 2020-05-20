import * as React from 'react';
import { TouchableOpacity, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from '@expo/vector-icons';

import SearchScreen from '../components/Search/SearchScreen';
import SearchResult from '../components/Search/SearchResult';
import FilterScreen from '../components/Search/FilterScreen';

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  const navigation = useNavigation();

  return (
    <SearchStack.Navigator>

      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false
        }} />

      <SearchStack.Screen
        name="SearchResult"
        component={SearchResult}
        options={({ route }) => ({
          title: route.params.keyword,
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => { navigation.navigate('FilterScreen') }}
            >
              <MaterialIcons name="filter-list" size={24} color="black" />
            </TouchableOpacity>
          )
        })}
      />

      <SearchStack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          title: 'Filter',
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => { navigation.pop() }}
            >
              <MaterialIcons name="check" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      />

    </SearchStack.Navigator>
  );
};

export default SearchStackNavigator;