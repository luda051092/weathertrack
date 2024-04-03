import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import UserProfile from './UserProfile';  // path to your UserProfile component

// Mock the axios module
jest.mock('axios');

test('renders user profile', async () => {
    // Set up the axios.get mock
    axios.get.mockResolvedValue({
        data: {
            username: 'testuser',
            searches: ['testquery1', 'testquery2']
        }
    });

    // Render the UserProfile component
    render(<UserProfile />);

    // Wait for the UserProfile component to receive the data and re-render
    await waitFor(() => screen.getByText('Welcome, testuser!'));

    // Check that the username and searches are displayed
    expect(screen.getByText('Welcome, testuser!')).toBeInTheDocument();
    expect(screen.getByText('testquery1')).toBeInTheDocument();
    expect(screen.getByText('testquery2')).toBeInTheDocument();
});