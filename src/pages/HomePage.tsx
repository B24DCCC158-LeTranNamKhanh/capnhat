import React, { useContext, useState, useMemo } from 'react';
import ProductContext from '../context/ProductContext';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import { Category } from '../types/Product';

const HomePage: React.FC = () => {
  const { state } = useContext(ProductContext);

  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  
  const filteredProducts = useMemo(() => {
    
    setCurrentPage(1); 
    
    return state.products
      .filter(p => p.ten.toLowerCase().includes(search.toLowerCase()))
      .filter(p => (category ? p.danhMuc === category : true))
      .filter(p => p.gia >= priceRange[0] && p.gia <= priceRange[1]);
  }, [state.products, search, category, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  return (
   
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-2">
        🛒 Quản lý Sản phẩm
      </h1>

      {/* Search & Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <SearchBar searchText={search} onSearchChange={setSearch} />
        <Filter
          selectedCategory={category}
          onCategoryChange={setCategory}
          minPrice={priceRange[0]}
          maxPrice={priceRange[1] === Infinity ? 0 : priceRange[1]}
          onPriceChange={(min, max) => setPriceRange([min, max === 0 ? Infinity : max])}
        />
      </div>

      {/* Product List */}
      {paginatedProducts.length > 0 ? (
        <>
          <ProductList products={paginatedProducts} />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {/* Product Count Footer */}
          <div className="text-center mt-6 text-gray-600 text-sm font-medium">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
              Tổng sản phẩm: {filteredProducts.length}
            </span>
            <span className="ml-4">
              Trang {currentPage} / {totalPages || 1}
            </span>
          </div>
        </>
      ) : (
        <div className="text-center p-10 bg-white rounded-xl shadow-lg">
          <p className="text-xl text-red-500 font-semibold">Không tìm thấy sản phẩm nào!</p>
          <p className="text-gray-500 mt-2">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;