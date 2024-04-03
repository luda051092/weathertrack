import React from 'react';
import { render } from '@testing-library/react';
import WeatherDisplay from './weatherDisplay';

test('renders weather data', () => {
  const mockData = {
    description: 'clear sky',
    temperature: 20,
    icon: '01d'
  };

  const { getByText, getByAltText } = render(<WeatherDisplay data={mockData} />);

  expect(getByText('Current Weather')).toBeInTheDocument();
  expect(getByText(mockData.description)).toBeInTheDocument();
  expect(getByText(`Temperature: ${mockData.temperature}°C`)).toBeInTheDocument();
  expect(getByAltText(mockData.description)).toHaveAttribute('src', `http://openweathermap.org/img/wn/${mockData.icon}.png`);
});