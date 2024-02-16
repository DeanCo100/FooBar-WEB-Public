// A file with 2 tests: one checks that only a valid input is moving the user to the login page after click the 'signUp' button. The second one checks that if the input is invalid, the user doesnt move to the login page when click the 'signUp' button.
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUp from './SignUp';
import { BrowserRouter as Router } from 'react-router-dom';
// Test 1- valid input
test('valid inputs allow user to move to login page', async () => {
  const { getByPlaceholderText, getByText } = render(
    <Router>
      <SignUp />
    </Router>
  );

  // Fill out the form with valid inputs
  fireEvent.change(getByPlaceholderText('Enter Username'), { target: { value: 'validusername' } });
  fireEvent.change(getByPlaceholderText('Enter Display Name'), { target: { value: 'Valid Display Name' } });
  fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'ValidPassword123' } });
  fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'ValidPassword123' } });
  fireEvent.click(getByText('Sign Up'));

  // Wait for navigation to occur
  await waitFor(() => {
    expect(window.location.pathname).toBe('/'); // Asserts that navigation occurred
  });
});

// Test2 - invalid input
test('invalid inputs prevent user from moving to login page', async () => {
  const { getByPlaceholderText, getByText, queryByText } = render(
    <Router>
      <SignUp />
    </Router>
  );

  // Fill out the form with invalid inputs
  fireEvent.change(getByPlaceholderText('Enter Username'), { target: { value: 'invalid' } });
  fireEvent.change(getByPlaceholderText('Enter Display Name'), { target: { value: 'Invalid Display Name' } });
  fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'invalid' } });
  fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'invalid' } });
  fireEvent.click(getByText('Sign Up'));

  // Wait for navigation to not occur
  await waitFor(() => {
    expect(queryByText('Login to FooBar')).not.toBeInTheDocument(); // Asserts that login form header is not present
  });
});

