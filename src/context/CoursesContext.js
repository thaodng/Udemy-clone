import React, { useState } from 'react'

const CoursesContext = React.createContext();

const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  return (
    <CoursesContext.Provider value={{ courses, setCourses }}>
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