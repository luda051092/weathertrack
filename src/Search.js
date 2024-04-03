import React, { useState } from 'react';
import axios from 'axios';

function Search() {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        axios.get('/search', { params: { q: query } })
            .then(response => {
                // Handle the response here
                console.log(response.data);
            })
            .catch(error => {
                // Handle the error here
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Search;