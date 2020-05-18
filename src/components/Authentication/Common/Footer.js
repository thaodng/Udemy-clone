import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Colors from '../../../constants/Colors';

const Footer = ({ label, onPress, content }) => {
  return (
    <View style={styles.footer}>
      <Text style={{ color: 'gray' }}>{label}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: Colors.tintColor, marginLeft: 3 }}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'center'
  }
})
