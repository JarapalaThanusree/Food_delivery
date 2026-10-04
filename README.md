# QuickEats – Food Delivery App

QuickEats is a fully functional and secure food delivery application built using the MERN stack. It features robust user authentication, personalized order history, and an intuitive cart system for adding and managing food items. The application is designed with a focus on user convenience and seamless interaction for browsing, ordering, and food delivery.

## Commands to Run the App

- `npx create-react-app my-app`  
  Initializes the React application. Run this command inside your frontend project directory.

- `npm start`  
  Starts the React frontend after all dependencies are installed.

- `nodemon index.js`  
  Run this inside the backend directory (`cd backend`). This activates the backend server and connects it with the database.

## Key Features

- **Tech Stack**: React.js, MongoDB, Node.js, Express, Tailwind CSS, Bootstrap v5

- **Authentication**: Secure login and registration using JSON Web Tokens (JWT) and bcrypt for encrypted password storage.

- **Cart Management**:  
  - Automatically updates quantity if the same food item is added again.  
  - Allows selection of item type and quantity.  
  - Items can be removed from the cart easily.

- **Order History**:  
  After checkout, users can view their past orders in the "My Orders" section.

- **Location Support**:  
  Includes a "Get Location" button to fetch the user's current location for delivery assistance.

- **Cart Notifications**:  
  The cart button displays the total quantity of items, keeping users updated in real time.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Bootstrap v5  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Image Hosting**: Unsplash

