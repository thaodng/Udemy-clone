class CourseDetail {
  constructor({
    id,
    courseId,
    sectionTitle,
    data, // [{id, title, duration, videoUrl}]
  }) {
    this.id = id;
    this.courseId = courseId;
    this.sectionTitle = sectionTitle
    this.data = data;
  }
}

export default CourseDetail;
