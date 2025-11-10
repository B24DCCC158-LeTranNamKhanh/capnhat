import React, { useState } from 'react';
import { Category } from '../types/Product';

interface Props {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

const categories: Category[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

const Filter: React.FC<Props> = ({
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const [min, setMin] = useState(minPrice === 0 ? '' : minPrice);
  const [max, setMax] = useState(maxPrice === Infinity ? '' : maxPrice);

  const handlePriceApply = () => {
    const minVal = min === '' ? 0 : Number(min);
    const maxVal = max === '' ? Infinity : Number(max);
    onPriceChange(minVal, maxVal);
  };

  return (
    
    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
      <span className="text-gray-600 font-medium">Lọc:</span>
      
      {/* Filter danh mục */}
      <select
        
        className="border border-gray-300 p-2 rounded-lg text-sm bg-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        value={selectedCategory}
        onChange={e => onCategoryChange(e.target.value)}
      >
        <option value="">-- Tất cả danh mục --</option>
        {categories.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Filter khoảng giá */}
      <input
        type="number"
        placeholder="Giá min"
        
        className="border border-gray-300 p-2 w-28 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        value={min}
        onChange={e => setMin(e.target.value)}
      />
      <input
        type="number"
        placeholder="Giá max"
        
        className="border border-gray-300 p-2 w-28 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        value={max}
        onChange={e => setMax(e.target.value)}
      />
      <button
        
        className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-200 transition duration-150"
        onClick={handlePriceApply}
      >
        Áp dụng
      </button>
    </div>
  );
};

export default Filter;