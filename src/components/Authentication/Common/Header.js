import React from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import Logo from '../../../assets/images/robot-dev.png'
import Colors from '../../../constants/Colors';

const Header = ({ title }) => {
  return (
    <>
      <Image
        style={styles.imageHeader}
        source={Logo}
      />
      <Text style={styles.title}>{title}</Text>
    </>
  )
}

export default Header;

const styles = StyleSheet.create({
  imageHeader: {
    alignSelf: 'center'
  },
  title: {
    color: Colors.tintColor,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10
  },
})
