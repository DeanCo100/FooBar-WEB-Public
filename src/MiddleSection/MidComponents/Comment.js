

import React, { useState } from 'react';
import '../../styles/MidSection/Comment.css';

function Comment({ onAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = () => {
    // Check if the comment is not empty
    if (commentText.trim() !== '') {
      onAddComment(commentText); // Call the onAddComment function with the comment text
      setCommentText(''); // Clear the input field after adding the comment
    }
  };

  return (
    <div>
      <input className='comment-input'
        type="text"
        placeholder="Write a comment..."
        value={commentText}
        onChange={handleCommentChange}
      />
      <button className='submit-comment' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Comment;




// import PropTypes from 'prop-types';
// import '../../styles/MidSection/Comment.css'; // Import the CSS file for styling
// import MichaelPic from '../../icons/spam/Michael.png';


// function Comment({ id, username, text, onEditComment, onDeleteComment }) {
//   const [editing, setEditing] = useState(false);
//   const [editText, setEditText] = useState(text);

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleSaveEdit = () => {
//     onEditComment(id, editText);
//     setEditing(false);
//   };

//   const handleDelete = () => {
//     onDeleteComment(id);
//   };

//   return (
//     <div className="comment">
//       <div className="user-info">
//         {/* Display user pic, username, and comment text */}
//         <div className="profile-pic">{MichaelPic}</div>
//         <div className="username">{username}</div>
//         {editing ? (
//           <input
//             type="text"
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//           />
//         ) : (
//           <div className="comment-text">{text}</div>
//         )}
//       </div>
//       {/* Render Edit and Delete buttons */}
//       <div className="comment-actions">
//         {editing ? (
//           <button onClick={handleSaveEdit}>Save</button>
//         ) : (
//           <button onClick={handleEdit}>Edit</button>
//         )}
//         <button onClick={handleDelete}>Delete</button>
//       </div>
//     </div>
//   );
// }

// Comment.propTypes = {
//   id: PropTypes.number.isRequired,
//   username: PropTypes.string.isRequired,
//   text: PropTypes.string.isRequired,
//   onEditComment: PropTypes.func.isRequired,
//   onDeleteComment: PropTypes.func.isRequired,
// };

// export default Comment;
