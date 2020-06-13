import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import ListCourses from './ListCourses';

const ListCoursesScreen = ({ route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ListCourses direction="column" data={route.params.data} screenDetail={route.params.screenDetail} />
    </SafeAreaView>
  )
};

export default ListCoursesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10
  },
});