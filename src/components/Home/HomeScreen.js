import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Image, SafeAreaView, ScrollView } from 'react-native'
import SliderContainer from '../Common/SliderContainer';
import Slide from '../Common/Slide';
import HeaderList from '../Common/HeaderList';
import ListCourses from '../ListCourses/ListCourses';
import Layout from '../../constants/Layout';
import ScreenKey from '../../constants/ScreenKey';

import { AuthorsContext } from '../../context/AuthorsContext';
import { CategoriesContext } from '../../context/CategoriesContext';
import { CoursesContext } from '../../context/CoursesContext';

import { getAuthors } from '../../core/services/authors-service';
import { getCategories } from '../../core/services/categories-service';
import { getCourses } from '../../core/services/courses-service';

const { width, height } = Layout.window;

const HomeScreen = () => {
  const { setAuthors } = useContext(AuthorsContext);
  const { categories, setCategories } = useContext(CategoriesContext);
  const { courses, setCourses } = useContext(CoursesContext);

  useEffect(() => {
    const loadAuthors = () => {
      const { status, authors, errorString } = getAuthors();
      if (status === 200) {
        setAuthors(authors);
      } else {
        Alert.alert(errorString);
      }
    }

    const loadCategories = () => {
      const { status, categories, errorString } = getCategories();
      if (status === 200) {
        setCategories(categories);
      } else {
        Alert.alert(errorString);
      }
    }

    const loadCourses = () => {
      const { status, courses, errorString } = getCourses();
      if (status === 200) {
        setCourses(courses);
      } else {
        Alert.alert(errorString);
      }
    };

    loadAuthors();
    loadCategories();
    loadCourses();
  }, []);

  console.log("aaa");
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
