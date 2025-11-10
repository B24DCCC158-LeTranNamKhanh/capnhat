import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Import Pages
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import ProductDetailPage from './pages/ProductDetailPage';

// Import Context (assuming this exists)
// import ProductContextProvider from './context/ProductContext';

// --- Header Component (Inline for simplicity) ---
const Header: React.FC = () => {
  return (
    // Updated: Sticky top, deep indigo background, strong shadow
    <header className="sticky top-0 z-10 bg-indigo-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand Name */}
          <Link to="/" className="text-2xl font-extrabold text-white tracking-wider hover:text-indigo-200 transition duration-150">
            🛒 PRODUCT MANAGER
          </Link>
          
          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-white text-md font-medium px-3 py-2 rounded-lg hover:bg-indigo-600 transition duration-150"
            >
              Trang chủ
            </Link>
            <Link
              to="/add"
              // Updated: Stylish button for primary action (Add New)
              className="bg-green-500 text-white text-md font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-150 transform hover:scale-105"
            >
              + Thêm sản phẩm
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* NOTE: Please uncomment the ProductContextProvider wrapper if you are using it
        <ProductContextProvider> 
      */}
        <div className="bg-gray-50 min-h-screen">
          <Header />
          
          {/* Main Content Area: Centered and limited width for good readability */}
          <main className="max-w-7xl mx-auto pt-6 pb-12 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddProductPage />} />
              <Route path="/edit/:id" element={<EditProductPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              {/* Optional: Add a 404 page */}
              <Route path="*" element={<h1 className="text-4xl text-center mt-10 text-red-600">404 - Không tìm thấy trang</h1>} />
            </Routes>
          </main>
        </div>
      {/* </ProductContextProvider> */}
    </BrowserRouter>
  );
};

export default App;