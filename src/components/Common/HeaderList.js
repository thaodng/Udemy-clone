import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';

const HeaderList = ({ title, data, listCoursesScreen, screenDetail }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.text}>
        {title}
      </Text>
      {listCoursesScreen &&
        <TouchableOpacity onPress={() =>
          navigation.navigate(
            listCoursesScreen, {
            screenDetail: screenDetail,
            subject: title,
            data: data
          })
        }>
          <View style={styles.buttonViewAll}>
            <Text style={{ color: Colors.tintColor }} >
              See all
            </Text>
            <Entypo size={18} color={Colors.tintColor} name="chevron-small-right" />
          </View>
        </TouchableOpacity>
      }
    </View >
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
