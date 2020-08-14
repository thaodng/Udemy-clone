import {
  getApiWithToken,
  postApiWithToken,
  putApiWithToken
} from '../api';

import {
  getLessonDetailUrl,
  getLessonVideoUrl,
  updateLessonStatusUrl,
  updateCurrentTimeLessonUrl
} from '../api/domain';

const getLessonDetail = ({ courseId, lessonId, token }) => getApiWithToken(getLessonDetailUrl(courseId, lessonId), token);
const getLessonVideo = ({ courseId, lessonId, token }) => getApiWithToken(getLessonVideoUrl(courseId, lessonId), token);
const updateLessonStatus = ({ lessonId, token }) => postApiWithToken(updateLessonStatusUrl, token, { lessonId });
const updateCurrentTimeLesson = ({ lessionId, currentTime, token }) => putApiWithToken(updateCurrentTimeLessonUrl, token, { lessionId, currentTime });

export {
  getLessonDetail,
  getLessonVideo,
  updateLessonStatus,
  updateCurrentTimeLesson
};
