import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { Video } from 'expo-av'
import { MaterialIcons } from '@expo/vector-icons'
import detail from '../../mooks/detail.json'
import Colors from '../../constants/Colors';

const CourseDetailScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const [videoUrl, setVideoUrl] = useState('https://www.radiantmediaplayer.com/media/bbb-360p.mp4')

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => alert(`Detail Id: ${item.id}`)}
      >
        <Text style={styles.numHead}>{'.'}</Text>
        <View style={styles.itemBody}>
          <Text style={styles.itemTime}>{item.time} mins</Text>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
        <View style={styles.itemOption}>
          <MaterialIcons name="file-download" size={20} color="black" />
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.courseContainer}>
      <Video
        source={{ uri: videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        isLooping={false}
        useNativeControls
        style={styles.video}
      />
      <View style={styles.playlistContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.heading}>Course Content</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.list}
            data={detail}
            keyExtractor={item => { item.id }}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
      </View>
    </View>
  )
}

export default CourseDetailScreen

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  courseContainer: {
    flex: 1,
  },
  video: {
    width: width,
    height: height / 3
  },
  playlistContainer: {
    flex: 1,
    paddingBottom: 28,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    shadowColor: '#000',
  },
  topContainer: {
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.tintColor
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  list: {
    marginTop: 10,
    borderTopColor: Colors.tintColor,
    borderTopWidth: 1,
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 10
  },
  numHead: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray'
  },
  itemTime: {
    fontSize: 14,
    fontWeight: '500',
    color: 'gray'
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black'
  },
  itemOption: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
