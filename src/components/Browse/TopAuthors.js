import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import authors from '../../mooks/authors.json'

const W = Dimensions.get('window').width / 4;


const TopAuthors = () => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.buttonAuthor}>
        <Image style={styles.avatarAuthor} source={{ uri: item.avatar }} />
        <Text style={styles.nameAuthor}>
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
        data={authors}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </>
  );
};

export default TopAuthors;

const styles = StyleSheet.create({
  buttonAuthor: {
    padding: 5
  },
  avatarAuthor: {
    width: W,
    height: W,
    borderRadius: W / 2,
  },
  nameAuthor: {
    width: W,
    padding: 8,
    textAlign: 'center'
  }
});