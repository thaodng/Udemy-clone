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


const TopCategories = ({ categories, onPress }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => onPress(item.id)}>
        <Text style={styles.title}>
          {item.title}
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
    padding: 8,
    textAlign: 'center',
    color: 'white',
    backgroundColor: Colors.tintColor,
    borderRadius: 8
  }
});