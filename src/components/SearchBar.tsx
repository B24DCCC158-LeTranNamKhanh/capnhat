import React from 'react';

interface Props {
  searchText: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchText, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="🔍 Tìm kiếm theo mô tả..."
      className="search-bar form-input" // Sử dụng class chung 'form-input'
      value={searchText}
      onChange={e => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;