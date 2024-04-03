import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import e from 'express';

jest.mock('axios');

describe('App', () => {
  test('fetches weather data on mount', async () => {
    const data = {
      data: {
        location: 'New York, NY, USA',
        current_weather: {
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
          temperature: 26.53
        },
        forecast: [
          {
            date: '2024-04-01',
            main: 'Rain',
            description: 'light rain',
            icon: '10d',
            highTemp: 20,
            lowTemp: 15
          },
          {
            date: '2024-04-02',
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d',
            highTemp: 22,
            lowTemp: 16
          },
          {
            date: '2024-04-03',
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
            highTemp: 25,
            lowTemp: 18
          },
          {
            date: '2024-04-04',
            main: 'Snow',
            description: 'light snow',
            icon: '13d',
            highTemp: -1,
            lowTemp: -5
          },
          {
            date: '2024-04-05',
            main: 'Thunderstorm',
            description: 'thunderstorm with light rain',
            icon: '11d',
            highTemp: 28,
            lowTemp: 22
          },
          {
            date: '2024-04-06',
            main: 'Drizzle',
            description: 'light intensity drizzle',
            icon: '09d',
            highTemp: 19,
            lowTemp: 15
          },
          {
            date: '2024-04-07',
            main: 'Mist',
            description: 'mist',
            icon: '50d',
            highTemp: 16,
            lowTemp: 12
          }
        ]
      }
    };
    axios.get.mockResolvedValue(data);

    render(<App />);

    await waitFor(() => screen.getByText('New York, NY, USA'));

    expect(screen.getByText('New York, NY, USA')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
    
    // Asserting forecast data
expect(screen.getByText('2024-04-01')).toBeInTheDocument();
expect(screen.getByText('Rain')).toBeInTheDocument();
expect(screen.getByText('20')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('15')).toBeInTheDocument(); // Assuming lowTemp is displayed as text

expect(screen.getByText('2024-04-02')).toBeInTheDocument();
expect(screen.getByText('Clouds')).toBeInTheDocument();
expect(screen.getByText('22')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('16')).toBeInTheDocument(); // Assuming lowTemp is displayed as text

expect(screen.getByText('2024-04-03')).toBeInTheDocument();
expect(screen.getByText('Clear')).toBeInTheDocument();
expect(screen.getByText('25')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('18')).toBeInTheDocument(); // Assuming lowTemp is displayed as text

expect(screen.getByText('2024-04-04')).toBeInTheDocument();
expect(screen.getByText('Snow')).toBeInTheDocument();
expect(screen.getByText('-1')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('-5')).toBeInTheDocument(); // Assuming lowTemp is displayed as text

expect(screen.getByText('2024-04-05')).toBeInTheDocument();
expect(screen.getByText('Thunderstorm')).toBeInTheDocument();
expect(screen.getByText('28')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('22')).toBeInTheDocument(); // Assuming lowTemp is displayed as text

expect(screen.getByText('2024-04-06')).toBeInTheDocument();
expect(screen.getByText('Drizzle')).toBeInTheDocument();
expect(screen.getByText('19')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('15')).toBeInTheDocument(); // Assuming lowTemp is displayed as text

expect(screen.getByText('2024-04-07')).toBeInTheDocument();
expect(screen.getByText('Mist')).toBeInTheDocument();
expect(screen.getByText('16')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('12')).toBeInTheDocument(); // Assuming lowTemp is displayed as text
  });

  test('fetches new weather data when location is submitted', async () => {
    const initialData = {
      data: {
        location: 'New York, NY, USA',
        current_weather: {
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
          temperature: 26.53
        },
        forecast: [
          {
            date: '2024-04-01',
            main: 'Rain',
            description: 'light rain',
            icon: '10d',
            highTemp: 20,
            lowTemp: 15
          },
          {
            date: '2024-04-02',
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d',
            highTemp: 22,
            lowTemp: 16
          },
          {
            date: '2024-04-03',
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
            highTemp: 25,
            lowTemp: 18
          },
          {
            date: '2024-04-04',
            main: 'Snow',
            description: 'light snow',
            icon: '13d',
            highTemp: -1,
            lowTemp: -5
          },
          {
            date: '2024-04-05',
            main: 'Thunderstorm',
            description: 'thunderstorm with light rain',
            icon: '11d',
            highTemp: 28,
            lowTemp: 22
          },
          {
            date: '2024-04-06',
            main: 'Drizzle',
            description: 'light intensity drizzle',
            icon: '09d',
            highTemp: 19,
            lowTemp: 15
          },
          {
            date: '2024-04-07',
            main: 'Mist',
            description: 'mist',
            icon: '50d',
            highTemp: 16,
            lowTemp: 12
          }
        ]
      }
    };
    const newData = {
      data: {
        location: 'Los Angeles, CA, USA',
        current_weather: {
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
          temperature: 24.88
        },
        forecast: [
          {
            date: '2024-04-01',
            main: 'Rain',
            description: 'light rain',
            icon: '10d',
            highTemp: 20,
            lowTemp: 15
          },
          {
            date: '2024-04-02',
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d',
            highTemp: 22,
            lowTemp: 16
          },
          {
            date: '2024-04-03',
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
            highTemp: 25,
            lowTemp: 18
          },
          {
            date: '2024-04-04',
            main: 'Snow',
            description: 'light snow',
            icon: '13d',
            highTemp: -1,
            lowTemp: -5
          },
          {
            date: '2024-04-05',
            main: 'Thunderstorm',
            description: 'thunderstorm with light rain',
            icon: '11d',
            highTemp: 28,
            lowTemp: 22
          },
          {
            date: '2024-04-06',
            main: 'Drizzle',
            description: 'light intensity drizzle',
            icon: '09d',
            highTemp: 19,
            lowTemp: 15
          },
          {
            date: '2024-04-07',
            main: 'Mist',
            description: 'mist',
            icon: '50d',
            highTemp: 16,
            lowTemp: 12
          }
        ]
      }
    };
    axios.get.mockResolvedValue(initialData);
    axios.post.mockResolvedValue(newData);

    render(<App />);

    await waitFor(() => screen.getByText('New York, NY, USA'));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Los Angeles, CA' } });
    fireEvent.click(screen.getByText('Get Weather'));

    await waitFor(() => screen.getByText('Los Angeles, CA, USA'));

    expect(screen.getByText('Los Angeles, CA, USA')).toBeInTheDocument();
    expect(screen.getByText('Clouds')).toBeInTheDocument();
    expect(screen.getByText('24.88')).toBeInTheDocument();

    // Asserting forecast data
expect(screen.getByText('2024-04-01')).toBeInTheDocument();
expect(screen.getByText('Rain')).toBeInTheDocument();
expect(screen.getByText('20')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('15')).toBeInTheDocument(); // Assuming lowTemp is displayed as text

expect(screen.getByText('2024-04-02')).toBeInTheDocument();
expect(screen.getByText('Clouds')).toBeInTheDocument();
expect(screen.getByText('22')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('16')).toBeInTheDocument(); // Assuming lowTemp is displayed as text

expect(screen.getByText('2024-04-03')).toBeInTheDocument();
expect(screen.getByText('Clear')).toBeInTheDocument();
expect(screen.getByText('25')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('18')).toBeInTheDocument(); // Assuming lowTemp is displayed as text

expect(screen.getByText('2024-04-04')).toBeInTheDocument();
expect(screen.getByText('Snow')).toBeInTheDocument();
expect(screen.getByText('-1')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('-5')).toBeInTheDocument(); // Assuming lowTemp is displayed as text

expect(screen.getByText('2024-04-05')).toBeInTheDocument();
expect(screen.getByText('Thunderstorm')).toBeInTheDocument();
expect(screen.getByText('28')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('22')).toBeInTheDocument(); // Assuming lowTemp is displayed as text

expect(screen.getByText('2024-04-06')).toBeInTheDocument();
expect(screen.getByText('Drizzle')).toBeInTheDocument();
expect(screen.getByText('19')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('15')).toBeInTheDocument(); // Assuming lowTemp is displayed as text

expect(screen.getByText('2024-04-07')).toBeInTheDocument();
expect(screen.getByText('Mist')).toBeInTheDocument();
expect(screen.getByText('16')).toBeInTheDocument(); // Assuming highTemp is displayed as text
expect(screen.getByText('12')).toBeInTheDocument(); // Assuming lowTemp is displayed as text
  });
});