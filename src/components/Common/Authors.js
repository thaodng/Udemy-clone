import React from 'react';
import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';

const W = Dimensions.get('window').width / 4;


const Authors = ({ authors, direction, txColor, onPress,
  onEndReached, onEndReachedThreshold, ListFooterComponent }) => {

  const renderRowItem = (item) => {
    const avatar = item['user.avatar'] ? item['user.avatar']  : item.avatar;
    const name = item['user.name'] ? item['user.name'] : item.name;

    return (
      <TouchableOpacity style={styles.buttonAuthor} onPress={() => onPress(item.id)}>
        <Image style={styles.avatarAuthor} source={{ uri: avatar }} />
        <Text style={{ ...styles.nameAuthor, color: txColor }}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderColumnItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.buttonAuthorColumn}
        FonPress={() => onPress(item.id)}
      >
        <Image style={styles.avatarAuthor} source={{ uri: item.avatar }} />
        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
          <Text style={{ ...styles.nameAuthor, color: txColor }}>
            {item.name}
          </Text>
          <Text style={{ ...styles.numCourses, color: txColor }}>
            {item.numcourses} Khoá học
          </Text>
        </View>
      </TouchableOpacity>
    )
  };



  return (
    <>
      {/* <HeaderList title="Top Authors" /> */}
      <FlatList
        horizontal={direction === 'row' ? true : false}
        keyExtractor={item => item.id}
        data={authors}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          direction === 'row'
            ? renderRowItem(item)
            : renderColumnItem(item)
        )}
        onEndReached={direction === 'column' ? onEndReached : null}
        onEndReachedThreshold={direction === 'column' ? onEndReachedThreshold : null}
        ListFooterComponent={direction === 'column' ? ListFooterComponent : null}
      />
    </>
  );
};

export default Authors;

const styles = StyleSheet.create({
  buttonAuthor: {
    padding: 5
  },
  buttonAuthorColumn: {
    width: '100%',
    flexDirection: 'row'
  },
  avatarAuthor: {
    width: W,
    height: W,
    borderRadius: W / 2,
  },
  nameAuthor: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  numCourses: {
    fontSize: 16
  }
});