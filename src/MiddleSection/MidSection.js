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

  // Handler for sending the message
  const handleSend = () => {
    // Handle sending message logic here
    console.log('Sending message:', recipient, message);
    handleCloseModal(); // Close the modal after sending the message
  };

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
                  <Form.Control as="textarea" rows={3} placeholder="Whats on your mind Mate?" value={message} onChange={e => setMessage(e.target.value)} />
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
          <br></br>
           {posts.map(post => (
            <Post {...post}/>
          ))}
          <br></br>
          <br></br>
          <div>blop</div>
          <br></br>
          <div>BLOOOOOOOOOOOOOOOP</div>
          <div>blop</div>
          <br></br>
          <div>BLOOOOOOOOOOOOOOOP</div>
          <div>blop</div>
          <br></br>
          <div>BLOOOOOOOOOOOOOOOP</div>
          <div>blop</div>
          <br></br>
          <div>BLOOOOOOOOOOOOOOOP</div>
        </div>
      </div>
    </div>
  );
}

export default MidSection;




// import { useState } from 'react';
// import '../styles/MidSection/MidSection.css';
// import 'bootstrap/dist/css/bootstrap.css';


// function MidSection() {
//   const [posts, setPosts] = useState([]);

//   const addPost = (newPost) => {
//     setPosts([...posts, newPost]);
//   };
//   return (
//     <div className="mid-section">
//       <div className="stories-section">
//         <div>Story 1</div>
//         <div>Story 2</div>
//         <div>Story 3</div>
//         <div>Story 4</div>
//       </div>
//       <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>
// <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Open modal for @fat</button>
// <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal for @getbootstrap</button>

// <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//         <form>
//           <div class="mb-3">
//             <label for="recipient-name" class="col-form-label">Recipient:</label>
//             <input type="text" class="form-control" id="recipient-name"></input>
//           </div>
//           <div class="mb-3">
//             <label for="message-text" class="col-form-label">Message:</label>
//             <textarea class="form-control" id="message-text"></textarea>
//           </div>
//         </form>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Send message</button>
//       </div>
//     </div>
//   </div>
// </div>








//       <br></br>
//       <br></br>
//       <div>blop</div>
//       <br></br>
//       <br></br>
//       <div>blop</div>
//       <br></br>
//       <br></br>
//       <div>blop</div>
//       <br></br>
//       <br></br>
//       <div>blop</div>
//       <br></br>
//       <br></br>
//       <div>blop</div>
//       <br></br>
//       <br></br>
//       <div>blop</div>
//       <br></br>
//       <br></br>
//       <div>blop</div>
//       <br></br>
//       <br></br>
//       <div>BLOOOOOOOOOOOOOOOP</div>
//       <br></br>
//       <br></br>
      
//     </div>
//   );
// }

// export default MidSection;
