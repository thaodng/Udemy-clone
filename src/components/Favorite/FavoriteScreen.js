import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import ListCourses from '../ListCourses/ListCourses';
import Layout from '../../constants/Layout';
import ScreenKey from '../../constants/ScreenKey';
import Colors from '../../constants/Colors';

import { Context as AuthContext } from '../../context/AuthContext';
import { SettingContext } from '../../context/SettingContext';
import { UserFavoriteContext } from '../../context/UserFavoriteContext';

import { getCourseById } from '../../core/services/courses-service';
import { postLikeCourse, getUserFavoriteCourse } from '../../core/services/favorite-service';

const { width, height } = Layout.window;

const FavoriteScreen = () => {
  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  const { favoriteCourses, setFavoriteCourses } = useContext(UserFavoriteContext);

  const [loading, setLoading] = useState(true);
  const { state: { token, isAuthenticated, userInfo } } = useContext(AuthContext);

  useEffect(() => {

    const loadFavoriteCourses = async () => {

      const { message, payload } = await getUserFavoriteCourse({ token });
      if (message === 'OK') {
        const ids = payload.map(course => course.id).map(id => getCourseById({ id }));
        const res = await Promise.all(ids);

        const favCourses = res.map(r => r.payload);
        setFavoriteCourses(favCourses);
      };
    }


    loadFavoriteCourses();
    setLoading(false);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerFavoriteContainer}>
        <Text style={styles.total}>{`${favoriteCourses.length} courses`}</Text>
      </View>
      <ListCourses direction="column" txColor={txColor} bgColor={bgColor} data={favoriteCourses} screenDetail={ScreenKey.FavoriteCourseDetailScreen} />
    </SafeAreaView >
  )
}

export default FavoriteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerFavoriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black'
  },
  total: {
    fontSize: 16
  },
  remove: {
    fontWeight: '700',
    color: Colors.tintColor
  },
})
