import React, { useState } from 'react';

/* userInfo: {
  "id": "22c966c7-969c-433f-8c63-1be0a3de3e89",
  "email": "ngduythao2805@outlook.com",
  "avatar": "https://storage.googleapis.com/itedu-bucket/Avatar/3ba56ec9-297c-41e4-b9af-c6ec66a46f82.jpg",
  "name": "Thao D.Nguyen",
  "favoriteCategories": [],
  "point": 0,
  "phone": "0933123456",
  "type": "STUDENT",
  "isDeleted": false,
  "isActivated": true,
  "createdAt": "2020-08-07T06:55:41.265Z",
  "updatedAt": "2020-08-07T14:16:39.676Z"
}
*/


const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };
