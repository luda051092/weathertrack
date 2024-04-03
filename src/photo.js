import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Photo({ location }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    axios.post('/get_weather', { location })
      .then(response => {
        console.log(response.data.photo_path);
        const baseUrl = 'http://localhost:5001/'; // 
        const photoUrl = baseUrl + response.data.photo_path + '?time=' + Date.now();
        setPhotoUrl(photoUrl);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [location]);

  return (
    <div className="Photo">
      {photoUrl && <img src={photoUrl} alt="Weather" />}
    </div>
  );
}

export default Photo;