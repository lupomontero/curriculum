import { createContext, useContext, useEffect, useState } from 'react';
import messages from './messages';
import { IntlProvider } from 'react-intl';
import { useApp } from '../lib/app';
import Loading from '../components/Loading';

const LocaleContext = createContext();

//
// Custom hook for usage in functional components.
//
export const useLocale = () => useContext(LocaleContext);

const Intl = ({ children }) => {
  const { auth } = useApp();
  const [locale, setLocale] = useState();

  useEffect(() => {
    if (auth.user && !auth.profile) {
      return;
    }

    const profileLocale = (auth.profile || {}).locale;
    setLocale(
      ['es-ES', 'pt-BR'].includes(profileLocale)
        ? profileLocale
        : navigator.language.split('-')[0] === 'pt'
          ? 'pt-BR'
          : 'es-ES'
    )
  }, [auth]);

  if (!locale) {
    return <Loading />;
  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]} key={locale}>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        {children}
      </LocaleContext.Provider>
    </IntlProvider>
  );
};

export default Intl;
