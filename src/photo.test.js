/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import Photo from './photo';

test('renders without crashing', () => {
  const { getByTestId } = render(<Photo location="Los Angeles, CA" />);
  const photoElement = getByTestId('photo');
  expect(photoElement).toBeInTheDocument();
});