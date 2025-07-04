import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Competitions from './pages/competitions';
import Contestants from './pages/contestants';
import Leaderboard from './pages/leaderboard';
import Login from './pages/login';
import Navbar from './components/layout/navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/contestants" element={<Contestants />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default App;