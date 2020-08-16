import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Rating } from 'react-native-ratings';

const RatingHeader = ({ title, onFinishRating }) => {

  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ textAlignVertical: 'center', fontSize: 16, fontWeight: 'bold', marginRight: 10 }} >{title}</Text>
      <Rating
        imageSize={25}
        onFinishRating={onFinishRating}
        style={{ paddingVertical: 10 }}
      />
    </View>
  );
}

export default RatingHeader

const styles = StyleSheet.create({})
