

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import LikeIcon from '../../icons/comment-icons/like.png';
import CommentIcon from '../../icons/comment-icons/comment-icon.png';
import Comment from './Comment'; // Import the Comment component
import ShareIcon from '../../icons/comment-icons/share.png';
import EditIcon from '../../icons/post-icons/pen.png';
import DeleteIcon from '../../icons/post-icons/trash.png';
import MichaelPic from '../../icons/spam/Michael.png';
import '../../styles/MidSection/Post.css'; 

function Post({ id, username, userPic, postText, postImage, postTime, onDelete, onEdit }) {
  const [editingPostText, setEditingPostText] = useState(postText);
  const [editingPostImage, setEditingPostImage] = useState(postImage);
  const [editModalOpen, setEditModalOpen] = useState(false);
  // Remove the removeImage state from the Post component
  const [removeImage, setRemoveImage] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentSectionOpen, setCommentSectionOpen] = useState(false); // State to track if comment section is open


  const addComment = (comment) => {
    setComments([...comments, comment]);
  };

  const handleDelete = () => {
    onDelete(id); // Call the onDelete function with the post ID as an argument
  };

  const handleEdit = () => {
    // Only set the editingPostImage if it exists and removeImage is false
    if (postImage && !removeImage) {
      setEditingPostImage(postImage);
    } else {
      setEditingPostImage(null); // If the image was removed, ensure it's not set
    }
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Set removeImage state based on whether the user clicked "Remove Pic"
    const shouldRemoveImage = editingPostImage === null;
    onEdit(id, editingPostText, shouldRemoveImage ? '' : editingPostImage); // Pass empty string if removeImage is true
    setEditModalOpen(false);
  };

  const handleEditCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleRemoveImage = () => {
    setEditingPostImage(null); // Remove the image from the editing state immediately
    setRemoveImage(true); // Set removeImage to true within the edit modal
    handleSaveEdit(); // Call handleSaveEdit to apply the changes immediately
  };

  const handleAddComment = (commentText) => {
    const newComment = {
      id: Date.now(), // Generate a unique ID for the comment
      text: commentText,
      username: 'Current User', // Replace with the current user's username
      userPic: {MichaelPic}, // Replace with the URL of the current user's profile picture
    };
    setComments([...comments, newComment]); // Add the new comment to the list of comments
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="user-info">
          <img src={userPic} alt="Profile Pic" className="profile-pic" />
          <div className="username">{username}</div>
          <div className="post-time">{postTime}</div>
        </div>
        <div className="post-actions">
        <button className="delete-post-btn" onClick={handleDelete}>
            <img src={DeleteIcon} alt="Delete" className="icon" />
            Delete
          </button>
          <button className="edit-post-btn" onClick={handleEdit}>
            <img src={EditIcon} alt="Edit" className="icon" />
            Edit
          </button>
        </div>
      </div>
      <div className="post-content">
        <p className="post-text">{postText}</p>
        {editingPostImage && <img src={editingPostImage} alt="Post" className="post-image" />}
      </div>
      <div className="post-footer">
        <button className="like-btn">
            <img src={LikeIcon} alt="Like" className="icon" />
            Like
          </button>
          <button className="comment-btn" onClick={() => setCommentSectionOpen(true)}> {/* Open comment section on button click */}
            <img src={CommentIcon} alt="Comment" className="icon" />
            Comment
          </button>
          <button className="share-btn">
            <img src={ShareIcon} alt="Share" className="icon" />
            Share
          </button>
      </div>
      <Modal show={editModalOpen} onHide={handleEditCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="message-text">
              <Form.Label>Message:</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Edit your post..." defaultValue={editingPostText} onChange={e => setEditingPostText(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="image-file">
              <Form.Label>Edit Picture:</Form.Label>
              {editingPostImage && <img src={editingPostImage} alt="Current Post" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />}
              <Form.Control type="file" onChange={e => setEditingPostImage(URL.createObjectURL(e.target.files[0]))} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleRemoveImage}>Remove Pic</Button>
          <Button variant="secondary" onClick={handleEditCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
      {commentSectionOpen && (
        <div className="comments-section">
          {comments.map((comment) => (
            // Here I need to change the pic to the current user's pic ***********************
            <div key={comment.id} className="comment-item">
              <img src={comment.userPic} alt="User Pic" className="comment-user-pic" />
              <div>
                <strong>{comment.username}:</strong> {comment.text}
              </div>
            </div>
          ))}
          <Comment onAddComment={handleAddComment} />
        </div>
      )}
    </div>
  );
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  postText: PropTypes.string.isRequired,
  postImage: PropTypes.string,
  postTime: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Post;







// import PropTypes from 'prop-types';
// import { Modal, Button, Form } from 'react-bootstrap';
// import LikeIcon from '../../icons/comment-icons/like.png';
// import CommentIcon from '../../icons/comment-icons/comment-icon.png';
// import Comment from './Comment';
// import ShareIcon from '../../icons/comment-icons/share.png';
// import EditIcon from '../../icons/post-icons/pen.png';
// import DeleteIcon from '../../icons/post-icons/trash.png';
// import '../../styles/MidSection/Post.css';
// import MichaelPic from '../../icons/spam/Michael.png';


// function Post({ id, username, userPic, postText, postImage, postTime, onDelete, onEdit }) {
//   const [editingPostText, setEditingPostText] = useState(postText);
//   const [editingPostImage, setEditingPostImage] = useState(postImage);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [removeImage, setRemoveImage] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [commentSectionOpen, setCommentSectionOpen] = useState(false);

//   const addComment = (comment) => {
//     setComments([...comments, comment]);
//   };

//   const handleDeleteComment = (commentId) => {
//     const updatedComments = comments.filter((comment) => comment.id !== commentId);
//     setComments(updatedComments);
//   };

//   const handleEditComment = (commentId, newText) => {
//     const updatedComments = comments.map((comment) =>
//       comment.id === commentId ? { ...comment, text: newText } : comment
//     );
//     setComments(updatedComments);
//   };

//   const handleDelete = () => {
//     onDelete(id);
//   };

//   const handleEdit = () => {
//     if (postImage && !removeImage) {
//       setEditingPostImage(postImage);
//     } else {
//       setEditingPostImage(null);
//     }
//     setEditModalOpen(true);
//   };

//   const handleSaveEdit = () => {
//     const shouldRemoveImage = editingPostImage === null;
//     onEdit(id, editingPostText, shouldRemoveImage ? '' : editingPostImage);
//     setEditModalOpen(false);
//   };

//   const handleEditCloseModal = () => {
//     setEditModalOpen(false);
//   };

//   const handleRemoveImage = () => {
//     setEditingPostImage(null);
//     setRemoveImage(true);
//     handleSaveEdit();
//   };

//   const handleAddComment = (commentText) => {
//     const newComment = {
//       id: Date.now(),
//       text: commentText,
//       username: 'Current User',
//       userPic: {MichaelPic}, // Insert user profile picture here
//     };
//     addComment(newComment);
//   };

//   return (
//     <div className="post">
//       <div className="post-header">
//         <div className="user-info">
//           <img src={userPic} alt="Profile Pic" className="profile-pic" />
//           <div className="username">{username}</div>
//           <div className="post-time">{postTime}</div>
//         </div>
//         <div className="post-actions">
//           <button className="delete-post-btn" onClick={handleDelete}>
//             <img src={DeleteIcon} alt="Delete" className="icon" />
//             Delete
//           </button>
//           <button className="edit-post-btn" onClick={handleEdit}>
//             <img src={EditIcon} alt="Edit" className="icon" />
//             Edit
//           </button>
//         </div>
//       </div>
//       <div className="post-content">
//         <p className="post-text">{postText}</p>
//         {editingPostImage && <img src={editingPostImage} alt="Post" className="post-image" />}
//       </div>
//       <div className="post-footer">
//         <button className="like-btn">
//           <img src={LikeIcon} alt="Like" className="icon" />
//           Like
//         </button>
//         <button className="comment-btn" onClick={() => setCommentSectionOpen(true)}>
//           <img src={CommentIcon} alt="Comment" className="icon" />
//           Comment
//         </button>
//         <button className="share-btn">
//           <img src={ShareIcon} alt="Share" className="icon" />
//           Share
//         </button>
//       </div>
//       <Modal show={editModalOpen} onHide={handleEditCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Post</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="message-text">
//               <Form.Label>Message:</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Edit your post..."
//                 defaultValue={editingPostText}
//                 onChange={(e) => setEditingPostText(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group controlId="image-file">
//               <Form.Label>Edit Picture:</Form.Label>
//               {editingPostImage && (
//                 <img
//                   src={editingPostImage}
//                   alt="Current Post"
//                   style={{ width: '100px', height: '100px', marginBottom: '10px' }}
//                 />
//               )}
//               <Form.Control type="file" onChange={(e) => setEditingPostImage(URL.createObjectURL(e.target.files[0]))} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="danger" onClick={handleRemoveImage}>Remove Pic</Button>
//           <Button variant="secondary" onClick={handleEditCloseModal}>Close</Button>
//           <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
//         </Modal.Footer>
//       </Modal>
//       {commentSectionOpen && (
//         <div className="comments-section">
//           {comments.map((comment) => (
//             <Comment
//               key={comment.id}
//               id={comment.id}
//               username={comment.username}
//               text={comment.text}
//               onEditComment={handleEditComment} // Pass the handleEditComment function
//               onDeleteComment={handleDeleteComment}
//             />
//           ))}
//           <Comment onAddComment={handleAddComment} />
//         </div>
//       )}
//     </div>
//   );
// }

// Post.propTypes = {
//   id: PropTypes.number.isRequired,
//   username: PropTypes.string.isRequired,
//   userPic: PropTypes.string.isRequired,
//   postText: PropTypes.string.isRequired,
//   postImage: PropTypes.string,
//   postTime: PropTypes.string.isRequired,
//   onDelete: PropTypes.func.isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default Post;


// // import React, { useState } from 'react';
// // import PropTypes from 'prop-types';
// // import { Modal, Button, Form } from 'react-bootstrap';

// // import '../../styles/MidSection/Post.css'; // Import the Post component CSS file

// // function Post({ id, username, userPic, postText, postImage, postTime, onDelete, onEdit }) {
// //   const [editingPostText, setEditingPostText] = useState(postText);
// //   const [editingPostImage, setEditingPostImage] = useState(postImage);
// //   const [editModalOpen, setEditModalOpen] = useState(false);

// //   const handleDelete = () => {
// //     onDelete(id); // Call the onDelete function with the post ID as an argument
// //   };

// //   const handleEdit = () => {
// //     setEditingPostImage(postImage);
// //     setEditModalOpen(true);
// //   };

// //   const handleSaveEdit = () => {
// //     onEdit(id, editingPostText, editingPostImage);
// //     setEditModalOpen(false);
// //   };

// //   const handleEditCloseModal = () => {
// //     setEditModalOpen(false);
// //   };

// //   return (
// //     <div className="post">
// //             <div className="post-header">
// //         <div className="user-info">
// //           <img src={userPic} alt="Profile Pic" className="profile-pic" />
// //           <div className="username">{username}</div>
// //           <div className="post-time">{postTime}</div>
// //         </div>
// //         <div className="post-actions">
// //           <button className="delete-post-btn" onClick={handleDelete}>Delete Post</button>
// //           <button className="edit-post-btn" onClick={handleEdit}>Edit Post</button>
// //         </div>
// //       </div>
// //       <div className="post-content">
// //         <p className="post-text">{postText}</p>
// //         {postImage && <img src={postImage} alt="Post" className="post-image" />}
// //       </div>
// //       <div className="post-footer">
// //         <button className="like-btn">Like</button>
// //         <button className="comment-btn">Comment</button>
// //         <button className="share-btn">Share</button>
// //       </div>
// //       <Modal show={editModalOpen} onHide={handleEditCloseModal}>
// //       <Modal.Header closeButton>
// //           <Modal.Title>Edit Post</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form>
// //             <Form.Group controlId="message-text">
// //               <Form.Label>Message:</Form.Label>
// //               <Form.Control as="textarea" rows={3} placeholder="Edit your post..." defaultValue={editingPostText} onChange={e => setEditingPostText(e.target.value)} />
// //             </Form.Group>
// //             <Form.Group controlId="image-file">
// //               <Form.Label>Edit Picture:</Form.Label>
// //               {editingPostImage && <img src={editingPostImage} alt="Current Post" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />}
// //               <Form.Control type="file" onChange={e => setEditingPostImage(URL.createObjectURL(e.target.files[0]))} />
// //             </Form.Group>
// //           </Form>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleEditCloseModal}>Close</Button>
// //           <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button> {/* Updated this line */}
// //         </Modal.Footer>
// //       </Modal>
// //     </div>
// //   );
// // }

// // Post.propTypes = {
// //   id: PropTypes.number.isRequired, // Add the id prop type
// //   username: PropTypes.string.isRequired,
// //   profilePic: PropTypes.string.isRequired, // Corrected prop name to profilePic
// //   postText: PropTypes.string.isRequired,
// //   postImage: PropTypes.string, // Post image is optional
// //   postTime: PropTypes.string.isRequired, // Time of the post
// //   onDelete: PropTypes.func.isRequired, // onDelete function to handle post deletion
// // };
// // export default Post;


// // // import React, { useState } from 'react';
// // // import PropTypes from 'prop-types';
// // // import { Modal, Button, Form } from 'react-bootstrap';

// // // import '../../styles/MidSection/Post.css'; // Import the Post component CSS file

// // // function Post({ id, username, userPic, postText, postImage, postTime, onDelete, onEdit }) {
// // //   const [editingPostText, setEditingPostText] = useState(postText);
// // //   const [editingPostImage, setEditingPostImage] = useState(postImage);
// // //   const [editModalOpen, setEditModalOpen] = useState(false);

// // //   const handleDelete = () => {
// // //     onDelete(id); // Call the onDelete function with the post ID as an argument
// // //   };

// // //   const handleEdit = () => {
// // //     setEditingPostImage(postImage);
// // //     setEditModalOpen(true);
// // //   };
// // //   const handleSaveEdit = () => {
// // //     onEdit(id, editingPostText, editingPostImage);
// // //     setEditModalOpen(false);
// // //   };
// // //   const handleEditCloseModal = () => {
// // //     setEditModalOpen(false);
// // //   };

// // //   return (
// // //     <div className="post">
// //       // <div className="post-header">
// //       //   <div className="user-info">
// //       //     <img src={userPic} alt="Profile Pic" className="profile-pic" />
// //       //     <div className="username">{username}</div>
// //       //     <div className="post-time">{postTime}</div>
// //       //   </div>
// //       //   <div className="post-actions">
// //       //     <button className="delete-post-btn" onClick={handleDelete}>Delete Post</button>
// //       //     <button className="edit-post-btn" onClick={handleEdit}>Edit Post</button>
// //       //   </div>
// //       // </div>
// //       // <div className="post-content">
// //       //   <p className="post-text">{postText}</p>
// //       //   {postImage && <img src={postImage} alt="Post" className="post-image" />}
// //       // </div>
// //       // <div className="post-footer">
// //       //   <button className="like-btn">Like</button>
// //       //   <button className="comment-btn">Comment</button>
// //       //   <button className="share-btn">Share</button>
// //       // </div>

// // //       <Modal show={editModalOpen} onHide={handleEditCloseModal}>
// //         // <Modal.Header closeButton>
// //         //   <Modal.Title>Edit Post</Modal.Title>
// //         // </Modal.Header>
// //         // <Modal.Body>
// //         //   <Form>
// //         //     <Form.Group controlId="message-text">
// //         //       <Form.Label>Message:</Form.Label>
// //         //       <Form.Control as="textarea" rows={3} placeholder="Edit your post..." defaultValue={editingPostText} onChange={e => setEditingPostText(e.target.value)} />
// //         //     </Form.Group>
// //         //     <Form.Group controlId="image-file">
// //         //       <Form.Label>Edit Picture:</Form.Label>
// //         //       {editingPostImage && <img src={editingPostImage} alt="Current Post" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />}
// //         //       <Form.Control type="file" onChange={e => setEditingPostImage(URL.createObjectURL(e.target.files[0]))} />
// //         //     </Form.Group>
// //         //   </Form>
// //         // </Modal.Body>
// //         // <Modal.Footer>
// //         //   <Button variant="secondary" onClick={handleEditCloseModal}>Close</Button>
// //         //   <Button variant="primary" onClick={() => handleEditPost(editingPostId, editingPostText, editingPostImage)}>Save Changes</Button>
// //         // </Modal.Footer>
// // //       </Modal>
// // //     </div>
// // //   );
// // // }

// // // //   return (
// // // //     <div className="post">
// // // //       <div className="post-header">
// // // //         <div className="user-info">
// // // //           {/* The user pic needs to be modified to show the real user pic */}
// // // //           <img src={userPic} alt="Profile Pic" className="profile-pic" />
// // // //           <div className="username">{username}</div>
// // // //           <div className="post-time">{postTime}</div> {/* Display post time */}
// // // //         </div>
// // // //         <div className="post-actions">
// // // //           <button className="delete-post-btn" onClick={handleDelete}>Delete Post</button>
// // // //           <button className="edit-post-btn" onClick={handleEdit}>Edit Post</button>
// // // //         </div>
// // // //       </div>
// // // //       <div className="post-content">
// // // //         <p className="post-text">{postText}</p>
// // // //         {postImage && <img src={postImage} alt="Post" className="post-image" />} {/* Display post image if available */}
// // // //       </div>
// // // //       <div className="post-footer">
// // // //         <button className="like-btn">Like</button>
// // // //         <button className="comment-btn">Comment</button>
// // // //         <button className="share-btn">Share</button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // Post.propTypes = {
// // //   id: PropTypes.number.isRequired, // Add the id prop type
// // //   username: PropTypes.string.isRequired,
// // //   profilePic: PropTypes.string.isRequired, // Corrected prop name to profilePic
// // //   postText: PropTypes.string.isRequired,
// // //   postImage: PropTypes.string, // Post image is optional
// // //   postTime: PropTypes.string.isRequired, // Time of the post
// // //   onDelete: PropTypes.func.isRequired, // onDelete function to handle post deletion
// // // };

// // // export default Post;
