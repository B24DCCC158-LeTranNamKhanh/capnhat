import React from 'react';

interface Props {
  searchText: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchText, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="🔍 Tìm kiếm sản phẩm theo tên..."
      
      className="border border-gray-300 p-3 text-lg w-full mb-6 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
      value={searchText}
      onChange={e => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;