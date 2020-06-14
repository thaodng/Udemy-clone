import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SectionList, Share } from 'react-native'
import ReadMore from 'react-native-read-more-text';
import { Video } from 'expo-av';

import TopTab from '../Common/TopTab';
import Authors from '../Common/Authors';
import PopupMenu from '../Common/PopupMenu';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';

import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { AuthorsContext } from '../../context/AuthorsContext';
import { getCourseById, getCoursesByAuthor } from '../../core/services/courses-service';


import DATA from '../../mocks/detail.json'
import { ScrollView } from 'react-native-gesture-handler';

const CourseDetailScreen = ({ route, navigation }) => {
  const { authentication: { isAuthenticated } } = useContext(AuthContext);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { authors } = useContext(AuthorsContext);

  const tabs = ['INFORMATION', 'LECTURES'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [videoUrl, setVideoUrl] = useState('https://www.radiantmediaplayer.com/media/bbb-360p.mp4');

  const { courseId } = route.params;
  const course = getCourseById(courseId);
  const courseAuthors = course.authorIds.map(id => authors.find(a => a.id === id));

  let isBookmarked, isFavorite;
  if (isAuthenticated) {
    isBookmarked = userInfo.bookmarkedCourses.includes(courseId);
    isFavorite = userInfo.favoriteCourses.includes(courseId);
  }

  const onHandleBookmark = () => {
    if (isBookmarked) {
      setUserInfo({
        ...userInfo,
        bookmarkedCourses: userInfo.bookmarkedCourses.filter(cId => cId !== courseId)
      })
    } else {
      setUserInfo({
        ...userInfo,
        bookmarkedCourses: userInfo.bookmarkedCourses.concat(courseId)
      })
    }
  };

  const onHandleFavorite = () => {
    if (isFavorite) {
      setUserInfo({
        ...userInfo,
        favoriteCourses: userInfo.favoriteCourses.filter(cId => cId !== courseId)
      })
    } else {
      setUserInfo({
        ...userInfo,
        favoriteCourses: userInfo.favoriteCourses.concat(courseId)
      })
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderReadMoreFooter = (text, handlePress) => (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.readmore}>{text}</Text>
    </TouchableOpacity>
  );

  const onPressAuthor = (authorId) => {
    const author = courseAuthors.find(a => a.id === authorId);
    const data = getCoursesByAuthor(authorId);

    navigation.navigate(ScreenKey.BrowseCoursesScreen, {
      screenDetail: ScreenKey.BrowseCourseDetailScreen,
      subject: `${author.name}'s courses`,
      data: data
    });
  };

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
        {/* <Text style={styles.heading}>Course Content</Text> */}
        <TopTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        {(activeTab === tabs[0]) &&
          <ScrollView style={styles.infoContainer} showsVerticalScrollIndicator={false}>
            {
              isAuthenticated &&
              <View style={styles.activityContainer}>
                <TouchableOpacity style={{ ...styles.buttonInfo, backgroundColor: isBookmarked ? Colors.tintColor : '#fff' }} onPress={onHandleBookmark}>
                  <Text style={{ color: isBookmarked ? '#fff' : Colors.tintColor }}>{isBookmarked ? 'Unbookmark' : 'Bookmark'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.buttonInfo, backgroundColor: isFavorite ? Colors.tintColor : '#fff' }} onPress={onHandleFavorite}>
                  <Text style={{ color: isFavorite ? '#fff' : Colors.tintColor }}>{isFavorite ? 'Unfavorite' : 'Favorite'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.buttonInfo }} onPress={onShare}>
                  <Text style={styles.buttonText}>Share</Text>
                </TouchableOpacity>
              </View>
            }
            <Text style={styles.infoLabel}>Overview</Text>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={handlePress =>
                renderReadMoreFooter('Read more', handlePress)
              }
              renderRevealedFooter={handlePress =>
                renderReadMoreFooter('Read less', handlePress)
              }
            >
              <Text style={styles.infoValue}>{course.description}</Text>
            </ReadMore>
            <Text style={styles.infoLabel}>Level</Text>
            <Text style={styles.infoValue}>{course.level}</Text>
            <Text style={styles.infoLabel}>Data release</Text>
            <Text style={styles.infoValue}>{course.dateRelease}</Text>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{course.duration}</Text>
            <Text style={styles.infoLabel}>Authors</Text>
            <Authors authors={courseAuthors} onPress={onPressAuthor} />
          </ScrollView>
        }
        {
          (DATA.length > 0) && (activeTab === tabs[1]) &&
          <SectionList
            style={styles.list}
            showsVerticalScrollIndicator={false}
            sections={DATA}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item }) => renderItem(item)}
            renderSectionHeader={({ section: { title } }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, backgroundColor: '#D3D3D3' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
                <PopupMenu style={styles.itemOption} item={{ title }} colorDot='black' />
              </View>
            )}
          />
        }
      </View>
    </View >
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
  /* Info  */
  activityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonInfo: {
    flex: 1,
    // paddingHorizontal: 10, // flex
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.tintColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    // color: Colors.tintColor,
  },
  infoContainer: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginTop: 10
  },
  infoLabel: {
    color: Colors.tintColor,
    opacity: 0.8,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 20
  },
  infoValue: {
    color: 'black',
    opacity: 0.8,
    fontSize: 16,
    fontWeight: "500"
  },
  readmore: {
    color: Colors.tintColor,
    marginTop: 5,
    textAlign: 'right'
  },
  /* Lectures */
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
    fontSize: 16,
    fontWeight: '500',
    color: 'black'
  },
  itemOption: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
