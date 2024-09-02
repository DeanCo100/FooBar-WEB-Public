

// import React, { useState } from 'react';
// import '../../styles/MidSection/Comment.css';
// import '../../styles/DarkMode.css'; // Import the dark mode CSS file


// function Comment({ comment, onAddComment, onDeleteComment, onEditComment, profile }) {
//   const [commentText, setCommentText] = useState('');

//   // Handles the change of comment
//   const handleCommentChange = (event) => {
//     setCommentText(event.target.value);
//   };

//   // Handles the deletion of a comment
//   const handleDeleteClick = () => {
//     onDeleteComment(comment._id);
//   }

//   // Handles the submition of the comment
//   const handleSubmit = () => {
//     // Check if the comment is not empty
//     if (commentText.trim() !== '') {
//       onAddComment(commentText); // Call the onAddComment function with the comment text
//       setCommentText(''); // Clear the input field after adding the comment
//     }
//   };

//   return (
//     <div className="comment-container">
//       <div className="comment-input-container">
//         <input
//           className="comment-input"
//           type="text"
//           placeholder="Write a comment..."
//           value={commentText}
//           onChange={handleCommentChange}
//         />
//         <button className="submit-comment" onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>
//   </div>
//   );
// }

// export default Comment;



import React, { useState } from 'react';
import '../../styles/MidSection/Comment.css';
import '../../styles/DarkMode.css'; // Import the dark mode CSS file

function Comment({
  comment,
  onAddComment,
  onDeleteComment,
  onEditComment,
  profile,
  darkMode,
  editingCommentId,
  editedCommentText,
  handleSaveEditedComment,
  handleCancelEditComment,
  setEditedCommentText,
  setEditingCommentId,
}) {
  const [commentText, setCommentText] = useState('');

  // Handles the change of comment input
  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  // Handles the deletion of a comment
  const handleDeleteClick = () => {
    onDeleteComment(comment._id);
  };

  // Handles the submission of a new comment
  const handleSubmit = () => {
    if (commentText.trim() !== '') {
      onAddComment(commentText); // Call the onAddComment function with the comment text
      setCommentText(''); // Clear the input field after adding the comment
    }
  };

  // Handles the edit mode change for a comment
  const handleEditClick = () => {
    setEditingCommentId(comment._id);
    setEditedCommentText(comment.commentText);
  };

  return (
    <div className={`comment-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="comment-input-container">
        {comment ? (
          <div className="comment-item">
            <img src={comment.profilePic} alt="User Pic" className="comment-user-pic" />
            <div>
              <strong className="usrnm-comment">{comment.displayName}:</strong>
              {editingCommentId === comment._id ? (
                <input
                  type="text"
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                />
              ) : (
                <span>{comment.commentText}</span>
              )}
            </div>
            <div className="comment-btns-wrapper">
              {editingCommentId === comment._id ? (
                <>
                  <button className="save-edited-comment-btn" onClick={handleSaveEditedComment}>
                    Save
                  </button>
                  <button className="cancel-edit-comment-btn" onClick={handleCancelEditComment}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="edit-comment-btn" onClick={handleEditClick}>
                    Edit
                  </button>
                  <button className="delete-comment-btn" onClick={handleDeleteClick}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div>
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
        )}
      </div>
    </div>
  );
}

export default Comment;
