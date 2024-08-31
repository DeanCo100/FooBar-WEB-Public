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
import '../../styles/MidSection/Post.css';
import '../../styles/DarkMode.css'; // Import the dark mode CSS file
import axios from 'axios'; // Import axios

function Post({ _id, posterUsername, username, userPic, postText, postImage, postTime, likes, likedByUser, likeCount, onDelete, onEdit, darkMode, profile, setFriendFilteredPosts, setIsFriendFilteredPosts, setFriendToShow, setDisplayNameFriend, comments: initialComments }) {
  const [editingPostText, setEditingPostText] = useState(postText);
  const [originalPostText, setOriginalPostText] = useState(postText); // Store the original post text
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');
  const [commentSectionOpen, setCommentSectionOpen] = useState(false);
  const [likeShow, setLikeShow] = useState(likedByUser);
  const [numLikes, setNumLikes] = useState(likeCount);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [showNoFriendModal, setShowNoFriendModal] = useState(false); // State 
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [editingPostImage, setEditingPostImage] = useState(null); // Define editingPostImage state variable
  const token = localStorage.getItem('token');

    // Ensure that the comments are reset when the post changes (e.g., after a login)
    useEffect(() => {
      setComments(initialComments || []);
    }, [initialComments]);

  useEffect(() => {
    console.log(_id);
    // Update the originalPostText state when the postText prop changes
    setOriginalPostText(postText);
  }, [postText]);
  useEffect(() => {
    // Update the originalPostText state when the postText prop changes
  },[]);

// This function triggered when the 'user-info' is clicked
const handleUserClick = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/users/${posterUsername}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Assuming the response data contains information about friendship status
    const areFriends = response.data.areFriends;

    if (areFriends) {
      // alert(response.data.message);
      setFriendFilteredPosts(response.data.friendPosts);
      setIsFriendFilteredPosts(true);
      setFriendToShow(posterUsername);
      setDisplayNameFriend(username);
    } else {
      setShowNoFriendModal(true);
    }
  } catch (error) {
    console.error(error.response);
    alert('Failed to check friendship. Please try again.');
  }
};

  // Closes the No friend modal
const handleCloseUserModal = () => {
  setShowNoFriendModal(false);
};

// Handles the friend request
const handleFriendRequest = async () => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/users/${posterUsername}/friends`,
      {
        username: profile.username,
        friendUsername: posterUsername
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setFriendRequestSent(true);
  } catch (error) {
    console.error(error);
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Failed to send friend request. Please try again.");
    }
  }
};
  // const addComment = (comment) => {
  //   setComments([...comments, comment]);
  // };

  const handleDelete = () => {
    console.log('In DELETE POST')
    console.log(_id);
    onDelete(_id);
  };

  const handleEdit = () => {
    const usernameValue = profile.username;
    console.log('In EDIT POST')
    console.log(_id);

    // Check if the connected user is the post's poster
    if (posterUsername !== usernameValue) {
      // If not, prompt an alert
      alert("No, No, No.. It's not your post!");
      return;
    }

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
    onEdit(_id, editingPostText, shouldRemoveImage ? '' : editingPostImage);
    setEditModalOpen(true);
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


  //  ****** OLD IMPLEMENTATION WITHOUT SERVER SUPPORT ******
  // Handle the adding of the comments to the posts.
  // const handleAddComment = (commentText) => {
  //   const newComment = {
  //     id: Date.now(),
  //     text: commentText,
  //     username: profile.displayName,
  //     userPic: profile.profilePic,
  //   };
  //   setComments([...comments, newComment]);
  // };

  //  **** new implementation trying to support server ****
  // Handle the adding of comments to the posts.
  const handleAddComment = async (commentText) => {
    try {
      const newCommentData = {
        username: profile.username,  // Username from the profile object
        displayName: profile.displayName,
        profilePic: profile.profilePic,
        commentText: commentText,
        postId: _id  // Assuming _id is the post's ID available in the Post component
      };

      // Make a POST request to the server to add the comment
      const response = await axios.post(`/api/posts/${_id}/comments`, newCommentData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Comment added:', response.data.comment);  // Log the comment received from the server

      console.log('Comment added:', response.data.comment);  // Log the comment received from the server

      const newComment = response.data.comment;
  
      // Update the comments state using the same field names as the schema
      setComments([...comments, newComment]);
  
      // // After successfully adding the comment, update the comments in the state
      // setComments([...comments, response.data.comment]);

    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Failed to add comment. Please try again.');
    }
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

const handleLike = async () => {
  try {
    const postId = _id;
    const response = await axios.patch(
      `http://localhost:8080/api/users/${profile.username}/posts/${postId}/like`,
      { isLiked: !likeShow }, // Send the opposite of current liked status
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if(response.data.success) {
      setLikeShow(!likeShow);
            
      // Update numLikes based on the new like status
      const updatedLikeCount = response.data.likeCount;
      setNumLikes(updatedLikeCount);
    }
  } catch (error) {
    console.error(error);
    alert('Failed to update like status. Please try again.');
  }
};
  
  return (
    // The posts button and content sections
    <div className={`post ${darkMode ? 'dark-mode' : ''}`}>
      <div className="post-header">
        <div className="user-info" onClick={handleUserClick}> {/* Make user info clickable */}
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
        {/* Post content */}
        <p className="post-text">{postText}</p>
        {postImage && <img src={postImage} alt="Post" className="post-image" />}
      </div>
      {/* In the post footer the comments are */}
      <div className="post-footer">
        <button className="like-btn" onClick={handleLike}>
          <img src={likeShow ? LikedIcon : LikeIcon} alt="Like" className="icon" />
          {/* {likeShow ? 'Liked' : 'Like'} */}
          {`${numLikes} likes`}
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
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
      {/* The Comments section */}
      {commentSectionOpen && (
        <div className="comments-section">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <img src={comment.profilePic} alt="User Pic" className="comment-user-pic" />
              <div>
                <strong className='usrnm-comment'>{comment.displayName}:</strong>
                {editingCommentId === comment.id ? (
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
          <Comment onAddComment={handleAddComment} profile={profile} />
        </div>
      )}
      {/* The User Modal */}
      <Modal show={showNoFriendModal} onHide={handleCloseUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={userPic} alt="Profile Pic" className="profile-pic" />
          <p>Username: {username}</p>
          <Button variant="primary" onClick={handleFriendRequest}>
            {friendRequestSent ? 'Request Sent' : 'Add Friend'}
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Post;
