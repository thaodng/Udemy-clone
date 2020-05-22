import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const RowItem = ({ icon, title, rightIcon, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={icon} size={20} color={Colors.dark} />
      <Text style={[styles.itemText, { marginLeft: icon ? 10 : 0 }]}>{title}</Text>
      {rightIcon && <FontAwesome name="angle-right" size={20} color={Colors.dark} />}
    </TouchableOpacity>
  )
}

export default RowItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: '#fff',
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    color: Colors.dark,
  },
})
