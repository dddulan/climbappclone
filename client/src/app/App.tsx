import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Competitions from '../pages/competitions';
import Contestants from '../pages/contestants';
import Leaderboard from '../pages/leaderboard';
import Login from '../pages/login';
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