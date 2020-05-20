import * as React from 'react';
import { TouchableOpacity, Button } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from '@expo/vector-icons';
import SearchScreen from '../components/Search/SearchScreen';
import SearchResult from '../components/Search/SearchResult';

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {

  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen} />
      <SearchStack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => { alert('click filter') }}
            >
              <MaterialIcons name="filter" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      />
    </SearchStack.Navigator>
  );
};

export default SearchStackNavigator;