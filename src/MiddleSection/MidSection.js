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


function MidSection() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [recipient, setRecipient] = useState(''); // State for storing recipient value
  const [message, setMessage] = useState(''); // State for storing message value
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingPostText, setEditingPostText] = useState(''); // Provide an initial value here
  const [editingPostImage, setEditingPostImage] = useState(null); // Provide an initial value here
  const [editModalOpen, setEditModalOpen] = useState(false);


  useEffect(() => {
    setPosts(postData); // Initialize posts state with data from JSON file
  }, []);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  // Handler for opening the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Handler for closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handler for closing the modal
  const handleEditCloseModal = () => {
    setEditModalOpen(false);
  };

  // Handler for Posting the post
  const handleSend = () => {
    // Check if message is empty or no file is selected
    if (!message.trim() && !selectedFile) {
    alert("Please enter some text or select an image to post.");
    return;
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 16); // Get the date up to minutes
    // Create a new post object
    const newPost = {
      id: Date.now(), // Generate a unique ID for the post
      username: 'James Richardson', // Update with the current user's username
      profilePic: 'https://source.unsplash.com/150x150/?male', // Update with the current user's profile picture URL
      postText: message,
      postImage: selectedFile ? URL.createObjectURL(selectedFile) : null, // Convert selected file to a URL if available
      postTime: formattedDate // Get the current date and time
    };
  
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
  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };
// Handler for editing a post
const handleEditPost = (postId, newText, newImage) => {
  // Find the post by ID and update its text and image
  const updatedPosts = posts.map(post =>
    post.id === postId ? { ...post, postText: newText, postImage: newImage === '' ? null : newImage } : post
  );
  setPosts(updatedPosts);
};

