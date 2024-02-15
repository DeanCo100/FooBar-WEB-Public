// A file with a test to check that with invalid input (not the hardcoded) we cant login and move to the 'Feed' page.

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router
import LoginForm from './loginForm';

// Test:
test('Login fails with incorrect credentials', async () => {
  // Mock the onLogin function
  const mockOnLogin = jest.fn();

  const { getByPlaceholderText, getByText } = render(
    <Router>
      <LoginForm onLogin={mockOnLogin} />
    </Router>
  );

  // Get input fields and submit button
  const emailInput = getByPlaceholderText('Username');
  const passwordInput = getByPlaceholderText('Password');
  const submitButton = getByText('Log In');

  // Set incorrect username and password
  fireEvent.change(emailInput, { target: { value: 'Tzionmea1' } });
  fireEvent.change(passwordInput, { target: { value: 'Mea101101' } });

  // Submit the form
  fireEvent.click(submitButton);

  // Wait for error message to appear
  await waitFor(() => getByText('Incorrect username or password'));

  // Check that onLogin function was not called
  expect(mockOnLogin).not.toHaveBeenCalled();
});
