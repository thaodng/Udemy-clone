import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import CourseItemRow from './CourseItemRow';
import CourseItemColumn from './CourseItemColumn';
import DATA from '../../mooks/courses.json';

const ListCourses = ({ direction, screenDetail }) => {
  return (
    <FlatList
      horizontal={direction === 'row' ? true : false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={DATA}
      style={[styles.shadow]}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        direction === 'row'
          ? <CourseItemRow item={item} screenDetail={screenDetail} />
          : <CourseItemColumn item={item} screenDetail={screenDetail} />
      )}
    />
  )
}


export default ListCourses;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // elevation: 5,
  },
})
