export const getPageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
    const pages = [];
    const maxPagesToShow = 4;
    const halfRange = Math.floor(maxPagesToShow / 2);
  
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= halfRange + 1) {
        for (let i = 1; i <= maxPagesToShow - 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - halfRange) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - (maxPagesToShow - 2); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
  
    return pages;
};
  
export const handlePrevious = (currentPage: number, onPageChange: (page: number) => void) => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
};
  
export const handleNext = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
};

export const calculateTotalPages = (totalResults: number, resultsPerPage: number): number => {
  return Math.ceil(totalResults / resultsPerPage);
};

export const getApiPages = (startIndex: number, endIndex: number): number[] => {
  const apiPageStart = Math.floor((startIndex - 1) / 10) + 1;
  const apiPageEnd = Math.floor((endIndex - 1) / 10) + 1;
  const apiPages = [];
  for (let p = apiPageStart; p <= apiPageEnd; p++) {
    apiPages.push(p);
  }
  return apiPages;
};

export const getMoviesToDisplay = (
  allMovies: any[],
  startIndex: number,
  apiPageStart: number,
  resultsPerPage: number
): any[] => {
  const firstMovieGlobalIndex = (apiPageStart - 1) * 10 + 1;
  const startIndexInAllMovies = startIndex - firstMovieGlobalIndex;
  const endIndexInAllMovies = startIndexInAllMovies + resultsPerPage;
  return allMovies.slice(startIndexInAllMovies, endIndexInAllMovies);
};
