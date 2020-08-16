import React from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

import PopupMenu from '../Common/PopupMenu';
import Rating from '../Common/Rating';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';


const { width, height } = Layout.window;

/* 
id	string($uuid)
title	string
subtitle	string
price	integer
description	string
requirement	[...]
learnWhat	[...]
soldNumber	integer
ratedNumber	integer
videoNumber	integer
totalHours	number
formalityPoint	number
contentPoint	number
presentationPoint	number
imageUrl	string($url)
promoVidUrl	string($url)
status	string
Enum:
Array [ 2 ]
isDeleted	boolean
isHidden	boolean
createdAt	string($date-time)
updatedAt	string($date-time)
instructorId	string($uuid)
typeUploadVideoLesson	integer
1: Upload File, 2: Link Youtube


 */

const CourseItemColumn = ({ item, txColor, bgColor, screenDetail }) => {
  const navigation = useNavigation();
  const [t] = useTranslation('common');

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

  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      onPress={() => {
        navigation.navigate(screenDetail, {
          courseId: id
        })
      }}>

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} resizeMode="cover" />
      </View>

      <View style={{ ...styles.contentContainer, backgroundColor: bgColor }}>
        <Text style={{ ...styles.title, color: txColor }}>{title}</Text>
        {
          item['instructor.user.name'] &&
          <Text style={{ color: txColor }}>{item['instructor.user.name']}</Text>
        }
        <Text numberOfLines={1} style={{ color: Colors.errorBackground }}>{price === 0 ? t('course.free') : `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</Text>
        <Text style={{ color: Colors.lightGray, width: '100%', maxWidth: width * 3 / 4, maxHeight: 40 }}>{totalHours} {t('course.hours')} - {soldNumber} {t('course.students')}</Text>
        <View style={styles.rating}>
          <Rating rating={contentPoint} />
          <Text style={{ color: Colors.tintColor }}>
            ({ratedNumber})
            </Text>
        </View>
      </View>

      <PopupMenu
        style={{ alignSelf: 'flex-start', padding: 10 }}
        item={item}
        colorDot={txColor}
      />

    </TouchableOpacity>
  )
}

export default CourseItemColumn;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: Colors.lightgray,
    borderBottomWidth: 0.5,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  imageContainer: {
    marginRight: 2,
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
    flex: 1,
    paddingHorizontal: 5,
    // justifyContent: 'space-around'
  },
  title: {
    fontSize: 18,
    fontWeight: '500'
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginRight: 14
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // elevation: 5,
  },
});
