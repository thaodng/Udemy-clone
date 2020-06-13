import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Image, SafeAreaView, ScrollView } from 'react-native'
import SliderContainer from '../Common/SliderContainer';
import Slide from '../Common/Slide';
import HeaderList from '../Common/HeaderList';
import ListCourses from '../ListCourses/ListCourses';
import Layout from '../../constants/Layout';
import ScreenKey from '../../constants/ScreenKey';

import { CategoriesContext } from '../../context/CategoriesContext';
import { CoursesContext } from '../../context/CoursesContext';

const { width, height } = Layout.window;

const HomeScreen = () => {
  const { categories } = useContext(CategoriesContext);
  const { courses } = useContext(CoursesContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <SliderContainer title="News course">
          {
            courses.map(course => (
              <Slide
                key={course.id}
                item={course}
                screenDetail={ScreenKey.CourseDetailScreen}
              />
            ))
          }
        </SliderContainer>
        {
          categories.map(ct => {
            const data = courses.filter(course => course.categoryId === ct.id);
            return (
              <View key={`${ct.id}`}>
                <HeaderList title={ct.title} data={data} listCoursesScreen={ScreenKey.ListCoursesScreen} screenDetail={ScreenKey.CourseDetailScreen} />
                <ListCourses direction="row" data={data} screenDetail={ScreenKey.CourseDetailScreen} />
              </View>
            );
          })
        }

      </ScrollView>
    </SafeAreaView >
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  imageBanner: {
    width: width,
    height: height / 2.5,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'gray'
  }
})
