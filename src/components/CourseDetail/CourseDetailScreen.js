import React, { useState, useEffect, useContext, useRef } from 'react'
import {
  StyleSheet, Text, View, Dimensions,
  TouchableOpacity, SectionList, Share,
  ActivityIndicator, AsyncStorage
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import ReadMore from 'react-native-read-more-text';
import YoutubePlayer from 'react-native-youtube-iframe';

import TopTab from '../Common/TopTab';
import Authors from '../Common/Authors';
import PopupMenu from '../Common/PopupMenu';
import Colors from '../../constants/Colors';
import ScreenKey from '../../constants/ScreenKey';
import ListCourses from '../ListCourses/ListCourses';

import { Context as AuthContext } from '../../context/AuthContext';
import { SettingContext } from '../../context/SettingContext';
import { AuthorsContext } from '../../context/AuthorsContext';
import { CoursesContext } from '../../context/CoursesContext';
import { UserFavoriteContext } from '../../context/UserFavoriteContext';

import { getCourseDetailById } from '../../core/services/courses-service';
import { getLikeCourseStatus, postLikeCourse } from '../../core/services/favorite-service';
import { getLastWatchedLesson, getLessonVideo, updateCurrentTimeLesson } from '../../core/services/lessions-service';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxNjcxMDA4LWM4YzEtNGYwNC05Njk0LTcxMWU4MWQ5MjE2NSIsImlhdCI6MTU5NzUwODg0MSwiZXhwIjoxNTk3NTE2MDQxfQ.zLmDRu4K6smUTMg5vL5mz5scpc5yZtQHc5QSagtwSjs';

const CourseDetailScreen = ({ route, navigation }) => {
  const { userSettings } = useContext(SettingContext);
  const bgColor = userSettings[Colors.DarkTheme] ? Colors.darkBackground : Colors.lightBackground;
  const txColor = userSettings[Colors.DarkTheme] ? Colors.lightText : Colors.darkText;

  // const { state: { isAuthenticated, token } } = useContext(AuthContext);
  const { authors } = useContext(AuthorsContext);
  const { favoriteCourses, setFavoriteCourses } = useContext(UserFavoriteContext);
  const { downloadedCourses, setDownloadedCourses } = useContext(CoursesContext);

  const tabs = ['Thông tin', 'Bài giảng', 'Đánh giá'];

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [course, setCourse] = useState({});
  const [courseAuthor, setCourseAuthor] = useState({});
  const [sections, setSections] = useState([]);

  // {id, videoUrl, currentTime}
  const [currentVideo, setCurrentVideo] = useState({});

  // link youtube
  const playerRef = useRef(null);

  // link .mp4
  const playbackInstance = useRef(null);
  const handleVideoRef = (component) => {
    if (component) {
      playbackInstance.current = component;
    };
  }

  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [buttonDownload, setButtonDownload] = useState('Tải xuống');
  const [progressValue, setProgressValue] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  const { courseId, screenDetail } = route.params;


  useEffect(() => {
    const loadCourse = async () => {
      const { message, payload } = await getCourseDetailById({ id: courseId });
      if (message === 'OK') {
        setCourse(payload);

        // loading last watched lesson
        try {
          if (payload.typeUploadVideoLesson === 1) {
            const last = await getLastWatchedLesson({ courseId: courseId, token });
            if (last.message === 'OK') {
              last.payload['id'] = last.payload.lessonId;
              delete last.payload.lessonId;
              setCurrentVideo(last.payload);
            } else {
              setCurrentVideo({ id: payload.id, videoUrl: payload.promoVidUrl });
            }
          } else {
            const last = await getLastWatchedLesson({ courseId: courseId, token });
            if (last.message === 'OK') {
              last.payload['id'] = last.payload.lessonId;
              last.payload['videoUrl'] = last.payload.videoUrl.substring(last.payload.videoUrl.lastIndexOf('/') + 1);
              delete last.payload.lessonId;
              setCurrentVideo(last.payload);
            } else {
              setCurrentVideo({ id: last.payload.id, videoUrl: '7beJYPZefyE' }); // VERY VERY BAD CODE
            }
          };

        } catch (error) {
          console.log(error.message);
        }

        const { likeStatus } = await getLikeCourseStatus({ token, courseId });
        setIsFavorite(likeStatus);

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

    // lưu lại vị trí đang xem, hàm này được gọi khi mình di chuyển sang màn hình khác
    // return () => {
    //   saveCurrentVideo();
    // };

  }, []);


  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const downloadVideo = async ({ videoUrl, name }) => {

    const callback = downloadProgress => {
      setTotalSize(formatBytes(downloadProgress.totalBytesExpectedToWrite))

      let progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      progress = progress.toFixed(2) * 100
      setProgressValue(progress.toFixed(0))
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      videoUrl,
      `${FileSystem.documentDirectory}${name}`,
      {},
      callback
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished download video: ', uri);
    } catch (e) {
      console.error(e);
    }
  }

  const onHandleDownload = async () => {
    setButtonDownload('Đang tải xuống');

    // kiểm tra đã download hay chưa
    const downloaded = downloadedCourses.map(dc => dc.id).includes(course.id);

    if (downloaded) {
      setButtonDownload('Đã tải xuống');
      return;
    }

    // tiến hành download videos
    const arrayDownloadVideos = [];

    for (let i = 0; i < course.section.length; i++) {
      const s = course.section[i];
      for (let j = 0; j < s.lesson.length; j++) {
        const lesson = s.lesson[j];
        if (lesson.videoUrl) {

          // thêm video để chuẩn bị tải
          arrayDownloadVideos.push(downloadVideo({ videoUrl: lesson.videoUrl, name: lesson.name }));

          // đổi lại đường dẫn video thành đường dẫn local
          s.lesson[j].videoUrl = `${FileSystem.documentDirectory}${lesson.name}`;
        }
      }
    }

    await Promise.all(arrayDownloadVideos);

    const newDownloadedCourses = [...downloadedCourses, course];

    // thêm mới khoá đã tải vào storage
    await AsyncStorage.setItem('downloadedCourses', JSON.stringify(newDownloadedCourses));

    // cập nhật state
    setDownloadedCourses(newDownloadedCourses);

    setButtonDownload('Đã tải xuống');
  };

  const onHandleFavorite = async () => {
    const { message, likeStatus } = await postLikeCourse({ token, courseId });
    if (message === 'OK') {
      setIsFavorite(likeStatus);
      if (likeStatus) {
        setFavoriteCourses([...favoriteCourses, course]);
      } else {
        setFavoriteCourses(favoriteCourses.filter(c => c.id !== course.id));
      }
    }
  };


  const onShare = async () => {
    try {
      const result = await Share.share({
        message: course.name
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
    // navigation.navigate(ScreenKey.BrowseCoursesScreen, {
    //   screenDetail: ScreenKey.BrowseCourseDetailScreen,
    //   subject: `${courseAuthor.name}'s courses`,
    //   data: courseAuthor
    // });
  };


  // hàm lưu lại vị trí video đang xem
  const saveCurrentVideo = async () => {
    try {
      if (course.typeUploadVideoLesson === 1) {
        // code update currentTime nếu link là .mp4
        const { positionMillis } = await playbackInstance.current.getStatusAsync();
        await updateCurrentTimeLesson({ lessonId: currentVideo.id, currentTime: positionMillis, token });
      } else {
        // code update currentTime nếu link là youtube
        const currentTime = await playerRef.current.getCurrentTime();
        await updateCurrentTimeLesson({ lessonId: currentVideo.id, currentTime, token });
      }
    } catch (error) {
      alert(error.message);
    }
  }


  // khi click vào xem 1 video khác
  const onPressVideo = (id) => {

    // lưu lại vị trí video cũ
    saveCurrentVideo();

    // load video khác
    let url;
    const getVideo = async () => {
      const { message, payload } = await getLessonVideo({ courseId: course.id, lessonId: id, token });
      if (message === 'OK') {
        if (course.typeUploadVideoLesson === 1) {
          url = payload.videoUrl;
        } else {
          url = payload.videoUrl.substring(payload.videoUrl.lastIndexOf('/') + 1);
        }
        setCurrentVideo({ id, videoUrl: url, currentTime: payload.currentTime });
      }
    };

    getVideo();
  };

  const onReady = () => {
    const seek = async () => {
      await playerRef.current.seekTo(currentVideo.currentTime);
    }
    seek();
  };


  const renderItem = ({ id, name, hours }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => onPressVideo(id)}
      >
        <Text style={{ ...styles.numHead, color: id === currentVideo.id ? Colors.tintColor : Colors.lightGray }}>{'.'}</Text>
        <View style={styles.itemBody}>
          <Text style={{ ...styles.itemTime, color: id === currentVideo.id ? Colors.tintColor : Colors.lightGray }}>{Number((hours * 60).toFixed(1))} phút</Text>
          <Text style={{ ...styles.itemTitle, color: id === currentVideo.id ? Colors.tintColor : txColor }}>{name}</Text>
        </View>

        <PopupMenu style={styles.itemOption} item={{ id, name, hours }} colorDot={id === currentVideo.id ? Colors.tintColor : txColor} />
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
              {
                course.typeUploadVideoLesson === 1
                  ? (
                    <Video
                      source={{ uri: currentVideo.videoUrl }}
                      ref={handleVideoRef}
                      // positionMillis={currentVideo.currentTime ? currentVideo.currentTime : 0}
                      rate={1.0}
                      volume={1.0}
                      isMuted={false}
                      resizeMode="cover"
                      isLooping
                      shouldPlay
                      useNativeControls
                      style={styles.video}
                    />
                  )
                  : (
                    <YoutubePlayer
                      ref={playerRef}
                      height={height / 3}
                      width={width}
                      videoId={currentVideo.videoUrl}
                      play={true}
                      onReady={onReady}
                      volume={50}
                      playbackRate={1}
                      initialPlayerParams={{
                        cc_lang_pref: "us",
                        showClosedCaptions: true
                      }}
                    />
                  )
              }

              <View style={styles.playlistContainer}>
                {/* <Text style={styles.heading}>Course Content</Text> */}
                <TopTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                {(activeTab === tabs[0]) &&
                  <ScrollView style={styles.infoContainer} showsVerticalScrollIndicator={false}>
                    {
                      <View style={styles.activityContainer}>
                        <TouchableOpacity style={{ ...styles.buttonInfo, backgroundColor: isDownloaded ? Colors.tintColor : bgColor }} onPress={onHandleDownload}>
                          <Text style={{ color: isDownloaded ? txColor : Colors.tintColor }}>{buttonDownload}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.buttonInfo, backgroundColor: isFavorite ? Colors.tintColor : bgColor }} onPress={onHandleFavorite}>
                          <Text style={{ color: isFavorite ? txColor : Colors.tintColor }}>{isFavorite ? 'Bỏ thích' : 'Yêu thích'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.buttonInfo }} onPress={onShare}>
                          <Text style={{ color: Colors.tintColor }}>Chia sẽ</Text>
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
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderItem(item)}
                    renderSectionHeader={({ section: { name } }) => (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, backgroundColor: bgColor }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.lightGray }}>Chương: {name}</Text>
                        {<PopupMenu style={styles.itemOption} item={{ title: name }} colorDot={Colors.lightGray} />}
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
