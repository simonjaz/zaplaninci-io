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
    <div className="app-layout">
      <div className="sidebar">
        <img
          src="./avatar.png"
          alt="Zaplaninci Avatar"
          className="profile-img"
          onError={(e) => {
            e.target.src = 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/b7bb7aa4f66a7bfaec0ed556bac2baef.png'
          }}
        />
      </div>
      <div className="main-content">
        <h1 className="title">Zaplaninci_io</h1>
        <SearchBar onAddFavorite={handleAddFavorite} />
        <FavoritesGrid favorites={favorites} onRemoveOption={handleRemoveFavorite} />
        <footer className="footer">
          Designed by Lenart Jazbar
        </footer>
      </div>
    </div>
  );
}

export default App;
