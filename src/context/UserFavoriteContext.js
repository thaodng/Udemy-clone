import React, { useState } from 'react';

const UserFavoriteContext = React.createContext();

const UserFavoriteProvider = ({ children }) => {
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  return (
    <UserFavoriteContext.Provider value={{ favoriteCourses, setFavoriteCourses }}>
      {children}
    </UserFavoriteContext.Provider>
  )
}

export { UserFavoriteContext, UserFavoriteProvider };
