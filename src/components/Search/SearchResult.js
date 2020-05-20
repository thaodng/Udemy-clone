import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const SearchResult = ({ route }) => {
  const navigation = useNavigation();
  const {keyword} = route.params;
  
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default SearchResult

const styles = StyleSheet.create({})
