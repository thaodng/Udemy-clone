import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../../../constants/Colors';

const ButtonConfirm = ({ onPress, content }) => {
  return (
    <TouchableOpacity style={styles.confirmButton} onPress={onPress}>
      <Text style={styles.textConfirm}>{content}</Text>
    </TouchableOpacity>
  );
};

export default ButtonConfirm;

const styles = StyleSheet.create({
  confirmButton: {
    width: '100%',
    height: 40,
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 50
  },
  textConfirm: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
