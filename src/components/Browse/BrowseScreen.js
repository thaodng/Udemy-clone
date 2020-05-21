import React, { Component } from 'react'
import { Text, View, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper';
import HeaderList from '../Home/HeaderList';
import TopAuthors from '../Home/TopAuthors';
import ListCourses from '../ListCourses/ListCourses';

const { width, height } = Dimensions.get('window')

const styles = {
  wrapper: {
    height: height / 2  
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



const BrowseScreen = () => {
  return (
    <ScrollView>
      <Swiper
        style={styles.wrapper}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
      >
        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={{ uri: 'https://deno.land/v1_wide.jpg' }}
            resizeMode="cover" />
          <Text style={styles.text} numberOfLines={1}>Deno</Text>
        </View>

        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={{ uri: 'https://wp.technologyreview.com/wp-content/uploads/2019/07/quantumexplainer3.2-01-10.jpg' }}
            resizeMode="cover"
          />
          <Text style={styles.text} numberOfLines={1}>Cryptography</Text>
        </View>

        <View style={styles.slide}>
          <Image
            style={styles.image}
            source={{ uri: 'https://techtalk.vn/wp-content/uploads/2017/05/react-native-logo-696x360.jpg' }}
            resizeMode="cover"
          />
          <Text style={styles.text} numberOfLines={1}>React native</Text>
        </View>
      </Swiper>
      <View style={{ flex: 1 }}>
        <HeaderList title="Top authors" />
        <TopAuthors />
        <HeaderList title="Software development" />
        <ListCourses direction="row" />
      </View>
    </ScrollView>
  )
}

export default BrowseScreen;