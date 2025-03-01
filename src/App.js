import React, { createContext, useState } from "react";
import ProductList from "./components/ProductList";
import ProductSearch from "./components/ProductSearch";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from './components/LanguageToggle';
import useLocalStorage from './hooks/useLocalStorage';
// TODO: Exercice 2.1 - Créer le LanguageContext
export const LanguageContext = createContext();
export const ThemeContext = createContext();


const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage('theme', false);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // TODO: Exercice 2.2 - Ajouter l'état pour la langue
  const [language, setLanguage] = useLocalStorage('language', 'fr');
  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {/* TODO: Exercice 2.1 - Wrapper avec LanguageContext.Provider */}
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <div
          className={`container ${
            isDarkTheme ? "bg-dark text-light" : "bg-light"
          }`}
        >
          <header className="my-4">
            <h1 className="text-center">Catalogue de Produits</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              {/* TODO: Exercice 2.2 - Ajouter le sélecteur de langue */}
              <LanguageToggle />
            </div>
          </header>
          <main>
            <ProductSearch onSearch={handleSearch} />
            <ProductList searchQuery={searchQuery} />
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
