// Test file with 2 tests for the MidSection
import React from 'react';
import { render, fireEvent, waitFor, getByLabelText, screen  } from '@testing-library/react'; // Import getByLabelText
import MidSection from './MidSection';
import '@testing-library/jest-dom';

// Test 1:
test('Adding a new post should display it on the page', async () => {
  const { getByText, getByLabelText } = render(<MidSection darkMode={false} />);

  // Simulate opening the modal
  fireEvent.click(getByText('Whats On Your Mind?'));

  // Enter text into the message input
  fireEvent.change(getByLabelText('Message:'), { target: { value: 'Test message' } });

  // Click the "Post" button
  fireEvent.click(getByText('Post'));

  // Wait for the new post to appear on the page
  await waitFor(() => getByText('Test message'));

  // Assert that the new post is displayed on the page
  expect(getByText('Test message')).toBeInTheDocument();
});
// Test 2:
test('Deleting a post should remove it from the page', async () => {
  const { getByText, getByLabelText, queryByText, queryAllByText } = render(<MidSection darkMode={false} />);

  // Simulate opening the modal
  fireEvent.click(getByText('Whats On Your Mind?'));

  // Enter text into the message input
  fireEvent.change(getByLabelText('Message:'), { target: { value: 'Test message' } });

  // Click the "Post" button
  fireEvent.click(getByText('Post'));

  // Wait for the new post to appear on the page
  await waitFor(() => getByText('Test message'));

  // Assert that the new post is displayed on the page
  expect(getByText('Test message')).toBeInTheDocument();

  // Find all delete buttons on the page
  const deleteButtons = queryAllByText('Delete');

  // Loop through all delete buttons to find the one associated with the specific post
  for (const deleteButton of deleteButtons) {
    if (deleteButton.closest('.post').querySelector('.username').textContent === 'Tzion Mea') {
      fireEvent.click(deleteButton);
      break; // Stop looping once we find and click the delete button
    }
  }

  // Wait for the post to be removed from the page
  await waitFor(() => expect(queryByText('Test message')).not.toBeInTheDocument());

  // Assert that the post is no longer displayed on the page
  expect(queryByText('Test message')).not.toBeInTheDocument();
});