import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../../../constants/Colors';

const ButtonConfirm = ({ content, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity style={{ ...styles.confirmButton, backgroundColor: backgroundColor }} onPress={onPress}>
      <Text style={styles.textConfirm}>{content}</Text>
    </TouchableOpacity>
  );
};

export default ButtonConfirm;

const styles = StyleSheet.create({
  confirmButton: {
    width: '100%',
    height: 40,
    // backgroundColor: Colors.tintColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 50
  },
  textConfirm: {
    color: Colors.lightText,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
