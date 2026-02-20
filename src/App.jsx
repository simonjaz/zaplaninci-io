import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { FavoritesGrid } from './components/FavoritesGrid';
import { getFavorites, saveFavorites, toggleFavorite } from './lib/storage';
import './index.css';

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleAddFavorite = (newFavorite) => {
    const updated = toggleFavorite(newFavorite, favorites);
    setFavorites(updated);
  };

  const handleRemoveFavorite = (id) => {
    const updated = toggleFavorite({ id }, favorites);
    setFavorites(updated);
  };

  return (
    <div>
      <h1 className="title">Zaplaninci_io</h1>
      <SearchBar onAddFavorite={handleAddFavorite} />
      <FavoritesGrid favorites={favorites} onRemoveOption={handleRemoveFavorite} />
    </div>
  );
}

export default App;
