import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { TransactionProvider } from './context/TransactionContext'; 
import { ThemeProvider } from './context/ThemeContext'; // <--- Import mới

import './styles/App.css'; 

const App: React.FC = () => {
  return (
    <ThemeProvider> {/* <--- Bọc ThemeProvider ở ngoài cùng */}
      <TransactionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </TransactionProvider>
    </ThemeProvider>
  );
};

export default App;