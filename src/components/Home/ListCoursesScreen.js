import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import ListCourses from '../ListCourses/ListCourses';

const ListCoursesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ListCourses direction="column" />
    </SafeAreaView>
  )
}

export default ListCoursesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10
  },
})

