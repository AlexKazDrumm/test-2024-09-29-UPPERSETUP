import React from 'react';
import './ResultsCount.css';

interface ResultsCountProps {
  totalResults: number;
}

const ResultsCount: React.FC<ResultsCountProps> = ({ totalResults }) => {
  return (
    <div className="results-count">
      <span>{totalResults} results</span>
    </div>
  );
};

export default ResultsCount;
