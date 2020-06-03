import React from 'react'
import { StyleSheet, View, Image, SafeAreaView, ScrollView } from 'react-native'
import HeaderList from '../Common/HeaderList';
import ListCourses from '../ListCourses/ListCourses';
import Banner from '../../assets/images/banner.png';
import Layout from '../../constants/Layout';
import ScreenKey from '../../constants/ScreenKey';


const { width, height } = Layout.window;

const HomeScreen = () => {

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
        <HeaderList title="Software development" listCoursesScreen={ScreenKey.ListCoursesScreen} screenDetail={ScreenKey.CourseDetailScreen} />
        <ListCourses direction="row" screenDetail={ScreenKey.CourseDetailScreen} />

        <HeaderList title="Personal development" listCoursesScreen={ScreenKey.ListCoursesScreen} screenDetail={ScreenKey.CourseDetailScreen} />
        <ListCourses direction="row" screenDetail={ScreenKey.CourseDetailScreen} />

        <HeaderList title="Office Productivity" listCoursesScreen={ScreenKey.ListCoursesScreen} screenDetail={ScreenKey.CourseDetailScreen} />
        <ListCourses direction="row" screenDetail={ScreenKey.CourseDetailScreen} />
      </ScrollView>
    </SafeAreaView>
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
