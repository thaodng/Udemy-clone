import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import ListCourses from '../ListCourses/ListCourses';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import DATA from '../../mocks/courses.json';

const DownloadScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerDownloadContainer}>
        <Text style={styles.total}>7 courses (960MB)</Text>
        <TouchableOpacity>
          <Text style={styles.remove}>REMOVE ALL</Text>
        </TouchableOpacity>
      </View>
      <ListCourses direction="column" screenDetail={ScreenKey.DownloadedCourseDetailScreen} />
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
