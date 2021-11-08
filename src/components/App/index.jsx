import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../../lib/app';
import Loading from '../Loading';
import RoutesWithIntl from './RoutesWithIntl';
import './App.css';

const App = () => {
  const { auth } = useApp();
  const { user } = auth;
  const [defaulLocale, setDefaulLocale] = useState();

  useEffect(() => {
    if (typeof user === 'undefined') {
      return;
    }

    setDefaulLocale(
      ['es-ES', 'pt-BR'].includes(user?.locale)
        ? user.locale
        : navigator.language.split('-')[0] === 'pt'
          ? 'pt-BR'
          : 'es-ES'
    )
  }, [user]);

  if (!defaulLocale || typeof user === 'undefined') {
    return <Loading />;
  }

  const defaultLang = defaulLocale.split('-')[0];

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/${defaultLang}`} />}
          />
          <Route
            path="/:lang/*"
            element={<RoutesWithIntl defaultLang={defaultLang} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
