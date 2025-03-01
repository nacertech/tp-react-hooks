import React, { useContext } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = ({ searchQuery }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext pour les traductions
  const { language } = useContext(LanguageContext);  
  const translations = {
    fr: {
      loading: "Chargement...",
      error: "Erreur",
    },
    en: {
      loading: "Loading...",
      error: "Error",
    },
  };

  const { 
    products, 
    loading, 
    error,
    // TODO: Exercice 4.1 - Récupérer la fonction de rechargement
    // TODO: Exercice 4.2 - Récupérer les fonctions et états de pagination
  } = useProductSearch();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{translations[language].loading}</span> {/* Traduction du texte */}
      </div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger" role="alert">
      {translations[language].error}: {error}  {/* Traduction du texte */}
    </div>
  );
  
  return (
    <div>
      {/* TODO: Exercice 4.1 - Ajouter le bouton de rechargement */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Prix: </strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* TODO: Exercice 4.2 - Ajouter les contrôles de pagination */}
      {/* Exemple de structure pour la pagination :
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button className="page-link" onClick={previousPage}>
              Précédent
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              Page {currentPage} sur {totalPages}
            </span>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              Suivant
            </button>
          </li>
        </ul>
      </nav>
      */}
    </div>
  );
};

export default ProductList;