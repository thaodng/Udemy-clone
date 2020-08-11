import React, { useState, useEffect, useContext } from 'react'
import { View, ScrollView, Alert } from 'react-native';
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
import { getNewCourses, getTopRateCourses, getCoursesByAuthor, getCoursesByCategory } from '../../core/services/courses-service';

const BrowseScreen = () => {
  const navigation = useNavigation();
  const { categories, setCategories } = useContext(CategoriesContext);
  const { newCourses, setNewCourses, topRateCourses, setTopRateCourses } = useContext(CoursesContext);
  const { authors, setAuthors } = useContext(AuthorsContext);

  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  useEffect(() => {
    const loadCategories = async () => {
      if (categories.length === 0) {
        const { message, payload } = await getCategories();
        if (message === 'OK') {
          setCategories(payload);
        } else {
          Alert.alert('Lỗi khi load danh sách danh mục!');
        }
      }
    }

    const loadNewCourses = async () => {
      const { data: { message, payload } } = await getNewCourses({ limit: 10, page: 1 });
      if (message === 'OK') {
        setNewCourses(payload);
      } else {
        Alert.alert('Lỗi khi load danh sách khoá học mới!');
      }
    };

    const loadTopRateCourses = async () => {
      const { data: { message, payload } } = await getTopRateCourses({ limit: 10, page: 1 });
      if (message === 'OK') {
        setTopRateCourses(payload);
      } else {
        Alert.alert('Lỗi khi load danh sách khoá học nổi bật!');
      }
    };

    const loadAuthors = () => {
      const { status, authors, errorString } = getAuthors();
      if (status === 200) {
        setAuthors(authors);
      } else {
        Alert.alert(errorString);
      }
    }

    loadCategories();
    loadNewCourses();
    loadTopRateCourses();
    loadAuthors();
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
          newCourses.map(course => (
            <Slide
              key={course.id}
              item={course}
              screenDetail={ScreenKey.BrowseCourseDetailScreen}
            />
          ))
        }
      </SliderContainer>

      <View style={{ flex: 1 }}>
        <HeaderList
          title="Danh sách danh mục"
          onPress={() => 
            navigation.navigate(
              ScreenKey.BrowseCategoriesScreen, {
              // onPress: onPressCategory,
              subject: 'Danh sách danh mục',
              data: categories
            })
          }
        />
        <TopCategories categories={categories} onPress={onPressCategory} />

        <HeaderList
          title="Khoá học mới"
          txColor={txColor}
          bgColor={bgColor}

          onPress={() =>
            navigation.navigate(
              ScreenKey.BrowseCoursesScreen, {
              screenDetail: ScreenKey.BrowseCourseDetailScreen,
              subject: "Khoá học mới",
              data: newCourses
            })
          }

          data={newCourses}
          listCoursesScreen={ScreenKey.BrowseCoursesScreen}
          screenDetail={ScreenKey.BrowseCourseDetailScreen}
        />

        <ListCourses
          direction="row"
          txColor={txColor}
          bgColor={bgColor}

          data={newCourses}
          screenDetail={ScreenKey.BrowseCourseDetailScreen}
        />

        <HeaderList
          title="Khoá học nổi bật"
          txColor={txColor}
          bgColor={bgColor}

          onPress={() =>
            navigation.navigate(
              ScreenKey.BrowseCoursesScreen, {
              screenDetail: ScreenKey.BrowseCourseDetailScreen,
              subject: "Khoá học nổi bật",
              data: topRateCourses
            })
          }

          data={topRateCourses}
          listCoursesScreen={ScreenKey.BrowseCoursesScreen}
          screenDetail={ScreenKey.BrowseCourseDetailScreen}
        />

        <ListCourses
          direction="row"
          txColor={txColor}
          bgColor={bgColor}

          data={topRateCourses}
          screenDetail={ScreenKey.BrowseCourseDetailScreen} />

        <HeaderList title="Top authors" />
        <Authors authors={authors} txColor={txColor} bgColor={bgColor} onPress={onPressAuthor} />
      </View>
    </ScrollView>
  )
}

export default BrowseScreen;