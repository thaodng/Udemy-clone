import React from 'react'
import { StyleSheet, TouchableOpacity, Image, Text, View, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Menu, MenuTrigger, MenuOptions, MenuOption, renderers } from 'react-native-popup-menu';

import Colors from '../../constants/Colors';
import Rating from '../Common/Rating';

const { width, height } = Dimensions.get('window');

const CourseItemRow = ({ item }) => {
  const navigation = useNavigation();
  const { id, title, preview, author, saved, level, dateRelease, rating, reviews } = item;

  return (
    <View
      style={[styles.container, styles.shadow]}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: preview }} />
        <Menu
          onSelect={value => Alert.alert(value + item.id)}
          style={styles.imageOption}>
          <MenuTrigger>
            <Entypo
              name='dots-three-vertical'
              color={'black'}
              size={18}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption value="Download" text="Download" />
            <MenuOption value="Bookmark" text="Bookmark" />
            <MenuOption value="Share" text="Share" />
          </MenuOptions>
        </Menu>
      </View>
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => {
          navigation.navigate('CourseDetailScreen', {
            courseId: id
          })
        }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{ color: 'black' }}>{author.name}</Text>
        <Text style={{ color: 'gray', width: '100%', maxHeight: 40 }}>{level} - {dateRelease}</Text>
        <View style={styles.rating}>
          <Rating rating={rating} />
          <Text style={{ color: Colors.tintColor }}>
            ({rating})
            </Text>
        </View>
      </TouchableOpacity>

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
    // backgroundColor: 'red'
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
