# Welcome to FooBar (Server-Client Edition (This is the Web repo))

## About the project:
This project is a social-network named FooBar, based on Facebook. This repository is the Web repository of the project.

#### Notes: 
1. At the beginning, as the DB is local, there are no posts or users, so you need to create at least one to connect to FooBar.
2. We provide you a config folder, in the env.local file we decided that the project will run on port 8080 and the connection to the MongoDB is done with this string 'CONNECTION_STRING = "mongodb://127.0.0.1:27017/FooBar"
' so please keep the 8080 port free to use, and the mongo as well.

### Now, how it works?

1. Clone the project from the github and unzip it.
2. Navigate to the root folder of the project and run the command 'npm install' or 'npm i' (this command will install all the necessary dependencies to the project).
3. To run the program, make sure that you are on the 'root' folder of the server-project and run the command 'npm start'
4. To get to the 'Feed' page, you first need to register anc create an account, and then you'll move back to the signIn page and you can connect with your details.
5. Now, all you need to do is enjoy FooBar :).


# UI Experience Demostration:
1. Login page: (You need to click 'Create Account' button, to create an account)
![alt text](<screenshotsUI/Screenshot 2024-03-11 152458.png>)
2. Sign Up page: (You can see in the next pic what is a valid input to create an account)
![alt text](<screenshotsUI/Screenshot 2024-03-11 152526.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 152608.png>)
3. After you created an account and logged in, that's the Feed page you'll see:
![alt text](<screenshotsUI/Screenshot 2024-03-11 152813.png>)
4. On the left side, you have buttons for edit profile, delete your profile, log out and toggle between light to dark mode:
![alt text](<screenshotsUI/Screenshot 2024-03-11 152827.png>)
5. By click the 'Whats On Your Mind', You will be able to add a post.
![alt text](<screenshotsUI/Screenshot 2024-03-11 160558.png>) 

![alt text](<screenshotsUI/Screenshot 2024-03-11 160621.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 153006.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 153101.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 153122.png>)
6. By clicking on a user's profile pic or name in his post, you will be able to send him a friend request (if you aren't firends yet)

![alt text](<screenshotsUI/Screenshot 2024-03-11 153135.png>)
7. You can comment and like posts (note: the DB isn't supporting comments, so its only UI)
![alt text](<screenshotsUI/Screenshot 2024-03-11 153237.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 153354.png>)
8. You can not edit or delete posts that you didn't post.
![alt text](<screenshotsUI/Screenshot 2024-03-11 153418.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 153435.png>)
9. You can EDIT or DELTE your own posts.
![alt text](<screenshotsUI/Screenshot 2024-03-11 153456.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 153521.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 153623.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 153638.png>)
10. By clicking a profile pic or a name displayed on a post of a user that is your friend, you'll see only his posts, with an option to see his friends.
![alt text](<screenshotsUI/Screenshot 2024-03-11 153652.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 153705.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 153725.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 153750.png>)

## MongoDB status after this experience:

![alt text](<screenshotsUI/Screenshot 2024-03-11 154352.png>)

![alt text](<screenshotsUI/Screenshot 2024-03-11 154407.png>)
























