import React from 'react'
import { StyleSheet, View, Image, SafeAreaView, ScrollView } from 'react-native'
import HeaderList from '../Common/HeaderList';
import ListCourses from '../ListCourses/ListCourses';
import Banner from '../../assets/images/banner.png';
import Layout from '../../constants/Layout';

const { width, height } = Layout.window;

const HomeScreen = ({ navigation }) => {

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
        <HeaderList title="Software development" />
        <ListCourses direction="row" />
        <HeaderList title="Personal development" />
        <ListCourses direction="row" />
        <HeaderList title="Office Productivity" />
        <ListCourses direction="row" />
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
