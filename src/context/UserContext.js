import React, { useState } from 'react';

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
