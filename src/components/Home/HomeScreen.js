import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import HeaderList from './HeaderList'
import TopAuthors from './TopAuthors'
import ListCourses from '../ListCourses/ListCourses';

const HomeScreen = ({ navigation }) => {
  //  navigation.navigate('ListCoursesScreen')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {
          /*         
          <HeaderList title="Top authors" />
          <TopAuthors />
  
          <HeaderList title="Software development" />
          <ListCourses direction="row" /> 
          */
        }

        <HeaderList title="Software development" />
        <ListCourses direction="column" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
