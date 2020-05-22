import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';

const HeaderList = ({ title, noIcon }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.text}>
        {title}
      </Text>
      {!noIcon &&
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ListCoursesScreen', { subject: title })
          }>

          <View style={styles.buttonViewAll}>
            <Text style={{ color: Colors.tintColor }} >
              See all
          </Text>
            <Entypo size={18} color={Colors.tintColor} name="chevron-small-right" />
          </View>
        </TouchableOpacity>
      }
    </View>
  );
};

export default HeaderList;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonViewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});