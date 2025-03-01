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
      reload: "Recharger",
      previous: "Précédent",
      next: "Suivant",
      page: "Page"
    },
    en: {
      loading: "Loading...",
      error: "Error",
      reload: "Reload",
      previous: "Previous",
      next: "Next",
      page: "Page"
    },
  };

  const { 
    products, 
    loading, 
    error,
    // TODO: Exercice 4.1 - Récupérer la fonction de rechargement
    reloadProducts,
    // TODO: Exercice 4.2 - Récupérer les fonctions et états de pagination
    currentPage,
    nextPage,
    previousPage,
    totalPages
  } = useProductSearch();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{translations[language].loading}</span>
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
      <div className="text-center mb-4">
        <button 
          onClick={reloadProducts} 
          className="px-4 py-2 text-light border border-black text-black rounded"
        >
          {translations[language].reload}
        </button>
      </div>

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
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={previousPage}>
              {translations[language].previous}
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              {translations[language].page} {currentPage} / {totalPages}
            </span>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={nextPage}>
              {translations[language].next}
            </button>
          </li>
        </ul>
      </nav>
     
    </div>
  );
};

export default ProductList;