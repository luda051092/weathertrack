import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LocationInput from './locationInput';

test('calls onGetWeather with the location when the form is submitted', () => {
  const mockOnGetWeather = jest.fn();
  const { getByPlaceholderText, getByText } = render(<LocationInput onGetWeather={mockOnGetWeather} />);

  const input = getByPlaceholderText('Enter another city');
  fireEvent.change(input, { target: { value: 'Los Angeles, CA' } });

  const button = getByText('Get Weather');
  fireEvent.click(button);

  expect(mockOnGetWeather).toHaveBeenCalledWith('Los Angeles, CA');
});

// Test that onGetWeather is not called when the form is submitted with an empty input
test('does not call onGetWeather when the form is submitted with an empty input', () => {
  const mockOnGetWeather = jest.fn();
  const { getByText } = render(<LocationInput onGetWeather={mockOnGetWeather} />);

  const button = getByText('Get Weather');
  fireEvent.click(button);

  expect(mockOnGetWeather).not.toHaveBeenCalled();
});

// Test that onGetWeather is called with trimmed input when the form is submitted
test('calls onGetWeather with trimmed input when the form is submitted', () => {
  const mockOnGetWeather = jest.fn();
  const { getByPlaceholderText, getByText } = render(<LocationInput onGetWeather={mockOnGetWeather} />);

  const input = getByPlaceholderText('Enter another city');
  fireEvent.change(input, { target: { value: '  Los Angeles, CA  ' } });

  const button = getByText('Get Weather');
  fireEvent.click(button);

  expect(mockOnGetWeather).toHaveBeenCalledWith('Los Angeles, CA');
});

// Test that onGetWeather is not called when the form is submitted with only whitespace in the input
test('does not call onGetWeather when the form is submitted with only whitespace in the input', () => {
  const mockOnGetWeather = jest.fn();
  const { getByPlaceholderText, getByText } = render(<LocationInput onGetWeather={mockOnGetWeather} />);

  const input = getByPlaceholderText('Enter another city');
  fireEvent.change(input, { target: { value: '   ' } });

  const button = getByText('Get Weather');
  fireEvent.click(button);

  expect(mockOnGetWeather).not.toHaveBeenCalled();
});