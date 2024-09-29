import React from 'react';
import './SearchInput.css';
import Search from '../../assets/svg/search.svg';

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
        src={Search}
        alt="Search"
        className="search-icon"
        onClick={onEnter}
      />
    </div>
  );
};

export default SearchInput;
