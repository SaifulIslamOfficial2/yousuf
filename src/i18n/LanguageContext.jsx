// lang switch - bn/en toggle

import { createContext, useContext, useEffect, useState } from "react";
import translations from "./translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("yousuf_lang") || "en";
  });

  const t = translations[lang] || translations["en"];

  const toggleLang = () => {
    const next = lang === "bn" ? "en" : "bn";
    setLang(next);
    localStorage.setItem("yousuf_lang", next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
