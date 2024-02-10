import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

import '../../styles/MidSection/Post.css'; // Import the Post component CSS file

function Post({ id, username, userPic, postText, postImage, postTime, onDelete, onEdit }) {
  const [editingPostText, setEditingPostText] = useState(postText);
  const [editingPostImage, setEditingPostImage] = useState(postImage);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);

  const handleDelete = () => {
    onDelete(id); // Call the onDelete function with the post ID as an argument
  };

  const handleEdit = () => {
    setEditingPostImage(postImage);
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    onEdit(id, editingPostText, removeImage ? '' : editingPostImage); // Pass empty string if removeImage is true
    setEditModalOpen(false);
  };

  const handleEditCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleRemoveImage = () => {
    setEditingPostImage(null); // Remove the image
    setRemoveImage(true); // Set removeImage to true
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
          <button className="delete-post-btn" onClick={handleDelete}>Delete Post</button>
          <button className="edit-post-btn" onClick={handleEdit}>Edit Post</button>
        </div>
      </div>
      <div className="post-content">
        <p className="post-text">{postText}</p>
        {editingPostImage && <img src={editingPostImage} alt="Post" className="post-image" />}
      </div>
      <div className="post-footer">
        <button className="like-btn">Like</button>
        <button className="comment-btn">Comment</button>
        <button className="share-btn">Share</button>
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
              {editingPostImage && <Button variant="danger" onClick={handleRemoveImage}>Remove Pic</Button>} {/* Add remove image button */}
              <Form.Control type="file" onChange={e => setEditingPostImage(URL.createObjectURL(e.target.files[0]))} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
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


// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Modal, Button, Form } from 'react-bootstrap';

// import '../../styles/MidSection/Post.css'; // Import the Post component CSS file

// function Post({ id, username, userPic, postText, postImage, postTime, onDelete, onEdit }) {
//   const [editingPostText, setEditingPostText] = useState(postText);
//   const [editingPostImage, setEditingPostImage] = useState(postImage);
//   const [editModalOpen, setEditModalOpen] = useState(false);

//   const handleDelete = () => {
//     onDelete(id); // Call the onDelete function with the post ID as an argument
//   };

//   const handleEdit = () => {
//     setEditingPostImage(postImage);
//     setEditModalOpen(true);
//   };

//   const handleSaveEdit = () => {
//     onEdit(id, editingPostText, editingPostImage);
//     setEditModalOpen(false);
//   };

//   const handleEditCloseModal = () => {
//     setEditModalOpen(false);
//   };

//   return (
//     <div className="post">
//             <div className="post-header">
//         <div className="user-info">
//           <img src={userPic} alt="Profile Pic" className="profile-pic" />
//           <div className="username">{username}</div>
//           <div className="post-time">{postTime}</div>
//         </div>
//         <div className="post-actions">
//           <button className="delete-post-btn" onClick={handleDelete}>Delete Post</button>
//           <button className="edit-post-btn" onClick={handleEdit}>Edit Post</button>
//         </div>
//       </div>
//       <div className="post-content">
//         <p className="post-text">{postText}</p>
//         {postImage && <img src={postImage} alt="Post" className="post-image" />}
//       </div>
//       <div className="post-footer">
//         <button className="like-btn">Like</button>
//         <button className="comment-btn">Comment</button>
//         <button className="share-btn">Share</button>
//       </div>
//       <Modal show={editModalOpen} onHide={handleEditCloseModal}>
//       <Modal.Header closeButton>
//           <Modal.Title>Edit Post</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="message-text">
//               <Form.Label>Message:</Form.Label>
//               <Form.Control as="textarea" rows={3} placeholder="Edit your post..." defaultValue={editingPostText} onChange={e => setEditingPostText(e.target.value)} />
//             </Form.Group>
//             <Form.Group controlId="image-file">
//               <Form.Label>Edit Picture:</Form.Label>
//               {editingPostImage && <img src={editingPostImage} alt="Current Post" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />}
//               <Form.Control type="file" onChange={e => setEditingPostImage(URL.createObjectURL(e.target.files[0]))} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleEditCloseModal}>Close</Button>
//           <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button> {/* Updated this line */}
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// Post.propTypes = {
//   id: PropTypes.number.isRequired, // Add the id prop type
//   username: PropTypes.string.isRequired,
//   profilePic: PropTypes.string.isRequired, // Corrected prop name to profilePic
//   postText: PropTypes.string.isRequired,
//   postImage: PropTypes.string, // Post image is optional
//   postTime: PropTypes.string.isRequired, // Time of the post
//   onDelete: PropTypes.func.isRequired, // onDelete function to handle post deletion
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
//       // <div className="post-header">
//       //   <div className="user-info">
//       //     <img src={userPic} alt="Profile Pic" className="profile-pic" />
//       //     <div className="username">{username}</div>
//       //     <div className="post-time">{postTime}</div>
//       //   </div>
//       //   <div className="post-actions">
//       //     <button className="delete-post-btn" onClick={handleDelete}>Delete Post</button>
//       //     <button className="edit-post-btn" onClick={handleEdit}>Edit Post</button>
//       //   </div>
//       // </div>
//       // <div className="post-content">
//       //   <p className="post-text">{postText}</p>
//       //   {postImage && <img src={postImage} alt="Post" className="post-image" />}
//       // </div>
//       // <div className="post-footer">
//       //   <button className="like-btn">Like</button>
//       //   <button className="comment-btn">Comment</button>
//       //   <button className="share-btn">Share</button>
//       // </div>

// //       <Modal show={editModalOpen} onHide={handleEditCloseModal}>
//         // <Modal.Header closeButton>
//         //   <Modal.Title>Edit Post</Modal.Title>
//         // </Modal.Header>
//         // <Modal.Body>
//         //   <Form>
//         //     <Form.Group controlId="message-text">
//         //       <Form.Label>Message:</Form.Label>
//         //       <Form.Control as="textarea" rows={3} placeholder="Edit your post..." defaultValue={editingPostText} onChange={e => setEditingPostText(e.target.value)} />
//         //     </Form.Group>
//         //     <Form.Group controlId="image-file">
//         //       <Form.Label>Edit Picture:</Form.Label>
//         //       {editingPostImage && <img src={editingPostImage} alt="Current Post" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />}
//         //       <Form.Control type="file" onChange={e => setEditingPostImage(URL.createObjectURL(e.target.files[0]))} />
//         //     </Form.Group>
//         //   </Form>
//         // </Modal.Body>
//         // <Modal.Footer>
//         //   <Button variant="secondary" onClick={handleEditCloseModal}>Close</Button>
//         //   <Button variant="primary" onClick={() => handleEditPost(editingPostId, editingPostText, editingPostImage)}>Save Changes</Button>
//         // </Modal.Footer>
// //       </Modal>
// //     </div>
// //   );
// // }

// // //   return (
// // //     <div className="post">
// // //       <div className="post-header">
// // //         <div className="user-info">
// // //           {/* The user pic needs to be modified to show the real user pic */}
// // //           <img src={userPic} alt="Profile Pic" className="profile-pic" />
// // //           <div className="username">{username}</div>
// // //           <div className="post-time">{postTime}</div> {/* Display post time */}
// // //         </div>
// // //         <div className="post-actions">
// // //           <button className="delete-post-btn" onClick={handleDelete}>Delete Post</button>
// // //           <button className="edit-post-btn" onClick={handleEdit}>Edit Post</button>
// // //         </div>
// // //       </div>
// // //       <div className="post-content">
// // //         <p className="post-text">{postText}</p>
// // //         {postImage && <img src={postImage} alt="Post" className="post-image" />} {/* Display post image if available */}
// // //       </div>
// // //       <div className="post-footer">
// // //         <button className="like-btn">Like</button>
// // //         <button className="comment-btn">Comment</button>
// // //         <button className="share-btn">Share</button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

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
