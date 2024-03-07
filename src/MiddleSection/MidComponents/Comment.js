

import React, { useState } from 'react';
import '../../styles/MidSection/Comment.css';
import '../../styles/DarkMode.css'; // Import the dark mode CSS file


function Comment({ onAddComment, onDeleteComment, onEditComment, profile }) {
  const [commentText, setCommentText] = useState('');

  // Handles the change of comment
  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  // Handles the submition of the comment
  const handleSubmit = () => {
    // Check if the comment is not empty
    if (commentText.trim() !== '') {
      onAddComment(commentText); // Call the onAddComment function with the comment text
      setCommentText(''); // Clear the input field after adding the comment
    }
  };

  return (
    <div className="comment-container">
      <div className="comment-input-container">
        <input
          className="comment-input"
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={handleCommentChange}
        />
        <button className="submit-comment" onClick={handleSubmit}>
          Submit
        </button>
      </div>
  </div>
  );
}

export default Comment;


