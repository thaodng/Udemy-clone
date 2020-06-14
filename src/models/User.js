// User: student, authors, v...
class User {
  constructor({
    id,
    name,
    email,
    phone,
    address,
    avatar,
    favoriteCourses,
    bookmarkedCourses
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.avatar = avatar;
    this.favoriteCourses = favoriteCourses;
    this.bookmarkedCourses = bookmarkedCourses;
  }
}

export default User;
