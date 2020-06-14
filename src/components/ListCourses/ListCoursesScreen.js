import React, { useEffect, useContext } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native';

import Colors from '../../constants/Colors';
import { SettingContext } from '../../context/SettingContext';
import ListCourses from './ListCourses';

const ListCoursesScreen = ({ route }) => {
  const { data, screenDetail } = route.params;
  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;
  
  return (
    <SafeAreaView style={styles.container}>
      <ListCourses direction="column" txColor={txColor} bgColor={bgColor} data={data} screenDetail={screenDetail} />
    </SafeAreaView>
  )
};

export default ListCoursesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10
  },
});