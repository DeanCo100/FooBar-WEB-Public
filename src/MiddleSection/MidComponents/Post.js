import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import LikeIcon from '../../icons/comment-icons/like.png';
import LikedIcon from '../../icons/comment-icons/liked.png'; // Import the liked icon
import CommentIcon from '../../icons/comment-icons/comment-icon.png';
import Comment from './Comment'; // Import the Comment component
import ShareIcon from '../../icons/comment-icons/share.png';
import EditIcon from '../../icons/post-icons/pen.png';
import DeleteIcon from '../../icons/post-icons/trash.png';
import MichaelPic from '../../icons/spam/Michael.png';
import '../../styles/MidSection/Post.css'; 
import '../../styles/DarkMode.css'; // Import the dark mode CSS file

function Post({ id, username, userPic, postText, postImage, postTime, onDelete, onEdit, darkMode }) {
  const [editingPostText, setEditingPostText] = useState(postText);
  const [originalPostText, setOriginalPostText] = useState(postText); // Store the original post text
  const [editingPostImage, setEditingPostImage] = useState(postImage);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentSectionOpen, setCommentSectionOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');

  useEffect(() => {
    // Update the originalPostText state when the postText prop changes
    setOriginalPostText(postText);
  }, [postText]);


  const addComment = (comment) => {
    setComments([...comments, comment]);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    // Check if editingPostImage is already set before opening the modal
    if (editingPostImage) {
      setEditModalOpen(true);
    } else {
      if (postImage && !removeImage) {
        setEditingPostImage(postImage);
      } else {
        setEditingPostImage(null);
      }
      setEditModalOpen(true);
    }
        // Reset editingPostText to originalPostText
        setEditingPostText(originalPostText);
  };
  
  // Function that handles the edit post
  const handleSaveEdit = () => {
    const shouldRemoveImage = editingPostImage === null;
    onEdit(id, editingPostText, shouldRemoveImage ? '' : editingPostImage);
    setEditModalOpen(false);
  };
  // Closes the edit Modal
  const handleEditCloseModal = () => {
    setEditModalOpen(false);
  };

  // Handles the remove of the image from the post
  const handleRemoveImage = () => {
    setEditingPostImage(null);
    setRemoveImage(true);
    handleSaveEdit();
  };

  // Handle the adding of the comments to the posts.
  const handleAddComment = (commentText) => {
    const newComment = {
      id: Date.now(),
      text: commentText,
      username: 'Tzion Mea',
      userPic: MichaelPic,
    };
    setComments([...comments, newComment]);
  };
// Handle the deletion of comments from the posts.
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };
// Handle the edit of comments from posts.
  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
    const comment = comments.find(comment => comment.id === commentId);
    setEditedCommentText(comment.text);
  };
// Handle the cancellation of edit comments.
  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditedCommentText('');
  };
// Handles the save of the edited comments.
  const handleSaveEditedComment = () => {
    const index = comments.findIndex(comment => comment.id === editingCommentId);
    const updatedComments = [...comments];
    updatedComments[index] = { ...updatedComments[index], text: editedCommentText };
    setComments(updatedComments);
    setEditingCommentId(null);
    setEditedCommentText('');
  };
// Handles the click on the like button
  const handleLike = () => {
    setLiked(!liked);
  };


  return (
    <div className={`post ${darkMode ? 'dark-mode' : ''}`}>
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
        <button className="like-btn" onClick={handleLike}>
        <img src={liked ? LikedIcon : LikeIcon} alt="Like" className="icon" />
          {liked ? 'Liked' : 'Like'}
        </button>
        <button className="comment-btn" onClick={() => setCommentSectionOpen(!commentSectionOpen)}>
          <img src={CommentIcon} alt="Comment" className="icon" />
          Comment
        </button>
        {/* The dropdown to the share button */}
        <Dropdown>
        <Dropdown.Toggle variant="transparent" id="dropdown-basic" className='share-btn'>
          <img src={ShareIcon} alt="Share" className="icon" />
          Share
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ backgroundColor: darkMode ? '#65676B' : '' }}>
          <Dropdown.Item>Share now (Only me)</Dropdown.Item>
          <Dropdown.Item>Share to Feed</Dropdown.Item>
          <Dropdown.Item>Send in Messenger</Dropdown.Item>
          <Dropdown.Item>Send in WhatsApp</Dropdown.Item>
          <Dropdown.Item>Share to a page</Dropdown.Item>
          <Dropdown.Item>Send Share to a group</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Share on a friend's profile</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>
      {/* The edit modal to edit the post */}
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
          <Button variant="warning" onClick={handleRemoveImage}>Remove Pic</Button>
          <Button variant="secondary" onClick={handleEditCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Text Changes</Button>
        </Modal.Footer>
      </Modal>
      {commentSectionOpen && (
        <div className="comments-section">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <img src={comment.userPic} alt="User Pic" className="comment-user-pic" />
              <div>
                <strong className='usrnm-comment'>{comment.username}:</strong>
                {editingCommentId === comment.id ? (
                  <input
                    type="text"
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                  />
                ) : (
                  <span>{comment.text}</span>
                )}
              </div>
              <div className="comment-btns-wrapper">
                {editingCommentId === comment.id ? (
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
                    <button className="edit-comment-btn" onClick={() => handleEditComment(comment.id)}>
                      Edit
                    </button>
                    <button className="delete-comment-btn" onClick={() => handleDeleteComment(comment.id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          <Comment onAddComment={handleAddComment} />
        </div>
      )}
    </div>
  );
}



export default Post;




