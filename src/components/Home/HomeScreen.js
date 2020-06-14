import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Image, SafeAreaView, ScrollView } from 'react-native';
import Banner from '../../assets/images/banner.png';
import HeaderList from '../Common/HeaderList';
import ListCourses from '../ListCourses/ListCourses';
import Layout from '../../constants/Layout';
import ScreenKey from '../../constants/ScreenKey';
import Colors from '../../constants/Colors';

import { UserContext } from '../../context/UserContext';
import { SettingContext } from '../../context/SettingContext';
import { CategoriesContext } from '../../context/CategoriesContext';
import { CoursesContext } from '../../context/CoursesContext';

const { width, height } = Layout.window;

const HomeScreen = () => {
  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  const { userInfo } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);
  const { courses } = useContext(CoursesContext);

  const bookmarkedCourses = courses.filter(course => userInfo.bookmarkedCourses.includes(course.id));

  let bookmarkCategories = [];
  for (let i = 0; i < bookmarkedCourses.length; i++) {
    if (!bookmarkCategories.includes(bookmarkedCourses[i].categoryId)) {
      bookmarkCategories.push(bookmarkedCourses[i].categoryId);
    }
  }

  bookmarkCategories = bookmarkCategories.map(ctId => categories.find(ct => ct.id === ctId));

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
          bookmarkCategories.map(ct => {
            const data = bookmarkedCourses.filter(course => course.categoryId === ct.id);
            return (
              <View key={`${ct.id}`}>
                <HeaderList title={ct.title} txColor={txColor} data={data} listCoursesScreen={ScreenKey.ListCoursesScreen} screenDetail={ScreenKey.CourseDetailScreen} />
                <ListCourses direction="row" txColor={txColor} bgColor={bgColor} data={data} screenDetail={ScreenKey.CourseDetailScreen} />
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
