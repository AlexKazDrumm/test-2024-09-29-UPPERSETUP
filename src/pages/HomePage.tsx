// src/pages/HomePage.tsx

import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Header from '../components/Header/Header';
import Pagination from '../components/Pagination/Pagination';
import SearchInfo from '../components/SearchInfo/SearchInfo';
import Loader from '../components/Loader/Loader';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import { movieStore } from '../store/MovieStore';
import { calculateTotalPages } from '../utils/paginationUtils';
import './HomePage.css';

const HomePage: React.FC = () => {
  useEffect(() => {
    movieStore.searchMovies(movieStore.currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieStore.currentPage]);

  const handleSearch = () => {
    movieStore.setCurrentPage(1);
    movieStore.searchMovies(1);
  };

  const handlePageChange = (page: number) => {
    movieStore.setCurrentPage(page);
    movieStore.searchMovies(page);
  };

  const totalPages = calculateTotalPages(movieStore.totalResults, movieStore.resultsPerPage);

  return (
    <div className="homepage">
      <Header onSearch={handleSearch} />
      <SearchInfo
        searchTerm={movieStore.displayedSearchTerm}
        totalResults={movieStore.totalResults}
      />
      {movieStore.isLoading ? (
        <Loader />
      ) : movieStore.totalResults > 0 ? (
        <>
          <MovieGrid movies={movieStore.movies} />
          {movieStore.totalResults > movieStore.resultsPerPage && (
            <Pagination
              currentPage={movieStore.currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="no-results">Nothing found</div>
      )}
    </div>
  );
};

export default observer(HomePage);
