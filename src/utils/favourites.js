const KEY = "favourite_places";

export const getFavourites = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const isFavourite = (id) => {
  return getFavourites().includes(id);
};

export const toggleFavourite = (id) => {
  const favourites = getFavourites();

  const updated = favourites.includes(id)
    ? favourites.filter((fid) => fid !== id)
    : [...favourites, id];

  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
};
