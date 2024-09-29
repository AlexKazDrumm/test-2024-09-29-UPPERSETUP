import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import SearchInput from '../SearchInput/SearchInput';
import UserProfile from '../UserProfile/UserProfile';
import userStore from '../../store/UserStore';
import { movieStore } from '../../store/MovieStore';
import './Header.css';
import Logo from '../../assets/svg/logo.svg';

interface HeaderProps {
  onSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  useEffect(() => {
    userStore.fetchUserData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    movieStore.setSearchTerm(value);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo} alt="Logo" />
      </div>
      <SearchInput
        value={movieStore.searchTerm}
        onChange={handleSearchChange}
        onEnter={onSearch}
      />
      <UserProfile user={userStore.user} />
    </header>
  );
};

export default observer(Header);
