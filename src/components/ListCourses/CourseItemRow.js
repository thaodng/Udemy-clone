import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, Image, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PopupMenu from '../Common/PopupMenu';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Rating from '../Common/Rating';

const { width, height } = Layout.window;

const CourseItemRow = ({ item, txColor, bgColor, screenDetail }) => {
  const navigation = useNavigation();

  const {
    id,
    title,
    imageUrl,
    totalHours,
    contentPoint,
    price,
    soldNumber,
    ratedNumber
  } = item;

  // what is list this course detail screen belong to?
  return (
    <TouchableOpacity onPress={() => {
      navigation.push(screenDetail, {
        key: id,
        courseId: id,
        screenDetail
      })
    }}
      style={[styles.container, styles.shadow]}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.imageContainer}>
        <PopupMenu style={styles.imageOption} item={item} colorDot='white' />
      </View>
      <View style={{ ...styles.contentContainer, backgroundColor: bgColor }}>
        <Text numberOfLines={1} style={{ ...styles.title, color: txColor }}>{title}</Text>
        <Text numberOfLines={1} style={{ color: txColor }}>{item['instructor.user.name']}</Text>
        <Text numberOfLines={1} style={{ color: Colors.errorBackground }}>{price === 0 ? 'Miễn phí' : `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</Text>
        <Text numberOfLines={2} style={{ color: Colors.tintColor, width: '100%', maxHeight: 40 }}>{totalHours} giờ - {soldNumber} học viên - {ratedNumber} đánh giá </Text>
        <View style={styles.rating}>
          <Rating rating={contentPoint} />
          <Text style={{ color: Colors.tintColor }}>
            ({contentPoint ? Number((contentPoint).toFixed(1)) : 0})
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
    height: width / 2.5
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
