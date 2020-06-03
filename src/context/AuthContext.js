import React, { useState } from 'react'

const AuthContext = React.createContext();

const AuthenticationProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState({});

  return (
    <AuthContext.Provider value={{ authentication, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthenticationProvider };
