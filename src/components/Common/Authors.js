import React from 'react';
import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const W = Dimensions.get('window').width / 4;


const Authors = ({ authors, txColor, onPress }) => {

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.buttonAuthor} onPress={() => onPress(item.id)}>
        <Image style={styles.avatarAuthor} source={{ uri: item.avatar }} />
        <Text style={{...styles.nameAuthor, color: txColor}}>
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

export default Authors;

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