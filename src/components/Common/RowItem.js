import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const RowItem = ({ icon, title, rightIcon, onPress, txColor, bgColor }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.itemContainer, backgroundColor: bgColor }}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={icon} size={20} color={txColor} />
      <Text style={[styles.itemText, { color: txColor }, { marginLeft: icon ? 12 : 0 }]}>{title}</Text>
      {rightIcon && <FontAwesome name="angle-right" size={20} color={txColor} />}
    </TouchableOpacity>
  )
}

export default RowItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
})
