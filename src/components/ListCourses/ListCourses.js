import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import CourseItemRow from './CourseItemRow';
import CourseItemColumn from './CourseItemColumn';
import courses from '../../mooks/courses.json';
import { MenuProvider } from 'react-native-popup-menu';


// List horizontal
const ListCourses = ({ direction }) => {
  return (
    <MenuProvider style={[styles.shadow]}>
      <FlatList
        horizontal={direction === 'row' ? true : false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={courses}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          direction === 'row'
            ? <CourseItemRow item={item} />
            : <CourseItemColumn item={item} />
        )}
      />
    </MenuProvider>
  )
}


export default ListCourses;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // elevation: 5,
  },
})
