import React, { useState } from 'react'

const CoursesContext = React.createContext();

const CoursesProvider = ({ children }) => {
  const [newCourses, setNewCourses] = useState([]);
  const [topRateCourses, setTopRateCourses] = useState([]);
  const [downloadedCourses, setDownloadedCourses] = useState([])
  const [myCourses, setMyCourses] = useState([]);

  return (
    <CoursesContext.Provider
      value={{
        newCourses,
        setNewCourses,
        topRateCourses,
        setTopRateCourses,
        downloadedCourses,
        setDownloadedCourses,
        myCourses,
        setMyCourses
      }}>

      {children}

    </CoursesContext.Provider>
  )
}

export { CoursesContext, CoursesProvider };
