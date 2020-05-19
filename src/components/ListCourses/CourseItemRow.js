import React from 'react'
import { StyleSheet, TouchableOpacity, Image, Text, View, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Rating from '../Common/Rating';

const { width, height } = Dimensions.get('window');

const CourseItemRow = ({ item }) => {

  const { title, preview, author, saved, level, dateRelease, rating, reviews } = item;

  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: preview }} />
        <View style={styles.imageOption}>
          <FontAwesome
            name={saved ? 'bookmark' : 'bookmark-o'}
            color={'black'}
            size={18}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{ color: 'black' }}>{author.name}</Text>
        <Text style={{ color: 'gray', width: '100%', maxHeight: 40 }}>{level} - {dateRelease}</Text>
        <View style={styles.rating}>
          <Rating rating={rating} />
          <Text style={{ color: Colors.tintColor }}>
            ({rating})
            </Text>
        </View>
      </View>

    </View>
  )
}

export default CourseItemRow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 5
  },
  imageContainer: {
    position: 'relative'
  },
  image: {
    width: width / 2,
    height: width / 3
  },
  imageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  contentContainer: {
    padding: 8
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
