import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 1);
  const productsPerPage = 6;
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.daaif.net/products?page=${page}&limit=${productsPerPage}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / productsPerPage)); // Calculate total pages
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  const reloadProducts = () => {
    fetchProducts(currentPage); 
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination
  const nextPage = () => { if (currentPage < totalPages) setCurrentPage((prev) => prev + 1) }
  const previousPage = () => { if (currentPage > 1) setCurrentPage((prev) => prev - 1) }

  return { 
    products, 
    loading, 
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    reloadProducts,
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
    currentPage,
    nextPage,
    previousPage,
    totalPages 
  };
};

export default useProductSearch;