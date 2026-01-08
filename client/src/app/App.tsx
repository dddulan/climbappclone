import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CompetitionsHome from '../pages/competitions/CompetitionsHome';
import Contestants from '../pages/contestants/ContestantsHome';
import Leaderboard from '../pages/leaderboard/leaderboard';
import SignUpHome from '../pages/signup/SignUpHome';
import Layout from '../components/layout/layout';
import ScoresHome from '@/pages/scores/ScoresHome';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to ="competitions" replace />} />
          <Route path="competitions" element={<CompetitionsHome />} />
          <Route path="contestants" element={<Contestants />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="signup" element={<SignUpHome />} />
          <Route path="scores" element ={<ScoresHome />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;