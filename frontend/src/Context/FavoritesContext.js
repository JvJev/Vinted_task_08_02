import React, { createContext, useReducer } from 'react';

const initialState = {
  favoritePhotos: [],
};

const FavoritesContext = createContext(initialState);

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favoritePhotos: [...state.favoritePhotos, action.payload],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favoritePhotos: state.favoritePhotos.filter(photo => photo.id !== action.payload.id),
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favoritePhotos: action.payload,
      };
    default:
      return state;
  }
};

const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };
