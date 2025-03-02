import React, { useContext } from 'react';
import { LanguageContext } from '../App';  // Import the LanguageContext

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);  // Get the language and setter from context

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="px-5 py-2 rounded border focus:outline-none ring-1 ring-primary"
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  );
};

export default LanguageToggle;