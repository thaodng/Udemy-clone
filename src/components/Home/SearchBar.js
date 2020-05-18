import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';


const SearchBar = () => {
  return (
    <View style={styles.searchBarContainer}>
      <TouchableOpacity style={styles.buttonMap} onPress={() => { console.log('Click button map') }}>
        <Feather name="map-pin" size={20} />
      </TouchableOpacity>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search course" />
        <Feather name="search" size={20} />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  buttonMap: {
    padding: 10,
    margin: 4,
    backgroundColor: Colors.background,
    borderRadius: 4,
    shadowOpacity: 0.14,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', // default is strech
    margin: 4,
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
    borderRadius: 4,
    shadowOpacity: 0.14,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
  },
  textInput: {
    flex: 1,
    padding: 10
  }
});
