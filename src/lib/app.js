import { createContext, useContext, useEffect, useState } from 'react';
import { createAuth } from '@laboratoria/sdk-js/auth';
import { createClient } from '@laboratoria/sdk-js/client';
import Loading from '../components/Loading';


const {
  REACT_APP_LABORATORIA_API_URL,
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_PROJECT,
} = process.env;


const auth = createAuth({
  firebaseApiKey: REACT_APP_FIREBASE_API_KEY,
  firebaseProject: REACT_APP_FIREBASE_PROJECT,
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
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [cohorts, setCohorts] = useState();

  useEffect(() => auth.onChange((user) => {
    if (!user) {
      setUser(null);
      setProfile(null);
      setCohorts(null);
      return;
    }
    setUser(user);
  }), []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const client = createClient(REACT_APP_LABORATORIA_API_URL, user);

    Promise.all([
      client('/me'),
      client(`/users/${user.uid}/cohorts`),
    ])
      .then(([profile, cohorts]) => {
        setProfile(profile);
        setCohorts(cohorts);
      })
      .catch(console.error);
  }, [user]);

  const app = {
    auth: {
      user,
      profile,
      cohorts,
      activeCohorts: cohorts?.filter(
        ({ end, name }) => new Date(end) >= Date.now() && name !== 'coaches',
      ),
      signIn: credentials => auth.signIn(credentials),
      signOut: () => auth.signOut(),
    },
    client: createClient(REACT_APP_LABORATORIA_API_URL, user),
  };

  // If auth not ready...
  if (typeof user === 'undefined') {
    return <Loading />;
  }

  // console.log(user);
  // console.log(profile);

  return (
    <AppContext.Provider value={app}>
      {children}
    </AppContext.Provider>
  );
};
