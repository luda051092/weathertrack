import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import WeatherComponent from './weathercomponent';

jest.mock('axios');

test('fetches weather data and renders it on button click', async () => {
  const mockResponse = {
    data: {
      location: 'Los Angeles, CA',
      current_weather: 'Sunny',
      forecast: 'Clear for the next few days',
      photo_path: 'path/to/photo.jpg'
    }
  };
  axios.post.mockResolvedValue(mockResponse);

  const { getByText, queryByText, getByAltText } = render(<WeatherComponent />);

  const button = getByText('Get Weather');
  fireEvent.click(button);

  // Wait for useEffect to call axios.post and update state
  await act(async () => {});

  expect(getByText(mockResponse.data.location)).toBeInTheDocument();
  expect(getByText(mockResponse.data.current_weather)).toBeInTheDocument();
  expect(getByText(mockResponse.data.forecast)).toBeInTheDocument();
  expect(getByAltText('Location')).toHaveAttribute('src', mockResponse.data.photo_path);
});