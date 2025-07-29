import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Competitions from '../pages/competitions/competitions';
import Contestants from '../pages/contestants/contestants';
import Leaderboard from '../pages/leaderboard/Leaderboard';
import Login from '../pages/login/login';
import Layout from '../components/layout/layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="competitions" element={<Competitions />} />
          <Route path="contestants" element={<Contestants />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;