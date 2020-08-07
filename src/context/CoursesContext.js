import React, { useState } from 'react'

const CoursesContext = React.createContext();

const CoursesProvider = ({ children }) => {
  const [newCourses, setNewCourses] = useState([]);
  const [topRateCourses, setTopRateCourses] = useState([]);

  return (
    <CoursesContext.Provider value={{ newCourses, setNewCourses, topRateCourses, setTopRateCourses }}>
      {children}
    </CoursesContext.Provider>
  )
}

export { CoursesContext, CoursesProvider };
/*courses: [
    { id,
      categoryId,
      authorIds,
      title,
      thumbnail,
      level,
      dateRelease,
      duration,
      description,
      rating,
      reviews,
      isFavorited,
      isBookmarked
    }
  ]
*/