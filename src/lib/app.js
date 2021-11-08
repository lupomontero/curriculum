import { createContext, useContext, useEffect, useState } from 'react';
import { createApp } from '@laboratoria/sdk-js';


const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_PROJECT,
  REACT_APP_LABORATORIA_CORE_API_URL,
  REACT_APP_LABORATORIA_TEAM_API_URL,
} = process.env;


const app = createApp({
  firebaseApiKey: REACT_APP_FIREBASE_API_KEY,
  firebaseProject: REACT_APP_FIREBASE_PROJECT,
  coreApiUrl: REACT_APP_LABORATORIA_CORE_API_URL,
  teamApiUrl: REACT_APP_LABORATORIA_TEAM_API_URL,
});


const AppContext = createContext();


//
// Custom hook for usage in functional components.
//
export const useApp = () => useContext(AppContext);

//
// App Context Provider to be wrapped around the whole App.
//
export const AppProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState();
  const [user, setUser] = useState();

  useEffect(() => app.auth.onChange(({ authUser, user }) => {
    if (!authUser) {
      setAuthUser(null);
      setUser(null);
      return;
    }
    console.log(user);
    setAuthUser(authUser);
    setUser(user);
  }), []);

  return (
    <AppContext.Provider value={{
      ...app,
      auth: {
        ...app.auth,
        authUser,
        user,
      },
    }}>
      {children}
    </AppContext.Provider>
  );
};
