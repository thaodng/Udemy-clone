import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const Row = ({ icon, placeholder, color, secureTextEntry, onFocus }) => {
  return (
    <View style={{ ...styles.section, borderColor: color }}>
      <MaterialIcons name={icon} size={30} color={color} />
      <TextInput
        placeholder={placeholder}
        style={{ ...styles.textInput, color: color }}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
      />
    </View>
  )
}

export default Row;

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 10
  },
  textInput: {
    flex: 1,
    fontSize: 18
  },
})
