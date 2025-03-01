import React, { useContext } from 'react';
import { LanguageContext } from '../App';  // Import the LanguageContext

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);  // Get the language and setter from context

  return (
    <button
      onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}  // Toggle between 'fr' and 'en'
      className={`px-5 py-2 rounded ${
        language === 'fr'
          ? 'bg-dark text-light border border-light'  // French selected
          : 'bg-light text-dark border border-dark'   // English selected
      }`}
    >
      {language === 'fr' ? 'Français' : 'English'}  {/* Button text changes based on selected language */}
    </button>
  );
};

export default LanguageToggle;
