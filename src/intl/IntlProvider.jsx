import { createContext, useContext, useState } from 'react';
import messages from './messages';
import { IntlProvider } from 'react-intl';

const LocaleContext = createContext();

//
// Custom hook for usage in functional components.
//
export const useLocale = () => useContext(LocaleContext);

const Intl = ({ children }) => {
  const [locale, setLocale] = useState(
    navigator.language.split('-')[0] === 'pt' ? 'pt-BR' : 'es-ES',
  );

  return (
    <IntlProvider locale={locale} messages={messages[locale]} key={locale}>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        {children}
      </LocaleContext.Provider>
    </IntlProvider>
  );
};

export default Intl;
