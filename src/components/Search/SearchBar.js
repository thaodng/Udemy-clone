import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const SearchBar = ({ term, setTerm, withMap, setWithMap, updateRecentSearch, onSearch }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.searchBarContainer}>
      <TouchableOpacity
        style={{
          ...styles.buttonMap,
          backgroundColor: withMap ? Colors.tintColor : Colors.background,
        }}
        onPress={() => { setWithMap(!withMap) }}>
        <Feather name="map-pin" size={20} />
      </TouchableOpacity>

      <View style={styles.searchInputContainer}>
        <TextInput
          value={term}
          placeholder="Search course"
          onChangeText={text => setTerm(text)}
          style={styles.textInput}
          onEndEditing={() => {
            onSearch(term);
            updateRecentSearch(term);
          }} />
        <TouchableOpacity onPress={() => {
          onSearch(term);
        }}>
          <Feather name="search" size={20} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  buttonMap: {
    padding: 10,
    margin: 4,
    borderRadius: 4,
    shadowRadius: 4,
    shadowOpacity: 0.14,
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
    shadowRadius: 4,
    shadowOpacity: 0.14,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
  },
  textInput: {
    flex: 1,
    padding: 10
  }
});

