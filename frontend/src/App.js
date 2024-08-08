import React, { useState } from 'react';
import MainPage from './Pages/MainPage';
import GlobalContext from './Context/GlobalContext';
import { FavoritesProvider } from './Context/FavoritesContext';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <GlobalContext.Provider value={{ images, setImages, currentPage, setCurrentPage }}>
      <FavoritesProvider>
        <div>
          <MainPage />
        </div>
      </FavoritesProvider>
    </GlobalContext.Provider>
  );
}

export default App;
