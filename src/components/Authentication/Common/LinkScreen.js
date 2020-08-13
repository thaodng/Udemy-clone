import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';


const LinkScreen = ({ onPress, content }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>{content}</Text>
    </TouchableOpacity>
  );
};

export default LinkScreen

const styles = StyleSheet.create({
  link: {
    textAlign: 'right', 
    marginTop: 15,
    marginBottom: 10,
    color: Colors.tintColor
  },
})
