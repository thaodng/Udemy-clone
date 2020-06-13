import React, { useState } from 'react'


/*authors: [{id, name, email, phone, address, avatar}]*/
const AuthorsContext = React.createContext();

const AuthorsProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);

  return (
    <AuthorsContext.Provider value={{ authors, setAuthors }}>
      {children}
    </AuthorsContext.Provider>
  )
}

export { AuthorsContext, AuthorsProvider };
