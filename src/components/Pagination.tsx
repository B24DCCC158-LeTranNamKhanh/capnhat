import React from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center gap-1 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
      >
        &larr; Trang trước
      </button>
      
      {/* Page number buttons */}
      <div className="flex gap-1 mx-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
           
            className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-150 
              ${currentPage === i + 1 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
      >
        Trang sau &rarr;
      </button>
    </div>
  );
};

export default Pagination;