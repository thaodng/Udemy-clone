import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Rating } from 'react-native-ratings';
import { ListItem } from 'react-native-elements';

const UserRating = ({ imageUrl, name, content,rate }) => {
  return (
    <ListItem
      leftAvatar={{ source: { uri: imageUrl || 'https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg'} }}
      title={
        <View>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          <View style={styles.subtitleView}>
            <Rating
              type="star"
              fractions={1}
              startingValue={rate}
              readonly
              imageSize={20}
            />
            {/* <Text style={styles.ratingText}>5 months ago</Text> */}
          </View>
        </View>
      }
      subtitle={content}
    />
  );
}

export default UserRating

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  subtitleView: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});
