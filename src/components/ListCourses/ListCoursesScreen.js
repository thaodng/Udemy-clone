import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import HeaderList from '../Common/HeaderList';
import ListCourses from '../ListCourses/ListCourses';

const ListCoursesScreen = ({ navigation }) => {
  //  navigation.navigate('ListCoursesScreen')

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ListCourses direction="column" />
    </SafeAreaView>
  )
}

export default ListCoursesScreen

const styles = StyleSheet.create({})

