import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, Image, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PopupMenu from '../Common/PopupMenu';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Rating from '../Common/Rating';

import { AuthorsContext } from '../../context/AuthorsContext';

const { width, height } = Layout.window;

const CourseItemRow = ({ item, txColor, bgColor, screenDetail }) => {
  const navigation = useNavigation();
  const { authors } = useContext(AuthorsContext);

  const { id, categoryId, authorIds, title, thumbnail, level, dateRelease, duration, description, rating, reviews } = item;
  const authorsName = authorIds.map(aId => authors.find(a => a.id === aId)).map(author => author.name).join(', ');
  
  // what is list this course detail screen belong to?
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate(screenDetail, {
        courseId: id
      })
    }}
      style={[styles.container, styles.shadow]}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: thumbnail }} />
        <PopupMenu style={styles.imageOption} item={item} colorDot='white' />
      </View>
      <View style={{...styles.contentContainer, backgroundColor: bgColor}}>
        <Text numberOfLines={1} style={{...styles.title, color: txColor}}>{title}</Text>
        <Text numberOfLines={1} style={{ color: txColor }}>{authorsName}</Text>
        <Text numberOfLines={1} style={{ color: Colors.lightGray, width: '100%', maxHeight: 40 }}>{level} - {dateRelease}</Text>
        <View style={styles.rating}>
          <Rating rating={rating} />
          <Text style={{ color: Colors.tintColor }}>
            ({rating})
            </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseItemRow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    position: 'absolute',
    top: 8,
    right: 5,
  },
  contentContainer: {
    padding: 8,
    width: width / 2,
    height: width / 3
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
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
});
