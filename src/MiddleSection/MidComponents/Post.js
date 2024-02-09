import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/MidSection/Post.css'; // Import the Post component CSS file

function Post({ username, userPic, postText, postImage, postTime }) {
  return (
    <div className="post">
      <div className="post-header">
        <div className="user-info">
          <img src={userPic} alt="Profile Pic" className="profile-pic" />
          <div className="username">{username}</div>
          <div className="post-time">{postTime}</div> {/* Display post time */}
        </div>
        <div className="post-actions">
          <button className="delete-post-btn">Delete Post</button>
          <button className="edit-post-btn">Edit Post</button>
        </div>
      </div>
      <div className="post-content">
        <p className="post-text">{postText}</p>
        {postImage && <img src={postImage} alt="Post" className="post-image" />} {/* Display post image if available */}
      </div>
      <div className="post-footer">
        <button className="like-btn">Like</button>
        <button className="comment-btn">Comment</button>
        <button className="share-btn">Share</button>
      </div>
    </div>
  );
}

Post.propTypes = {
  username: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  postText: PropTypes.string.isRequired,
  postImage: PropTypes.string, // Post image is optional
  postTime: PropTypes.string.isRequired, // Time of the post
};

export default Post;
