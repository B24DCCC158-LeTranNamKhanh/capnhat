

import React from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  // Tạo mảng số trang để hiển thị các nút
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="pagination-btn"
      >
        Trang trước
      </button>
      
      <div className="page-numbers">
        {pageNumbers.map(page => (
          <button
            key={page}
            className={`pagination-btn ${currentPage === page ? 'is-active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="pagination-btn"
      >
        Trang sau
      </button>
    </div>
  );
};

export default Pagination;