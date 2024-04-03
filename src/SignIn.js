import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const response = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      console.log('Sign in successful');
      // Redirect to the homepage after successful signup
      navigate('/');
    } else {
      console.log('Sign in failed');
      // Show an error message
      alert('Sign in failed. Please try again.');
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
    <button type="submit">Sign In</button>
  </form>
  );
}

export { SignIn };