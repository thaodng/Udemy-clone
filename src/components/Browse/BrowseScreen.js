import React, { useState, useEffect, useContext } from 'react'
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SliderContainer from '../Common/SliderContainer';
import Slide from '../Common/Slide';
import HeaderList from '../Common/HeaderList';
import Authors from '../Common/Authors';
import TopCategories from './TopCategories';
import ListCourses from '../ListCourses/ListCourses';
import ScreenKey from '../../constants/ScreenKey';
import Colors from '../../constants/Colors';

import { AuthorsContext } from '../../context/AuthorsContext';
import { SettingContext } from '../../context/SettingContext';
import { CategoriesContext } from '../../context/CategoriesContext';
import { CoursesContext } from '../../context/CoursesContext';

import { getAuthors } from '../../core/services/authors-service';
import { getCategories } from '../../core/services/categories-service';
import { getCourses, getCoursesByAuthor, getCoursesByCategory } from '../../core/services/courses-service';

const BrowseScreen = () => {
  const navigation = useNavigation();
  const { authors, setAuthors } = useContext(AuthorsContext);
  const { categories, setCategories } = useContext(CategoriesContext);
  const { courses, setCourses } = useContext(CoursesContext);

  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

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

  const onPressAuthor = (authorId) => {
    const author = authors.find(a => a.id === authorId);
    const data = getCoursesByAuthor(authorId);

    navigation.navigate(ScreenKey.BrowseCoursesScreen, {
      screenDetail: ScreenKey.BrowseCourseDetailScreen,
      subject: `${author.name}'s courses`,
      data: data
    });
  };

  const onPressCategory = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    const data = getCoursesByCategory(categoryId);

    navigation.navigate(ScreenKey.BrowseCoursesScreen, {
      screenDetail: ScreenKey.BrowseCourseDetailScreen,
      subject: `${category.title}`,
      data: data
    })
  };

  return (
    <ScrollView >
      <SliderContainer>
        {
          courses.map(course => (
            <Slide
              key={course.id}
              item={course}
              screenDetail={ScreenKey.BrowseCourseDetailScreen}
            />
          ))
        }
      </SliderContainer>

      <View style={{ flex: 1 }}>
        <HeaderList title="Top categories" />
        <TopCategories categories={categories} onPress={onPressCategory} />
        {
          categories.map(ct => {
            const data = courses.filter(course => course.categoryId === ct.id);
            return (
              <View key={`${ct.id}`}>
                <HeaderList title={ct.title} txColor={txColor} bgColor={bgColor} data={data} listCoursesScreen={ScreenKey.BrowseCoursesScreen} screenDetail={ScreenKey.BrowseCourseDetailScreen} />
                <ListCourses direction="row" txColor={txColor} bgColor={bgColor} data={data} screenDetail={ScreenKey.BrowseCourseDetailScreen} />
              </View>
            );
          })
        }
        <HeaderList title="Top authors" />
        <Authors authors={authors} txColor={txColor} bgColor={bgColor} onPress={onPressAuthor} />
      </View>
    </ScrollView>
  )
}

export default BrowseScreen;