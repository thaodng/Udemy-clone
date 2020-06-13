import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SectionList } from 'react-native'
import { Video } from 'expo-av'

import PopupMenu from '../Common/PopupMenu';
import Colors from '../../constants/Colors';
import DATA from '../../mocks/detail.json'

const CourseDetailScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const [videoUrl, setVideoUrl] = useState('https://www.radiantmediaplayer.com/media/bbb-360p.mp4')

  const renderItem = ({ id, time, title }) => {

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => alert(`Detail Id: ${id}`)}
      >
        <Text style={styles.numHead}>{'.'}</Text>
        <View style={styles.itemBody}>
          <Text style={styles.itemTime}>{time} mins</Text>
          <Text style={styles.itemTitle}>{title}</Text>
        </View>

        <PopupMenu style={styles.itemOption} item={{ id, time, title }} colorDot='black' />


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
        <Text style={styles.heading}>Course Content</Text>
        <SectionList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          sections={DATA}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => renderItem(item)}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, backgroundColor: '#D3D3D3' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
              <PopupMenu style={styles.itemOption} item={{ title }} colorDot='black' />
            </View>
          )}
        />
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
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.tintColor,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.tintColor
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
    alignItems: 'center',
  }
})
