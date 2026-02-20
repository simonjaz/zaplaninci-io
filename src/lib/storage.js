export const getFavorites = () => {
  try {
    const data = localStorage.getItem('zaplaninci_favorites');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load favorites', error);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem('zaplaninci_favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites', error);
  }
};

export const toggleFavorite = (lobbyInput, currentFavorites) => {
  // lobbyInput: { id, name, type, url, imageUrl }
  const exists = currentFavorites.find(f => f.id === lobbyInput.id);
  let newFavorites;
  if (exists) {
    newFavorites = currentFavorites.filter(f => f.id !== lobbyInput.id);
  } else {
    newFavorites = [...currentFavorites, lobbyInput];
  }
  saveFavorites(newFavorites);
  return newFavorites;
};
