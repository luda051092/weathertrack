import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
    const [username, setUsername] = useState('');
    const [searches, setSearches] = useState([]);

    useEffect(() => {
        axios.get('/profile')
            .then(response => {
                setUsername(response.data.username);
                setSearches(response.data.searches);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }, []);

    return (
        <div>
            <h1>Welcome, {username}!</h1>
            <h2>Your Searches</h2>
            <ul>
                {searches.map((search, index) => (
                    <li key={index}>{search}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserProfile;