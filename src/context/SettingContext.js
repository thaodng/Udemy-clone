import React, { useState } from 'react';

/*userSettings: [{id: string, label: string, value: boolean}]*/
const SettingContext = React.createContext();

const SettingProvider = ({ children }) => {
  const [userSettings, setUserSettings] = useState([]);

  return (
    <SettingContext.Provider value={{ userSettings, setUserSettings }}>
      {children}
    </SettingContext.Provider>
  )
}

export { SettingContext, SettingProvider };
