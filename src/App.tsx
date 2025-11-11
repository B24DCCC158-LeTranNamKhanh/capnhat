

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { TransactionProvider } from './context/TransactionContext'; 


import './styles/App.css'; 

const App: React.FC = () => {
  return (
    <TransactionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </TransactionProvider>
  );
};

export default App;