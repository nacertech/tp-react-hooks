import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import useDebounce from '../hooks/useDebounce';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const { isDarkTheme } = useContext(ThemeContext);

  

  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  const { language } = useContext(LanguageContext);

  const translations = {
    fr: {
      placeholder: "Rechercher un produit...",
    },
    en: {
      placeholder: "Search for a product...",
    },
  };

  const placeholderText = translations[language].placeholder;
  
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholderText}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;