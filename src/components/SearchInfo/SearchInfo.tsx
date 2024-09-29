import React from 'react';
import ResultsCount from '../ResultsCount/ResultsCount';
import './SearchInfo.css';

interface SearchInfoProps {
  searchTerm: string;
  totalResults: number;
}

const SearchInfo: React.FC<SearchInfoProps> = ({ searchTerm, totalResults }) => {
  return (
    <div className="search-info">
      <h2 className="search-info__title">You searched for: <span>{searchTerm}</span></h2>
      <ResultsCount totalResults={totalResults} />
    </div>
  );
};

export default SearchInfo;