import React from 'react';
import { render, screen } from '@testing-library/react';
import Forecast from './forecast';
import '@testing-library/jest-dom';

test('renders correctly with no data', () => {
  render(<Forecast data={undefined} />);
  expect(screen.getByText('No data available')).toBeInTheDocument();
});

test('renders correctly with an empty object in the data', () => {
  const mockData = [{}];
  render(<Forecast data={mockData} />);
  expect(screen.getByText('No data available for this day')).toBeInTheDocument();
});

test('renders a message when the data array is empty', () => {
  render(<Forecast data={[]} />);
  expect(screen.getByText('No data available')).toBeInTheDocument();
});

test('renders forecast data', () => {
  const mockData = [
    {
      date: '2024-04-01',
      main: 'Rain',
      description: 'light rain',
      icon: '10d',
      temperature: 20
    },
    {
      date: '2024-04-02',
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04d',
      temperature: 22
    },
    {
        date: '2024-04-03',
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
        temperature: 25
      },
      {
        date: '2024-04-04',
        main: 'Snow',
        description: 'light snow',
        icon: '13d',
        temperature: -1
      },
      {
        date: '2024-04-05',
        main: 'Thunderstorm',
        description: 'thunderstorm with light rain',
        icon: '11d',
        temperature: 28
      },
      {
        date: '2024-04-06',
        main: 'Drizzle',
        description: 'light intensity drizzle',
        icon: '09d',
        temperature: 19
      },
      {
        date: '2024-04-07',
        main: 'Mist',
        description: 'mist',
        icon: '50d',
        temperature: 16
      }

  ];

  render(<Forecast data={mockData} />);

  mockData.forEach((day) => {
    expect(screen.getByText(day.main)).toBeInTheDocument();
    expect(screen.getByText(day.description)).toBeInTheDocument();
    expect(screen.getByText(`Date: ${day.date}`)).toBeInTheDocument();
    expect(screen.getByText(`Temperature: ${day.temperature}°C`)).toBeInTheDocument();
    expect(screen.getByAltText(day.description)).toHaveAttribute('src', `http://openweathermap.org/img/wn/${day.icon}.png`);
  });
});

