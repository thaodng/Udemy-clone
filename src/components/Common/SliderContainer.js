import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper';

import Layout from '../../constants/Layout';

const SliderContainer = ({ title, children }) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View> */}
      <View style={styles.swiperContainer}>
        <Swiper loop={true} autoplay={true} showsPagination={false}>
          {children}
        </Swiper>
      </View>
    </View>
  )
}

export default SliderContainer;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    marginBottom: 5
  },
  titleContainer: {
    marginBottom: 20,
  },
  // title: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   fontSize: 16,
  //   marginLeft: 30
  // },
  swiperContainer: {
    width: '100%',
    height: Layout.window.height / 3,
  },
});
