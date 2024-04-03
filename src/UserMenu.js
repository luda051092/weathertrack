import React, { useContext } from 'react';
import { UserContext } from './UserContext';

function UserMenu() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    // Clear the user's state
    setUser(null);
    // You might also want to clear any stored tokens or other user data here
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      {user.username}
      <button onClick={handleLogout}>Logout</button>
      <div>
        <a href="/profile">Profile</a>
        <a href="/search-history">Search History</a>
      </div>
    </div>
  );
}

export default UserMenu;