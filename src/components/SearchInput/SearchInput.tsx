import React from 'react';
import './SearchInput.css';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onEnter }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  };

  return (
    <div className="search-input">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Movie"
      />
      <img
        src="/svg/search.svg"
        alt="Search"
        className="search-icon"
        onClick={onEnter}
      />
    </div>
  );
};

export default SearchInput;
