import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import SearchBar from './SearchBar';
import HeaderList from './HeaderList'
import TopAuthors from './TopAuthors'

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingVertical: 5 }}>
        <SearchBar />
        <HeaderList title="Top authors" />
        <TopAuthors />
        <TouchableOpacity onPress={() => { navigation.navigate('ListCoursesScreen') }}>
          <Text>Go to courses list</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('CourseDetailScreen') }}>
          <Text>Go to course detail</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
