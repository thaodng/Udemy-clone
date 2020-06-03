import React from 'react'
import { Text, View, Image, Dimensions, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper';
import HeaderList from '../Common/HeaderList';
import TopAuthors from './TopAuthors';
import ListCourses from '../ListCourses/ListCourses';
import ScreenKey from '../../constants/ScreenKey';

const { width, height } = Dimensions.get('window')

const BrowseScreen = () => {
  const Slide = ({ uri, title }) => {
    return (
      <>
        <Image
          style={styles.image}
          source={{ uri: uri }}
          resizeMode="stretch" />
        <Text style={styles.text} numberOfLines={1}>{title}</Text>
      </>
    )
  }

  return (
    <ScrollView>
      <Swiper
        style={styles.wrapper}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
      >
        <View style={styles.slide}>
          <Slide
            uri="https://deno.land/v1_wide.jpg"
            title="Deno" />
        </View>

        <View style={styles.slide}>
          <Slide
            uri="https://wp.technologyreview.com/wp-content/uploads/2019/07/quantumexplainer3.2-01-10.jpg"
            title="Cryptography" />
        </View>

        <View style={styles.slide}>
          <Slide
            uri="https://techtalk.vn/wp-content/uploads/2017/05/react-native-logo-696x360.jpg"
            title="React native" />
        </View>

      </Swiper>

      <View style={{ flex: 1 }}>
        <HeaderList title="Top authors"/>
        <TopAuthors />

        <HeaderList title="Software development" listCoursesScreen={ScreenKey.BrowseCoursesScreen} screenDetail={ScreenKey.BrowseCourseDetailScreen}/>
        <ListCourses direction="row" screenDetail={ScreenKey.BrowseCourseDetailScreen}/>

        <HeaderList title="Personsal development" listCoursesScreen={ScreenKey.BrowseCoursesScreen} screenDetail={ScreenKey.BrowseCourseDetailScreen}/>
        <ListCourses direction="row" screenDetail={ScreenKey.BrowseCourseDetailScreen}/>

        <HeaderList title="Office Productivity" listCoursesScreen={ScreenKey.BrowseCoursesScreen} screenDetail={ScreenKey.BrowseCourseDetailScreen}/>
        <ListCourses direction="row" screenDetail={ScreenKey.BrowseCourseDetailScreen}/>
      </View>
    </ScrollView>
  )
}

export default BrowseScreen;


const styles = {
  wrapper: {
    height: height / 3
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    width,
  },
  text: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  dot: {
    backgroundColor: `gray`,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3
  },
  activeDot: {
    backgroundColor: 'white',
    width: 20,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3
  },
}

