import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignupSignin from './signupsignin';

test('handles input and form submission', () => {
  const { getByLabelText, getByText } = render(<SignupSignin />);

  const usernameInput = getByLabelText('Username:');
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  expect(usernameInput.value).toBe('testuser');

  const passwordInput = getByLabelText('Password:');
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });
  expect(passwordInput.value).toBe('testpass');

  const consoleSpy = jest.spyOn(console, 'log');
  const button = getByText('Sign Up/Sign In');
  fireEvent.click(button);

  expect(consoleSpy).toHaveBeenCalledWith('Username: testuser, Password: testpass');
  consoleSpy.mockRestore();
});