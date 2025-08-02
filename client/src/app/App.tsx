import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompetitionsHome from '../pages/competitions/CompetitionsHome';
import Contestants from '../pages/contestants/ContestantsHome';
import Leaderboard from '../pages/leaderboard/leaderboard';
import Login from '../pages/login/login';
import Layout from '../components/layout/layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="competitions" element={<CompetitionsHome />} />
          <Route path="contestants" element={<Contestants />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;