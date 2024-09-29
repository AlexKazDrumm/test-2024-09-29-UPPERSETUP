import React from 'react';
import './UserProfile.css';

interface UserProfileProps {
  user: {
    name: string;
    avatarUrl: string;
  } | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) return null;

  return (
    <div className="header__user">
      <img src={user.avatarUrl} alt="User" />
      <span>{user.name}</span>
    </div>
  );
};

export default UserProfile;
