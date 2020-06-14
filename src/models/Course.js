class Course {
  constructor({
    id,
    categoryId,
    authorIds,
    title,
    thumbnail,
    level,
    dateRelease,
    duration,
    description,
    rating,
    reviews }) {
    this.id = id;
    this.categoryId = categoryId;
    this.authorIds = authorIds;
    this.title = title;
    this.thumbnail = thumbnail;
    this.level = level;
    this.dateRelease = dateRelease;
    this.description = description;
    this.duration = duration;
    this.rating = rating;
    this.reviews = reviews;
  }
}

export default Course;
