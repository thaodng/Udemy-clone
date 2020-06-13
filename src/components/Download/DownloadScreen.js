import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { UserContext } from '../../context/UserContext';
import { CoursesContext } from '../../context/CoursesContext';

import ListCourses from '../ListCourses/ListCourses';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';


const DownloadScreen = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
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
      <ListCourses direction="column" data={downloadedCourses} screenDetail={ScreenKey.DownloadedCourseDetailScreen} />
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
