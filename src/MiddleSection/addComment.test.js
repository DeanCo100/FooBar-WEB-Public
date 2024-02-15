// This test creates a new post, then it clicks on its 'Comment' button, adds a new comment and then checks that the comment indeed appear on the page.
import { render, fireEvent, waitFor, getByText, getByPlaceholderText, getAllByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the extend-expect library
import MidSection from './MidSection';

test('add comment to post and verify display', async () => {
  //  User creates a new post
  const { getByText, getByLabelText, getByPlaceholderText, getAllByText } = render(<MidSection darkMode={false} />);
  fireEvent.click(getByText('Whats On Your Mind?'));
  fireEvent.change(getByLabelText('Message:'), { target: { value: 'Test message' } });
  fireEvent.click(getByText('Post'));
  await waitFor(() => getByText('Test message'));

  // Find the new post with the username 'Tzion Mea'
  const newPost = [...getAllByText('Tzion Mea')]
    .map(element => element.closest('.post'))
    .find(post => post); // Find the post element

  // Click the Comment button within the new post
  fireEvent.click(newPost.querySelector('.comment-btn'));

  // User enters a comment in the input field
  const commentText = 'This is a test comment';
  const commentInput = getByPlaceholderText('Write a comment...');
  fireEvent.change(commentInput, { target: { value: commentText } });

  // User submits the comment
  fireEvent.click(getByText('Submit'));

  // Assert that the comment is displayed on the post
  await waitFor(() => getByText(commentText));
  expect(getByText(commentText)).toBeInTheDocument();
});

