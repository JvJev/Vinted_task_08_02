// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import FavoritePhotos from './Pages/FavoritePhotos';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/favorite-photos" element={<FavoritePhotos />} />
      </Routes>
    </Router>
  );
}

export default App;
