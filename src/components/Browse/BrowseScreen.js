import React, { useState, useEffect, useContext } from 'react'
import { View, ScrollView, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import SliderContainer from '../Common/SliderContainer';
import Slide from '../Common/Slide';
import HeaderList from '../Common/HeaderList';
import Authors from '../Common/Authors';
import TopCategories from './TopCategories';
import ListCourses from '../ListCourses/ListCourses';
import ScreenKey from '../../constants/ScreenKey';
import Colors from '../../constants/Colors';

import { Context as AuthContext } from '../../context/AuthContext';
import { AuthorsContext } from '../../context/AuthorsContext';
import { CategoriesContext } from '../../context/CategoriesContext';
import { CoursesContext } from '../../context/CoursesContext';
import { SettingContext } from '../../context/SettingContext';

import { getAuthors } from '../../core/services/authors-service';
import { getCategories } from '../../core/services/categories-service';
import {
  getRecommendCourses, getNewCourses, getTopRateCourses, getMyCourses, getCoursesByCategory, getCourseById
} from '../../core/services/courses-service';

const BrowseScreen = () => {
  const navigation = useNavigation();
  const [t] = useTranslation('common');
  const { categories, setCategories } = useContext(CategoriesContext);
  const { authors, setAuthors } = useContext(AuthorsContext);
  const { state: { isAuthenticated, token, userInfo } } = useContext(AuthContext);

  const {
    newCourses,
    setNewCourses,
    topRateCourses,
    setTopRateCourses,
    setDownloadedCourses,
    myCourses,
    setMyCourses,
    recommendedCourses,
    setRecommendedCourses
  } = useContext(CoursesContext);


  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  const [loading, setLoading] = useState(true);

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

    const loadRecommendedCourses = async () => {
      const { message, payload } = await getRecommendCourses({ userId: userInfo.id });

      // const { data: { message, payload } } = await getRecommendCourses({ userId: userInfo.id });
      if (message === 'OK') {
        setRecommendedCourses(payload);
      } else {
        Alert.alert('Lỗi khi load danh sách khoá học gợi ý!');
      }
    };

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

    const loadMyCourses = async () => {
      const { message, payload } = await getMyCourses({ token });
      if (message === 'OK') {
        const ids = payload.map(course => getCourseById({ id: course.id }));
        const res = await Promise.all(ids);

        const mCourses = res.map((r, i) => {
          return {
            ...r.payload,
            total: payload[i].total,
            learnLesson: payload[i].learnLesson,
            process: payload[i].process,
            latestLearnTime: payload[i].latestLearnTime,
          }
        });

        setMyCourses(mCourses);
      } else {
        Alert.alert('Lỗi khi load danh sách khoá học nổi bật!');
      }
    };


    const loadDownloadedCourses = async () => {
      const data = await AsyncStorage.getItem('downloadedCourses');
      const downloadedCourses = JSON.parse(data);

      if (downloadedCourses !== null && downloadedCourses.length > 0) {
        setDownloadedCourses(downloadedCourses);
      }
    };

    const loadAuthors = async () => {
      if (authors.length === 0) {
        const { message, payload } = await getAuthors();
        if (message === 'OK') {
          setAuthors(payload);
        } else {
          Alert.alert('Lỗi khi load danh sách tác giả!');
        }
      }
    }


    setLoading(true);
    loadCategories();
    loadNewCourses();
    loadTopRateCourses();
    loadDownloadedCourses();
    loadAuthors();

    if (isAuthenticated) {
      loadRecommendedCourses();
      loadMyCourses();
    }

    setLoading(false);
  }, []);

  const onPressAuthor = (authorId) => {
    const author = authors.find(a => a.id === authorId);
    console.log(author);
    // const data = getCoursesByAuthor(authorId);

    // navigation.navigate(ScreenKey.BrowseCoursesScreen, {
    //   screenDetail: ScreenKey.BrowseCourseDetailScreen,
    //   subject: `${author.name}'s courses`,
    //   data: data
    // });
  };

  const onPressCategory = async (name, categoryId) => {
    const { data: { payload: { rows } } } = await getCoursesByCategory({ categoryId });

    navigation.navigate(ScreenKey.BrowseCoursesScreen, {
      screenDetail: ScreenKey.BrowseCourseDetailScreen,
      subject: `${name}`,
      data: rows
    });
  };

  return (
    <ScrollView >
      {
        loading
          ? (<ActivityIndicator size="large" />)
          : (
            <>
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
                  title={t('homeScreen.categories')}
                  onPress={() =>
                    navigation.navigate(
                      ScreenKey.BrowseCategoriesScreen, {
                      subject: t('homeScreen.categories'),
                      data: categories
                    })
                  }
                />
                <TopCategories categories={categories} onPress={onPressCategory} />
                {
                  isAuthenticated &&
                  <>
                    <HeaderList
                      title={t('homeScreen.myCourses')}
                      txColor={txColor}
                      bgColor={bgColor}

                      onPress={() =>
                        navigation.navigate(
                          ScreenKey.BrowseCoursesScreen, {
                          screenDetail: ScreenKey.BrowseCourseDetailScreen,
                          subject: t('homeScreen.myCourses'),
                          data: myCourses
                        })
                      }
                    />

                    <ListCourses
                      direction="row"
                      txColor={txColor}
                      bgColor={bgColor}
                      data={myCourses}
                      screenDetail={ScreenKey.BrowseCourseDetailScreen}
                    />
                  </>
                }


                <HeaderList
                  title={t('homeScreen.newCourses')}
                  txColor={txColor}
                  bgColor={bgColor}

                  onPress={() =>
                    navigation.navigate(
                      ScreenKey.BrowseCoursesScreen, {
                      screenDetail: ScreenKey.BrowseCourseDetailScreen,
                      subject: t('homeScreen.newCourses'),
                      data: newCourses
                    })
                  }
                />

                <ListCourses
                  direction="row"
                  txColor={txColor}
                  bgColor={bgColor}

                  data={newCourses}
                  screenDetail={ScreenKey.BrowseCourseDetailScreen}
                />

                <HeaderList
                  title={t('homeScreen.topCourses')}
                  txColor={txColor}
                  bgColor={bgColor}

                  onPress={() =>
                    navigation.navigate(
                      ScreenKey.BrowseCoursesScreen, {
                      screenDetail: ScreenKey.BrowseCourseDetailScreen,
                      subject: t('homeScreen.topCourses'),
                      data: topRateCourses
                    })
                  }
                />

                <ListCourses
                  direction="row"
                  txColor={txColor}
                  bgColor={bgColor}

                  data={topRateCourses}
                  screenDetail={ScreenKey.BrowseCourseDetailScreen} />

                {
                  isAuthenticated &&
                  <>
                    <HeaderList
                      title={t('homeScreen.recommendCourse')}
                      txColor={txColor}
                      bgColor={bgColor}

                      onPress={() =>
                        navigation.navigate(
                          ScreenKey.BrowseCoursesScreen, {
                          screenDetail: ScreenKey.BrowseCourseDetailScreen,
                          subject: t('homeScreen.recommendCourse'),
                          data: recommendedCourses
                        })
                      }
                    />

                    <ListCourses
                      direction="row"
                      txColor={txColor}
                      bgColor={bgColor}
                      data={recommendedCourses}
                      screenDetail={ScreenKey.BrowseCourseDetailScreen}
                    />
                  </>
                }

                <HeaderList title={t('homeScreen.topAuthors')} />
                <Authors authors={authors} direction="row" txColor={txColor} bgColor={bgColor} onPress={onPressAuthor} />
              </View>
            </>
          )
      }
    </ScrollView>
  )
}

export default BrowseScreen;