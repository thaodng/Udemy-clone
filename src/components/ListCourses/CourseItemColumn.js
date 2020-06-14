import React, { useContext } from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PopupMenu from '../Common/PopupMenu';
import Rating from '../Common/Rating';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

import { AuthorsContext } from '../../context/AuthorsContext';


const { width, height } = Layout.window;

const CourseItemColumn = ({ item, txColor, bgColor, screenDetail }) => {
  const navigation = useNavigation();
  const { authors } = useContext(AuthorsContext);

  const { id, categoryId, authorIds, title, thumbnail, level, dateRelease, duration, description, rating, reviews } = item;
  const authorsName = authorIds.map(aId => authors.find(a => a.id === aId)).map(author => author.name).join(', ');

  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      onPress={() => {
        navigation.navigate(screenDetail, {
          courseId: id
        })
      }}>

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: thumbnail }} resizeMode="cover" />
      </View>

      <View style={{...styles.contentContainer, backgroundColor: bgColor}}>
        <Text style={{...styles.title, color: txColor}}>{title}</Text>
        <Text style={{ color: txColor }}>{authorsName}</Text>
        <Text style={{ color: Colors.lightGray, width: '100%', maxWidth: width * 3 / 4, maxHeight: 40 }}>{level} - {dateRelease}</Text>
        <View style={styles.rating}>
          <Rating rating={rating} />
          <Text style={{ color: Colors.tintColor }}>
            ({rating})
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
