import React from 'react';
import { getPageNumbers, handlePrevious, handleNext } from '../../utils/paginationUtils';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="pagination">
      <button
        className="pagination__button pagination__arrow"
        onClick={() => handlePrevious(currentPage, onPageChange)}
        disabled={currentPage === 1}
      >
        <img src="/svg/arrow_left.svg" alt="Previous" />
      </button>
      {pages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <button
              key={`ellipsis-${index}`}
              className="pagination__button pagination__ellipsis"
              disabled
            >
              &hellip;
            </button>
          );
        } else {
          return (
            <button
              key={page}
              className={`pagination__button ${page === currentPage ? 'pagination__button--active' : ''}`}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </button>
          );
        }
      })}
      <button
        className="pagination__button pagination__arrow"
        onClick={() => handleNext(currentPage, totalPages, onPageChange)}
        disabled={currentPage === totalPages}
      >
        <img src="/svg/arrow_right.svg" alt="Next" />
      </button>
    </div>
  );
};

export default Pagination;