// // Handler for editing a post
//   const handleEditPost = (postId, newText, newImage) => {
//     // Find the post by ID and update its text and image
//     const updatedPosts = posts.map(post =>
//       post.id === postId ? { ...post, postText: newText, postImage: newImage } : post
//     );
//     setPosts(updatedPosts);
//   };
  

  return (
    <div className="mid-section">
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
        <div className='whats-on-mind-div'>
          {/* Input for user to add a post */}
          <img className="profile-pic-img" src={FaceIcon} alt="Profile Pic" />
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
            <Post key={post.id} {...post} onDelete={handleDeletePost} onEdit={handleEditPost}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MidSection;




// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import Post from './MidComponents/Post'; // Import the Post component
// import postData from '../data/posts.json'; // Import the JSON data
// import Story from '../MiddleSection/MidComponents/Story'; // Import the Story component
// import storiesData from '../data/stories.json'; // Import the JSON data
// import '../styles/MidSection/MidSection.css';
// import '../styles/MidSection/Story.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import FaceIcon from '../icons/header-icons/male-icon.png';
// import LiveVideoIcon from '../icons/mid-section/video-camera.png';
// import PhotoVideoIcon from '../icons/mid-section/photo-gallery.png';
// import FeelingActivityIcon from '../icons/mid-section/smiling.png';

// function MidSection() {
//   const [posts, setPosts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [recipient, setRecipient] = useState('');
//   const [message, setMessage] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editingPostId, setEditingPostId] = useState(null);

//   useEffect(() => {
//     setPosts(postData);
//   }, []);

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleEditModalOpen = (postId, newImage) => {
//     setEditingPostId(postId);
//     setEditModalOpen(true);
//   };

//   const handleSend = () => {
//     if (!message.trim() && !selectedFile) {
//       alert("Please enter some text or select an image to post.");
//       return;
//     }

//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().slice(0, 16);
//     const newPost = {
//       id: Date.now(),
//       username: 'James Richardson',
//       profilePic: 'https://source.unsplash.com/150x150/?male',
//       postText: message,
//       postImage: selectedFile ? URL.createObjectURL(selectedFile) : null,
//       postTime: formattedDate
//     };
//     setPosts([newPost, ...posts]);
//     setSelectedFile(null);
//     setMessage('');
//     handleCloseModal();
//   };

//   const handleDeletePost = (postId) => {
//     setPosts(posts.filter(post => post.id !== postId));
//   };

//   const handleEditPost = (postId, newText, newImage) => {
//     const updatedPosts = posts.map(post =>
//       post.id === postId ? { ...post, postText: newText, postImage: newImage } : post
//     );
//     setPosts(updatedPosts);
//     setEditModalOpen(false);
//     setEditingPostId(null);
//   };

//   return (
//     <div className="mid-section">
//       <div className="stories-section">
//       {storiesData.map((story, index) => (
//           <Story
//             key={index}
//             imageUrl={story.imageUrl}
//             userProfileUrl={story.userProfileUrl}
//             userName={story.userName}
//           />
//         ))}
//       </div>
//       <br></br>
//       <div className='posts-section'>
//         <div className='whats-on-mind-div'>
//                     {/* Input for user to add a post */}
//                     <img className="profile-pic-img" src={FaceIcon} alt="Profile Pic" />
//           <input type="button" className="enter-posts" value="Whats On Your Mind?" onClick={handleShowModal} />
          
//           {/* Modal component */}
//           <Modal show={showModal} onHide={handleCloseModal}>
//             <Modal.Header closeButton>
//               <Modal.Title>Create Post</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form>
//                 <Form.Group controlId="message-text">
//                   <Form.Label>Message:</Form.Label>
//                   <Form.Control as="textarea" rows={3} placeholder="Whats on your mind Mate?" onChange={e => setMessage(e.target.value)} />
//                 </Form.Group>
//                 <Form.Group controlId="image-file">
//                   <Form.Label>Add Picture:</Form.Label>
//                   <Form.Control type="file" onChange={e => setSelectedFile(e.target.files[0])} />
//                 </Form.Group>
//               </Form>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
//               <Button variant="primary" onClick={handleSend}>Post</Button>
//             </Modal.Footer>
//           </Modal>
//           {/* Container for three buttons */}
//           <div className='three-buttons-div'>
//             {/* Button 1: Live video */}
//             <button className="action-button">
//               <img src={LiveVideoIcon} alt="Live Video" />
//               Live Video
//             </button>
//             {/* Button 2: Photo/Video */}
//             <button className="action-button">
//               <img src={PhotoVideoIcon} alt="Photo/Video" />
//               Photo/Video
//             </button>
//             {/* Button 3: Feeling/Activity */}
//             <button className="action-button">
//               <img src={FeelingActivityIcon} alt="Feeling/Activity" />
//               Feeling/Activity
//             </button>
//           </div>
//         </div>
//         {/* Additional content */}
//         <div className="actual-posts">
//           {posts.map(post => (
//             <Post key={post.id} {...post} onDelete={handleDeletePost} onEdit={handleEditModalOpen}/>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MidSection;


// // import { useState, useEffect } from 'react';
// // import { Modal, Button, Form } from 'react-bootstrap';
// // import Post from './MidComponents/Post'; // Import the Post component
// // import postData from '../data/posts.json'; // Import the JSON data
// // import Story from '../MiddleSection/MidComponents/Story'; // Import the Story component
// // import storiesData from '../data/stories.json'; // Import the JSON data
// // import '../styles/MidSection/MidSection.css';
// // import '../styles/MidSection/Story.css';
// // import 'bootstrap/dist/css/bootstrap.css';
// // import FaceIcon from '../icons/header-icons/male-icon.png';
// // import LiveVideoIcon from '../icons/mid-section/video-camera.png';
// // import PhotoVideoIcon from '../icons/mid-section/photo-gallery.png';
// // import FeelingActivityIcon from '../icons/mid-section/smiling.png';


// // function MidSection() {
// //   const [posts, setPosts] = useState([]);
// //   const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
// //   const [recipient, setRecipient] = useState(''); // State for storing recipient value
// //   const [message, setMessage] = useState(''); // State for storing message value
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [editingPostText, setEditingPostText] = useState(''); // Provide an initial value here
// //   const [editingPostImage, setEditingPostImage] = useState(null); // Provide an initial value here
// //   const [editModalOpen, setEditModalOpen] = useState(false);


// //   useEffect(() => {
// //     setPosts(postData); // Initialize posts state with data from JSON file
// //   }, []);

// //   const addPost = (newPost) => {
// //     setPosts([...posts, newPost]);
// //   };

// //   // Handler for opening the modal
// //   const handleShowModal = () => {
// //     setShowModal(true);
// //   };

// //   // Handler for closing the modal
// //   const handleCloseModal = () => {
// //     setShowModal(false);
// //   };

// //   const handleEditModalOpen = (postId, newImage) => {
// //     setEditingPostId(postId);
// //     setEditModalOpen(true);
// //   };

// //   // Handler for Posting the post
// //   const handleSend = () => {
// //     // Check if message is empty or no file is selected
// //     if (!message.trim() && !selectedFile) {
// //     alert("Please enter some text or select an image to post.");
// //     return;
// //   }

// //   const currentDate = new Date();
// //   const formattedDate = currentDate.toISOString().slice(0, 16); // Get the date up to minutes
// //     // Create a new post object
// //     const newPost = {
// //       id: Date.now(), // Generate a unique ID for the post
// //       username: 'James Richardson', // Update with the current user's username
// //       profilePic: 'https://source.unsplash.com/150x150/?male', // Update with the current user's profile picture URL
// //       postText: message,
// //       postImage: selectedFile ? URL.createObjectURL(selectedFile) : null, // Convert selected file to a URL if available
// //       postTime: formattedDate // Get the current date and time
// //     };
  
// //     // Add the new post to the posts array
// //     setPosts([newPost, ...posts]);
    
// //     // Reset the selectedFile state
// //     setSelectedFile(null);

// //     // Reset the Message state
// //     setMessage('');
  
// //     // Close the modal after sending the message
// //     handleCloseModal();

// //   };
  
// //   // Handler for deleting a post
// //   const handleDeletePost = (postId) => {
// //     setPosts(posts.filter(post => post.id !== postId));
// //   };

// // // Handler for editing a post
// //   const handleEditPost = (postId, newText, newImage) => {
// //     // Find the post by ID and update its text and image
// //     const updatedPosts = posts.map(post =>
// //       post.id === postId ? { ...post, postText: newText, postImage: newImage } : post
// //     );
// //     setPosts(updatedPosts);
// //   };
  

// //   return (
// //     <div className="mid-section">
// //       <div className="stories-section">
//       //   {storiesData.map((story, index) => (
//       //     <Story
//       //       key={index}
//       //       imageUrl={story.imageUrl}
//       //       userProfileUrl={story.userProfileUrl}
//       //       userName={story.userName}
//       //     />
//       //   ))}
//       // </div>
//       // <br></br>
// //       <div className='posts-section'>
// //         {/* Button to open the modal */}
// //         <div className='whats-on-mind-div'>
//         //   {/* Input for user to add a post */}
//         //   <img className="profile-pic-img" src={FaceIcon} alt="Profile Pic" />
//         //   <input type="button" className="enter-posts" value="Whats On Your Mind?" onClick={handleShowModal} />
          
//         //   {/* Modal component */}
//         //   <Modal show={showModal} onHide={handleCloseModal}>
//         //     <Modal.Header closeButton>
//         //       <Modal.Title>Create Post</Modal.Title>
//         //     </Modal.Header>
//         //     <Modal.Body>
//         //       <Form>
//         //         <Form.Group controlId="message-text">
//         //           <Form.Label>Message:</Form.Label>
//         //           <Form.Control as="textarea" rows={3} placeholder="Whats on your mind Mate?" onChange={e => setMessage(e.target.value)} />
//         //         </Form.Group>
//         //         <Form.Group controlId="image-file">
//         //           <Form.Label>Add Picture:</Form.Label>
//         //           <Form.Control type="file" onChange={e => setSelectedFile(e.target.files[0])} />
//         //         </Form.Group>
//         //       </Form>
//         //     </Modal.Body>
//         //     <Modal.Footer>
//         //       <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
//         //       <Button variant="primary" onClick={handleSend}>Post</Button>
//         //     </Modal.Footer>
//         //   </Modal>
//         //   {/* Container for three buttons */}
//         //   <div className='three-buttons-div'>
//         //     {/* Button 1: Live video */}
//         //     <button className="action-button">
//         //       <img src={LiveVideoIcon} alt="Live Video" />
//         //       Live Video
//         //     </button>
//         //     {/* Button 2: Photo/Video */}
//         //     <button className="action-button">
//         //       <img src={PhotoVideoIcon} alt="Photo/Video" />
//         //       Photo/Video
//         //     </button>
//         //     {/* Button 3: Feeling/Activity */}
//         //     <button className="action-button">
//         //       <img src={FeelingActivityIcon} alt="Feeling/Activity" />
//         //       Feeling/Activity
//         //     </button>
//         //   </div>
//         // </div>
//         // {/* Additional content */}
// //         <div className="actual-posts">
// //           {/* Your existing content here */}
// //           <br></br>
// //            {posts.map(post => (
// //             <Post key={post.id} {...post} onDelete={handleDeletePost} onEdit={(postId, newText, newImage) => handleEditModalOpen(postId, newImage)}/>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default MidSection;





// // // import { useState, useEffect } from 'react';
// // // import { Modal, Button, Form } from 'react-bootstrap';
// // // import Post from './MidComponents/Post'; // Import the Post component
// // // import postData from '../data/posts.json'; // Import the JSON data
// // // import Story from '../MiddleSection/MidComponents/Story'; // Import the Story component
// // // import storiesData from '../data/stories.json'; // Import the JSON data
// // // import '../styles/MidSection/MidSection.css';
// // // import '../styles/MidSection/Story.css';
// // // import 'bootstrap/dist/css/bootstrap.css';
// // // import FaceIcon from '../icons/header-icons/male-icon.png';
// // // import LiveVideoIcon from '../icons/mid-section/video-camera.png';
// // // import PhotoVideoIcon from '../icons/mid-section/photo-gallery.png';
// // // import FeelingActivityIcon from '../icons/mid-section/smiling.png';


// // // function MidSection() {
// // //   const [posts, setPosts] = useState([]);
// // //   const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
// // //   const [recipient, setRecipient] = useState(''); // State for storing recipient value
// // //   const [message, setMessage] = useState(''); // State for storing message value
// // //   const [selectedFile, setSelectedFile] = useState(null);
// // //   const [editingPostText, setEditingPostText] = useState(postText);
// // //   const [editingPostImage, setEditingPostImage] = useState(postImage);
// // //   const [editModalOpen, setEditModalOpen] = useState(false);


// // //   useEffect(() => {
// // //     setPosts(postData); // Initialize posts state with data from JSON file
// // //   }, []);

// // //   const addPost = (newPost) => {
// // //     setPosts([...posts, newPost]);
// // //   };

// // //   // Handler for opening the modal
// // //   const handleShowModal = () => {
// // //     setShowModal(true);
// // //   };

// // //   // Handler for closing the modal
// // //   const handleCloseModal = () => {
// // //     setShowModal(false);
// // //   };

// // //   // Handler for closing the modal
// // //   const handleEditCloseModal = () => {
// // //     setEditModalOpen(false);
// // //   };

// // //   // Handler for Posting the post
// // //   const handleSend = () => {
// // //     // Check if message is empty or no file is selected
// // //     if (!message.trim() && !selectedFile) {
// // //     alert("Please enter some text or select an image to post.");
// // //     return;
// // //   }

// // //   const currentDate = new Date();
// // //   const formattedDate = currentDate.toISOString().slice(0, 16); // Get the date up to minutes
// // //     // Create a new post object
// // //     const newPost = {
// // //       id: Date.now(), // Generate a unique ID for the post
// // //       username: 'James Richardson', // Update with the current user's username
// // //       profilePic: 'https://source.unsplash.com/150x150/?male', // Update with the current user's profile picture URL
// // //       postText: message,
// // //       postImage: selectedFile ? URL.createObjectURL(selectedFile) : null, // Convert selected file to a URL if available
// // //       postTime: formattedDate // Get the current date and time
// // //     };
  
// // //     // Add the new post to the posts array
// // //     setPosts([newPost, ...posts]);
    
// // //     // Reset the selectedFile state
// // //     setSelectedFile(null);

// // //     // Reset the Message state
// // //     setMessage('');
  
// // //     // Close the modal after sending the message
// // //     handleCloseModal();

// // //   };
  
// // //   // Handler for deleting a post
// // //   const handleDeletePost = (postId) => {
// // //     setPosts(posts.filter(post => post.id !== postId));
// // //   };

// // // // Handler for editing a post
// // //   const handleEditPost = (postId, newText, newImage) => {
// // //     // Find the post by ID and update its text and image
// // //     const updatedPosts = posts.map(post =>
// // //       post.id === postId ? { ...post, postText: newText, postImage: newImage } : post
// // //     );
// // //     setPosts(updatedPosts);
// // //   };
  

// // //   return (
// // //     <div className="mid-section">
// // //       <div className="stories-section">
// // //         {storiesData.map((story, index) => (
// // //           <Story
// // //             key={index}
// // //             imageUrl={story.imageUrl}
// // //             userProfileUrl={story.userProfileUrl}
// // //             userName={story.userName}
// // //           />
// // //         ))}
// // //       </div>
// // //       <br></br>
// // //       <div className='posts-section'>
// // //         {/* Button to open the modal */}
// // //         <div className='whats-on-mind-div'>
// // //           {/* Input for user to add a post */}
// // //           <img className="profile-pic-img" src={FaceIcon} alt="Profile Pic" />
// // //           <input type="button" className="enter-posts" value="Whats On Your Mind?" onClick={handleShowModal} />
          
// // //           {/* Modal component */}
// // //           <Modal show={showModal} onHide={handleCloseModal}>
// // //             <Modal.Header closeButton>
// // //               <Modal.Title>Create Post</Modal.Title>
// // //             </Modal.Header>
// // //             <Modal.Body>
// // //               <Form>
// // //                 <Form.Group controlId="message-text">
// // //                   <Form.Label>Message:</Form.Label>
// // //                   <Form.Control as="textarea" rows={3} placeholder="Whats on your mind Mate?" onChange={e => setMessage(e.target.value)} />
// // //                 </Form.Group>
// // //                 <Form.Group controlId="image-file">
// // //                   <Form.Label>Add Picture:</Form.Label>
// // //                   <Form.Control type="file" onChange={e => setSelectedFile(e.target.files[0])} />
// // //                 </Form.Group>
// // //               </Form>
// // //             </Modal.Body>
// // //             <Modal.Footer>
// // //               <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
// // //               <Button variant="primary" onClick={handleSend}>Post</Button>
// // //             </Modal.Footer>
// // //           </Modal>
// // //           {/* Container for three buttons */}
// // //           <div className='three-buttons-div'>
// // //             {/* Button 1: Live video */}
// // //             <button className="action-button">
// // //               <img src={LiveVideoIcon} alt="Live Video" />
// // //               Live Video
// // //             </button>
// // //             {/* Button 2: Photo/Video */}
// // //             <button className="action-button">
// // //               <img src={PhotoVideoIcon} alt="Photo/Video" />
// // //               Photo/Video
// // //             </button>
// // //             {/* Button 3: Feeling/Activity */}
// // //             <button className="action-button">
// // //               <img src={FeelingActivityIcon} alt="Feeling/Activity" />
// // //               Feeling/Activity
// // //             </button>
// // //           </div>
// // //         </div>
// // //         {/* Additional content */}
// // //         <div className="actual-posts">
// // //           {/* Your existing content here */}
// // //           <br></br>
// // //            {posts.map(post => (
// // //             <Post key={post.id} {...post} onDelete={handleDeletePost} onEdit={handleEditPost}/>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default MidSection;
