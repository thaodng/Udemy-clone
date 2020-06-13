import React, { useState } from 'react'


/*categories: [{id, title}]*/
const CategoriesContext = React.createContext();

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export { CategoriesContext, CategoriesProvider };
