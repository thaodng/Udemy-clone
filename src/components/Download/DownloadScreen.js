import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { Context as AuthContext } from '../../context/AuthContext';
import { CoursesContext } from '../../context/CoursesContext';
import { SettingContext } from '../../context/SettingContext';

import ListCourses from '../ListCourses/ListCourses';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';


const DownloadScreen = () => {
  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  const { state: { isAuthenticated, userInfo }, updateUserInfo } = useContext(AuthContext);
  const { courses } = useContext(CoursesContext);
  const downloadedCourses = courses.filter(course => userInfo.favoriteCourses.includes(course.id));

  const onRemove = () => {
    setUserInfo({ ...userInfo, favoriteCourses: [] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerDownloadContainer}>
        <Text style={styles.total}>{`${downloadedCourses.length} courses`}</Text>
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.remove}>REMOVE ALL</Text>
        </TouchableOpacity>
      </View>
      <ListCourses direction="column" txColor={txColor} bgColor={bgColor} data={downloadedCourses} screenDetail={ScreenKey.DownloadedCourseDetailScreen} />
    </View>
  )
}

export default DownloadScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerDownloadContainer: {
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
