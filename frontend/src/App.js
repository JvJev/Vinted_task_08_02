import React, { useState } from 'react';
import MainPage from './Pages/MainPage';
import GlobalContext from './Context/GlobalContext';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <GlobalContext.Provider value={{ images, setImages, currentPage, setCurrentPage }}>
      <div>
        <MainPage />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
