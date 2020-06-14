import React, { useState } from 'react';

/*userSettings: {label: value}*/
const SettingContext = React.createContext();

const SettingProvider = ({ children }) => {
  const [userSettings, setUserSettings] = useState({});

  return (
    <SettingContext.Provider value={{ userSettings, setUserSettings }}>
      {children}
    </SettingContext.Provider>
  )
}

export { SettingContext, SettingProvider };
