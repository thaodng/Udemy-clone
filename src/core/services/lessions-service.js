import {
  getApiWithToken,
  postApiWithToken,
  putApiWithToken
} from '../api';

import {
  getLastWatchedLessonUrl,
  getLessonDetailUrl,
  getLessonVideoUrl,
  updateLessonStatusUrl,
  updateCurrentTimeLessonUrl
} from '../api/domain';

const getLastWatchedLesson = ({ courseId, token }) => getApiWithToken(getLastWatchedLessonUrl(courseId), token);
const getLessonDetail = ({ courseId, lessonId, token }) => getApiWithToken(getLessonDetailUrl(courseId, lessonId), token);
const getLessonVideo = ({ courseId, lessonId, token }) => getApiWithToken(getLessonVideoUrl(courseId, lessonId), token);
const updateLessonStatus = ({ lessonId, token }) => postApiWithToken(updateLessonStatusUrl, token, { lessonId });
const updateCurrentTimeLesson = ({ lessonId, currentTime, token }) => putApiWithToken(updateCurrentTimeLessonUrl, token, { lessonId, currentTime });


export {
  getLastWatchedLesson,
  getLessonDetail,
  getLessonVideo,
  updateLessonStatus,
  updateCurrentTimeLesson
};
