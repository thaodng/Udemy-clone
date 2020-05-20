import React from 'react'
import { StyleSheet, TouchableOpacity, Image, Text, View, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Rating from '../Common/Rating';

const { width, height } = Dimensions.get('window');

const CourseItemColumn = ({ item }) => {

  const { id, title, preview, author, saved, level, dateRelease, rating, reviews } = item;

  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      onPress={() => {
        navigation.navigate('CourseDetailScreen', {
          courseId: id
        })
      }}>

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: preview }} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{ color: 'black' }}>{author.name}</Text>
        <Text style={{ color: 'gray', width: '100%', maxWidth: width * 3 / 4, maxHeight: 40 }}>{level} - {dateRelease}</Text>
        <View style={styles.rating}>
          <Rating rating={rating} />
          <Text style={{ color: Colors.tintColor }}>
            ({rating})
            </Text>
        </View>
      </View>

      <View style={styles.imageOption}>
        <FontAwesome
          name={saved ? 'bookmark' : 'bookmark-o'}
          color={'black'}
          size={18}
        />
      </View>

    </TouchableOpacity>
  )
}

export default CourseItemColumn;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  imageContainer: {
    // marginRight: 5,
  },
  image: {
    width: width / 3.33,
    height: width / 3.33,
  },
  imageOption: {
    paddingTop: 5,
    paddingRight: 15,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  contentContainer: {
    paddingHorizontal: 5
  },
  title: {
    fontSize: 18,
    fontWeight: '500'
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
});