import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Post from './MidComponents/Post'; // Import the Post component
import postData from '../data/posts.json'; // Import the JSON data
import Story from '../MiddleSection/MidComponents/Story'; // Import the Story component
import storiesData from '../data/stories.json'; // Import the JSON data
import '../styles/MidSection/MidSection.css';
import '../styles/MidSection/Story.css';
import 'bootstrap/dist/css/bootstrap.css';
import FaceIcon from '../icons/header-icons/male-icon.png';
import LiveVideoIcon from '../icons/mid-section/video-camera.png';
import PhotoVideoIcon from '../icons/mid-section/photo-gallery.png';
import FeelingActivityIcon from '../icons/mid-section/smiling.png';
import MichaelPic from '../icons/spam/Michael.png';
import axios from 'axios';


function MidSection({ darkMode, profile }) {
  const [posts, setPosts] = useState([]);
  const [friendFilteredPosts, setFriendFilteredPosts] = useState([]);
  const [isFriendFilteredPosts, setIsFriendFilteredPosts] = useState(false);
  const [showNoFriendModal, setShowNoFriendModal] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(false); // Add state for friend request sent

  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [message, setMessage] = useState(''); // State for storing message value
  const [selectedFile, setSelectedFile] = useState(null);
  // Retrieve the JWT token from localStorage
  const token = localStorage.getItem('token');
  const usernameValue = profile.userName

  useEffect(() => {
    // Fetch posts from the server when the component mounts
    const fetchPosts = async () => {
      console.log(profile);
      console.log(profile.username);

      try {
        const response = await axios.get(`http://localhost:8080/api/posts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('lololo', response.data);
        // Update the posts state with the fetched posts
        setPosts(response.data);
        setFriendFilteredPosts(response.data);
        console.log(posts);
        console.log(friendFilteredPosts);
      } catch (error) {
        setFriendFilteredPosts([]);
        setPosts([]);
        console.error(error);
        alert('Failed to fetch posts. Please try again.');
      }
    };

    fetchPosts(); // Call the fetchPosts function
  }, [profile.username, token]);

// Function to return to the 'origin' feed.
const handleBackToFeed = () => {
  setFriendFilteredPosts([]);
  setIsFriendFilteredPosts(false);
};
// // Closes the No friend modal
// const handleCloseUserModal = () => {
//   setShowNoFriendModal(false);
// };




// Handles the friend request
// const handleFriendRequest = async () => {
//   try {
//     const response = await axios.post(`http://localhost:8080/api/users/${posterUsername}/friends`, {
//       userId: profile.userId,
//       friendId: posterUsername
//     });
//     setFriendRequestSent(true);
//   } catch (error) {
//     console.error(error);
//   }
// };


// ******** OLD IMPLEMENTATION of displaying posts
//   useEffect(() => {
//     setPosts(postData); // Initialize posts state with data from JSON file
// }, []);

  // Handler for opening the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Handler for closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handler for Posting the post
  const handleSend = async () => {
    // Check if message is empty or no file is selected
    if (!message.trim() && !selectedFile) {
    alert("Please enter some text or select an image to post.");
    return;
  }
// Encoding the picture before sending it to the server
  let updatedImageUrl;
  if(selectedFile != null) {
  updatedImageUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(selectedFile);
  });
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 16); // Get the date up to minutes
    // Create a new post object
    const newPost = {
      posterUsername: profile.username,
      username: profile.displayName, // Update with the current user's username
      userPic: profile.profilePic, // Update with the current user's profile picture URL
      postText: message,
      postImage: selectedFile ? updatedImageUrl : null, // Convert the file to base64.
      postTime: formattedDate // Get the current date and time
    };
    const usernameValue = profile.username;

    try {
      // Send a POST request to create a new post
      const response = await axios.post(`http://localhost:8080/api/users/${usernameValue}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Update the posts state with the new post
      setPosts([response.data, ...posts]);
      console.log(posts);

      // Close the modal after posting
      handleCloseModal();
    } catch (error) {
      // Check if error.response exists before accessing its properties
      if (error.response && error.response.status === 404) {
        alert('ERROR ERROR!!');
      } else {
        alert('You are unauthorized to post. Please try again.');
      }
    }
    
    // Reset the selectedFile state
    setSelectedFile(null);

    // Reset the Message state
    setMessage('');
  
    // Close the modal after sending the message
    handleCloseModal();

  };
  
  // Handler for deleting a post
  const handleDeletePost = async (postId) => {
    const usernameValue = profile.username;
    // Retrieve the post by postId
    const postToDelete = posts.find(post => post._id === postId);
    // Check if the connected user is the post's poster
    if (postToDelete.posterUsername !== usernameValue) {
      // If not, prompt an alert
      alert("No, No, No.. It's not your post!");
      return;
    }
    try {
      // Send a DELETE request to DELETE the post on the server
      const response = await axios.delete(`http://localhost:8080/api/users/${usernameValue}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Updating the posts UI
      setPosts(posts.filter(post => post._id !== postId));
      alert('Post has been deleted successfully');
// **********************************************
      } catch (error) {
        // Handle error if needed
        console.error(error);
        alert('Failed to delete post. Please try again.');
      }
  };
// Handler for editing a post
const handleEditPost = async (postId, newText, newImage) => {
  const usernameValue = profile.username;
  // Here we need to check as well that the user is the poster
  // Retrieve the post by postId
  const postToEdit = posts.find(post => post._id === postId);
  // Check if the connected user is the post's poster
  if (postToEdit.posterUsername !== usernameValue) {
       // If not, prompt an alert
       alert("No, No, No.. It's not your post!");
       return;
  }
  let updatedImageUrl;
  // Check if newImage is a data URL
  if (typeof newImage === 'string') {
    // Convert data URL to Blob
    const response = await fetch(newImage);
    const blob = await response.blob();
    // Encode Blob to data URL
    updatedImageUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  } else {
    // If newImage is already a Blob object, use it directly
    updatedImageUrl = newImage;
  }
  // Prepare the updated post object
  const updatedPost = {
    postText: newText,
    postImage: newImage === '' ? null : updatedImageUrl
  };
  try {
  // Send a PUT or PATCH request to update the post on the server
  const response = await axios.patch(`http://localhost:8080/api/users/${profile.username}/posts/${postId}`, updatedPost, {
    headers: {
      Authorization: `Bearer ${token}`

    }
  });
  // Update the local state with the updated post
  const updatedPosts = posts.map(post =>
    post._id === postId ? { ...post, ...updatedPost } : post
  );
  setPosts(updatedPosts);
  // MAYBE THIS OLD SKOOL WAY WILL WORK IF THE ABOVE DOESNT
//   const updatedPosts = posts.map(post =>
//   post.id === postId ? { ...post, postText: newText, postImage: newImage === '' ? null : newImage } : post
// );
// setPosts(updatedPosts);
  } catch (error) {
    // Handle error if needed
    console.error(error);
    alert('Failed to update post. Please try again.');
  }
};
  return (
    <div className={`mid-section ${darkMode ? 'dark-mode' : ''}`}>
      <div className="stories-section">
        {storiesData.map((story, index) => (
          <Story
            key={index}
            imageUrl={story.imageUrl}
            userProfileUrl={story.userProfileUrl}
            userName={story.userName}
          />
        ))}
      </div>
      <br></br>
      <div className='posts-section'>
        {/* Button to open the modal */}
        {/* Render 'whats-on-mind' section only if isFriendFilteredPosts is false */}
        {!isFriendFilteredPosts && (
        <div className={`whats-on-mind-div ${darkMode ? 'dark-mode' : ''}`}>
          {/* Input for user to add a post */}
          <img className="profile-pic-img" src={profile.profilePic} alt="Profile Pic" />
          <input type="button" className="enter-posts" value="Whats On Your Mind?" onClick={handleShowModal} />
          
          {/* Modal component */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="message-text">
                  <Form.Label>Message:</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Whats on your mind Mate?" onChange={e => setMessage(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="image-file">
                  <Form.Label>Add Picture:</Form.Label>
                  <Form.Control type="file" onChange={e => setSelectedFile(e.target.files[0])} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
              <Button variant="primary" onClick={handleSend}>Post</Button>
            </Modal.Footer>
          </Modal>
          {/* Container for three buttons */}
          <div className='three-buttons-div'>
            {/* Button 1: Live video */}
            <button className="action-button">
              <img src={LiveVideoIcon} alt="Live Video" />
              Live Video
            </button>
            {/* Button 2: Photo/Video */}
            <button className="action-button">
              <img src={PhotoVideoIcon} alt="Photo/Video" />
              Photo/Video
            </button>
            {/* Button 3: Feeling/Activity */}
            <button className="action-button">
              <img src={FeelingActivityIcon} alt="Feeling/Activity" />
              Feeling/Activity
            </button>
          </div>
        </div>
             )}

          {/* Render 'Back To Feed' button only if isFriendFilteredPosts is true */}
          {isFriendFilteredPosts && (
        <Button variant="outline-primary" className='back-to-feed-btn' onClick={handleBackToFeed}>Back To Feed</Button>
            )}
        {/* Additional content */}
        <div className="actual-posts">
          {/* Your existing content here */}
          <br></br>
          {/* Render friendFilteredPosts if isFriendFilteredPosts is true, else render posts */}
          {/* {posts.map(post => ( */}
          {(isFriendFilteredPosts ? friendFilteredPosts : posts).map(post => (
            <Post key={post._id} darkMode={darkMode} {...post} onDelete={handleDeletePost} onEdit={handleEditPost} profile={profile} posts={posts} // Pass the posts state
            setFriendFilteredPosts={setFriendFilteredPosts} 
            setIsFriendFilteredPosts={setIsFriendFilteredPosts} 
            // setShowNoFriendModal={setShowNoFriendModal}
            />
          ))}
{/* {(posts && (isFriendFilteredPosts ? friendFilteredPosts : posts) || []).map(post => (
  <Post
    key={post._id}
    darkMode={darkMode}
    {...post}
    onDelete={handleDeletePost}
    onEdit={handleEditPost}
    profile={profile}
    posts={posts}
    setFriendFilteredPosts={setFriendFilteredPosts}
    setIsFriendFilteredPosts={setIsFriendFilteredPosts}
  />
))} */}

        </div>
      </div>
    </div>
  );
}

export default MidSection;
