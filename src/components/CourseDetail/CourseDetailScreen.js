import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet, Text, View, Dimensions,
  TouchableOpacity, SectionList, Share,
  ActivityIndicator
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Video } from 'expo-av';
import ReadMore from 'react-native-read-more-text';


import TopTab from '../Common/TopTab';
import Authors from '../Common/Authors';
import PopupMenu from '../Common/PopupMenu';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';
import ListCourses from '../ListCourses/ListCourses';

import { Context as AuthContext } from '../../context/AuthContext';
import { SettingContext } from '../../context/SettingContext';
import { AuthorsContext } from '../../context/AuthorsContext';

import { getCourseDetailById } from '../../core/services/courses-service';


const CourseDetailScreen = ({ route, navigation }) => {
  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  const { state: { isAuthenticated } } = useContext(AuthContext);
  // const { userInfo, setUserInfo } = useContext(UserContext);
  const { authors } = useContext(AuthorsContext);

  const tabs = ['INFOR', 'LECTURES', 'QUESTIONS', 'RATINGS'];

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [course, setCourse] = useState({});
  const [courseAuthor, setCourseAuthor] = useState({});
  const [sections, setSections] = useState([]);
  const [currentItem, setCurrentItem] = useState({});

  const { courseId, screenDetail } = route.params;

  useEffect(() => {
    const loadCourse = async () => {
      const { message, payload } = await getCourseDetailById({ id: courseId });
      if (message === 'OK') {
        setCourse(payload);

        setCurrentItem({
          id: 1,
          videoUrl: 'https://storage.googleapis.com/itedu-bucket/Courses/24b1856a-953c-419b-84c5-a9ef44bc139e/promo/9a1c3c44-c7e3-4080-965b-ca9650f8b92d.mp4'
        })

        const author = authors.find(a => a.id === payload.instructorId);
        setCourseAuthor(author);

        for (let i = 0; i < payload.section.length; i++) {
          payload.section[i].data = payload.section[i].lesson;
          delete payload.section[i].lesson;
        }

        setSections(payload.section);

      } else {
        console.log('Error');
      };
    }

    setLoading(true);
    loadCourse();
    setLoading(false);

  }, []);

  let isBookmarked, isFavorite;
  // if (isAuthenticated) {
  //   isBookmarked = userInfo.bookmarkedCourses.includes(courseId);
  //   isFavorite = userInfo.favoriteCourses.includes(courseId);
  // }

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

  const onPressAuthor = () => {
    navigation.navigate(ScreenKey.BrowseCoursesScreen, {
      screenDetail: ScreenKey.BrowseCourseDetailScreen,
      subject: `${courseAuthor.name}'s courses`,
      data: courseAuthor
    });
  };

  const renderItem = ({ id, name, hours, videoUrl }) => {

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => setCurrentItem({ id, videoUrl })}
      >
        <Text style={{ ...styles.numHead, color: id === currentItem.id ? Colors.tintColor : Colors.lightGray }}>{'.'}</Text>
        <View style={styles.itemBody}>
          <Text style={{ ...styles.itemTime, color: id === currentItem.id ? Colors.tintColor : Colors.lightGray }}>{hours * 60} phút</Text>
          <Text style={{ ...styles.itemTitle, color: id === currentItem.id ? Colors.tintColor : txColor }}>{name}</Text>
        </View>

        {/* <PopupMenu style={styles.itemOption} item={{ id, title, hours, videoUrl }} colorDot={id === currentItem.id ? Colors.tintColor : txColor} /> */}
      </TouchableOpacity >
    )
  };


  return (
    <>
      {
        loading
          ? (<ActivityIndicator size="large" />)
          : (
            <View style={styles.courseContainer}>
              <Video
                source={{ uri: currentItem.videoUrl }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                useNativeControls
                style={styles.video}
              />
              <View style={styles.playlistContainer}>
                {/* <Text style={styles.heading}>Course Content</Text> */}
                <TopTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                {(activeTab === tabs[0]) &&
                  <ScrollView style={styles.infoContainer} showsVerticalScrollIndicator={false}>
                    {
                      <View style={styles.activityContainer}>
                        <TouchableOpacity style={{ ...styles.buttonInfo, backgroundColor: isBookmarked ? Colors.tintColor : bgColor }} onPress={onHandleBookmark}>
                          <Text style={{ color: isBookmarked ? txColor : Colors.tintColor }}>{isBookmarked ? 'Unbookmark' : 'Bookmark'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.buttonInfo, backgroundColor: isFavorite ? Colors.tintColor : bgColor }} onPress={onHandleFavorite}>
                          <Text style={{ color: isFavorite ? txColor : Colors.tintColor }}>{isFavorite ? 'Unfavorite' : 'Favorite'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.buttonInfo }} onPress={onShare}>
                          <Text style={{ color: Colors.tintColor }}>Share</Text>
                        </TouchableOpacity>
                      </View>
                    }
                    <Text style={styles.infoLabel}>Tổng quan</Text>
                    <ReadMore
                      numberOfLines={3}
                      renderTruncatedFooter={handlePress =>
                        renderReadMoreFooter('Read more', handlePress)
                      }
                      renderRevealedFooter={handlePress =>
                        renderReadMoreFooter('Read less', handlePress)
                      }
                    >
                      <Text style={{ ...styles.infoValue, color: txColor }}>{course.description}</Text>
                    </ReadMore>

                    <Text style={styles.infoLabel}>Yêu cầu</Text>
                    <Text style={{ ...styles.infoValue, color: txColor }}>{(course.requirement && course.requirement.length > 0) ? course.requirement[0] : 'Không yêu cầu kiến thức'}</Text>
                    <Text style={styles.infoLabel}>Ngày xuất bản</Text>
                    <Text style={{ ...styles.infoValue, color: txColor }}>{course.createdAt}</Text>
                    <Text style={styles.infoLabel}>Trạng thái</Text>
                    <Text style={{ ...styles.infoValue, color: txColor }}>{course.status === 'COMPLETED' ? 'Hoàn thành' : 'Đang được cập nhật'}</Text>
                    <Text style={styles.infoLabel}>Thời lượng</Text>
                    <Text style={{ ...styles.infoValue, color: txColor }}>{course.totalHours} giờ</Text>
                    <Text style={styles.infoLabel}>Tác giả</Text>
                    {
                      courseAuthor.id &&
                      <Authors direction="row" authors={[courseAuthor]} txColor={txColor} onPress={onPressAuthor} />
                    }
                    <Text style={styles.infoLabel}>Khoá học liên quan</Text>
                    <ListCourses
                      direction="row"
                      txColor={txColor}
                      bgColor={bgColor}
                      data={course.coursesLikeCategory}
                      screenDetail={screenDetail}
                    />
                  </ScrollView>
                }
                {
                  (sections.length > 0) && (activeTab === tabs[1]) &&
                  <SectionList
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => renderItem(item)}
                    renderSectionHeader={({ section: { name } }) => (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, backgroundColor: bgColor }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.lightGray }}>Chương: {name}</Text>
                        <PopupMenu style={styles.itemOption} item={{ title: name }} colorDot={Colors.lightGray} />
                      </View>
                    )}
                  />
                }
              </View>
            </View >
          )
      }
    </>
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
    fontSize: 15,
    fontWeight: '500',
    color: 'gray'
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black'
  },
  itemOption: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
