import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const user = await response.json();
      setUser(user);
      navigate('/'); // Redirect to homepage after successful signup
    } else {
      console.log('Sign up failed');
      // Show an error message
      alert('Sign up failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Username:
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
    </label>
    <label>
      Password:
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
    </label>
    <button type="submit">Sign Up</button>
  </form>
  );
}

export { Signup };