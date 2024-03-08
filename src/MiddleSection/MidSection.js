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
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [message, setMessage] = useState(''); // State for storing message value
  const [selectedFile, setSelectedFile] = useState(null);
  // Retrieve the JWT token from localStorage
  const token = localStorage.getItem('token');


  useEffect(() => {
    // Fetch posts from the server when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${profile.userName}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Update the posts state with the fetched posts
        setPosts(response.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch posts. Please try again.');
      }
    };

    fetchPosts(); // Call the fetchPosts function
  }, [profile.userName, token]);




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
    // reader.readAsDataURL(profilePic);
    reader.readAsDataURL(selectedFile);
  });
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 16); // Get the date up to minutes
    // Create a new post object
    const newPost = {
      id: Date.now(), // Generate a unique ID for the post- MAYBE NEED TO BE MODIFIED TO USERNAME WHICH WILL BE THE ID OF THE POST
      posterUserName: profile.userName,
      username: profile.displayName, // Update with the current user's username
      userPic: profile.profilePic, // Update with the current user's profile picture URL
      postText: message,
      postImage: selectedFile ? updatedImageUrl : null, // Convert the file to base64.
      postTime: formattedDate // Get the current date and time
    };
    console.log(newPost);
    console.log(newPost.postImage);

    const usernameValue = profile.userName;



    // **** Here we need to add a request to the server:
    // try {
    //   const response = await axios.post(`http://localhost:8080/api/users/${usernameValue}/posts`, newPost, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    //   // Handle response if needed
    // } catch (error) {
    //   // Handle error if needed
    //   alert('You are unauthorized to post. Please try again.')
    // }



    // Now here, after I posted the post to the server, the DB of posts has been changed, so I need to 'rerender' the posts list, but now from the server.
    // So I need to send a request to the server to get the updated posts list and then to present it.
    // For EXAMPLE:
    // const data = await response.json();
    // setPosts(data);
    
    
    // Add the new post to the posts array
    setPosts([newPost, ...posts]);
    
    // Reset the selectedFile state
    setSelectedFile(null);

    // Reset the Message state
    setMessage('');
  
    // Close the modal after sending the message
    handleCloseModal();

  };
  
  // Handler for deleting a post
  const handleDeletePost = async (postId) => {
    // Retrieve the post by postId
    const postToEdit = posts.find(post => post.id === postId);

    // Check if the connected user is the post's poster
    if (postToEdit.posterUserName !== profile.userName) {
      // If not, prompt an alert
      alert("No, No, No.. It's not your post!");
      return;
    }
    try {
      // Send a DELETE request to DELETE the post on the server
      const response = await axios.delete(`http://localhost:8080/api/users/${profile.username}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Updating the posts UI
      setPosts(posts.filter(post => post.id !== postId));

      } catch (error) {
        // Handle error if needed
        console.error(error);
        alert('Failed to update post. Please try again.');
      }
    setPosts(posts.filter(post => post.id !== postId));
    // We need to find in the DB that the 'posterUserName' matches the current connected username that is trying to delete the post, and if so, to send the request to the server.
  };
// Handler for editing a post
const handleEditPost = async (postId, newText, newImage) => {
  // Find the post by ID and update its text and image
  // Here we need to check as well that the user is the poster
    // Retrieve the post by postId
    const postToEdit = posts.find(post => post.id === postId);

    // Check if the connected user is the post's poster
    if (postToEdit.posterUserName !== profile.userName) {
      // If not, prompt an alert
      alert("No, No, No.. It's not your post!");
      return;
    }
    // Encoding the newImage to base64 before sending it to the server.
    let updatedImageUrl;
    //    if(newImage != null && newImage !== postToEdit.postImage)
    if(newImage != null) {
    updatedImageUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(newImage);
    });
    // The else is in case the pic didnt change, so it is already in base64
    } else {
      updatedImageUrl = postToEdit.postImage;
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

    // Handle response if needed
    // console.log(response.data); // Assuming the server sends back the updated post data

    // Update the local state with the updated post
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, ...updatedPost } : post
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
        {/* Additional content */}
        <div className="actual-posts">
          {/* Your existing content here */}
          <br></br>
           {posts.map(post => (
            <Post key={post.id} darkMode={darkMode} {...post} onDelete={handleDeletePost} onEdit={handleEditPost} profile={profile}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MidSection;








