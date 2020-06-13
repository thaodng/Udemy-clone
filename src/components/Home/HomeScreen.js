import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Image, SafeAreaView, ScrollView } from 'react-native'
import HeaderList from '../Common/HeaderList';
import ListCourses from '../ListCourses/ListCourses';
import Banner from '../../assets/images/banner.png';
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


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.imageBanner}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={Banner}
            resizeMode="stretch"
          />
        </View>
        {
          categories.map(ct => {
            const data = courses.filter(course => course.categoryId === ct.id);
            return (
              <>
                <HeaderList title={ct.title} data={data} listCoursesScreen={ScreenKey.ListCoursesScreen} screenDetail={ScreenKey.CourseDetailScreen} />
                <ListCourses direction="row" data={data} screenDetail={ScreenKey.CourseDetailScreen} />
              </>
            );
          })
        }

        {/* 
        <HeaderList title="Software development" listCoursesScreen={ScreenKey.ListCoursesScreen} screenDetail={ScreenKey.CourseDetailScreen} />
        <ListCourses direction="row" screenDetail={ScreenKey.CourseDetailScreen} />

        <HeaderList title="Personal development" listCoursesScreen={ScreenKey.ListCoursesScreen} screenDetail={ScreenKey.CourseDetailScreen} />
        <ListCourses direction="row" screenDetail={ScreenKey.CourseDetailScreen} />

        <HeaderList title="Office Productivity" listCoursesScreen={ScreenKey.ListCoursesScreen} screenDetail={ScreenKey.CourseDetailScreen} />
        <ListCourses direction="row" screenDetail={ScreenKey.CourseDetailScreen} /> 
        */}
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
