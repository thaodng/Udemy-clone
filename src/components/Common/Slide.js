import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors'

const trimText = (text = "", limit) =>
  text.length > limit ? `${text.slice(0, limit)}...` : text;

const Slide = ({ item, screenDetail }) => {
  const { id, thumbnail, title, rating, description } = item;
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate(screenDetail, { courseId: id });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={{ uri: thumbnail }} />
      <View style={styles.content}>
        <Image style={styles.poster} resizeMode="stretch" source={{ uri: thumbnail }} />
        <View style={styles.data}>
          <Text style={styles.title}>{trimText(title, 30)}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={18} color={Colors.tintColor} />
            <Text style={styles.rating} >{`${rating}/5`}</Text>
          </View>
          <Text style={styles.overview}>{trimText(description, 110)}</Text>
          <TouchableOpacity onPress={goToDetail}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>View details</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Slide;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  background: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
    position: 'absolute'
  },
  content: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  poster: {
    width: 100,
    height: 160,
    borderRadius: 4
  },
  data: {
    width: '50%',
    alignItems: 'flex-start'
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 7
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 7
  },
  rating: {
    color: 'white',
    fontSize: 12,
    marginBottom: 7,
    fontWeight: "500"
  },
  overview: {
    color: 'white',
    fontSize: 14,
    fontWeight: "500"
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.tintColor,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 3
  },
  buttonText: {
    color: 'white'
  }
});
