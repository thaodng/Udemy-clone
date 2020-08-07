import React from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Colors from '../../constants/Colors';

const W = Dimensions.get('window').width / 4;


/* 
{ 
  "id": "4eb0c150-8212-44ef-a90b-fcd40130ac01", 
  "name": "Lập trình web", 
  "isDeleted": false, 
  "createdAt": "2020-07-05T06:24:54.011Z",
  "updatedAt": "2020-07-05T06:24:54.011Z"
}
*/

const TopCategories = ({ categories, onPress }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => onPress(item.id)}>
        <Text style={styles.title}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* <HeaderList title="Top Authors" /> */}
      <FlatList
        horizontal
        keyExtractor={item => item.id}
        data={categories}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </>
  );
};

export default TopCategories;

const styles = StyleSheet.create({
  button: {
    padding: 5
  },
  title: {
    color: Colors.lightText,
    padding: 8,
    textAlign: 'center',
    backgroundColor: Colors.tintColor,
    borderRadius: 8
  }
});