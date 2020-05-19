import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors'

const Rating = ({ rating }) => {
  const stars = new Array(5).fill(0);

  return (
    stars.map((_, index) => {
      const activeStar = Math.floor(rating) >= (index + 1);
      return (
        <FontAwesome
          name="star"
          key={`star-${index}`}
          size={18}
          color={activeStar ? Colors.tintColor : Colors.inactive}
        />
      )
    })
  )
}

export default Rating;

const styles = StyleSheet.create({})
