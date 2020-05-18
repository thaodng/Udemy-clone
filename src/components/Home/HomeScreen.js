import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => { navigation.navigate('ListCoursesScreen') }}>
        <Text>Go to courses list</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('CourseDetailScreen') }}>
        <Text>Go to course detail</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
