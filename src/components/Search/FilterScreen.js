import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FilterScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingHorizontal: 10 }}
          onPress={() => { navigation.pop() }}
        >
          <MaterialIcons name="check" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View>
      <Text>Filter</Text>
    </View>
  )
}

export default FilterScreen;

const styles = StyleSheet.create({})
