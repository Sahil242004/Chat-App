# LiveChat – Real-Time Chat Application

A modern real-time chat application built using **MERN stack**, **Tailwind CSS**, and **Socket.IO**. It enables seamless, secure, and responsive messaging between users.

![React](https://img.shields.io/badge/Frontend-React-blue) ![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC) ![Node.js](https://img.shields.io/badge/Backend-Node.js-green) ![Express](https://img.shields.io/badge/Framework-Express-black) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen) ![Socket.IO](https://img.shields.io/badge/RealTime-Socket.IO-lightgrey) ![JWT](https://img.shields.io/badge/Auth-JWT-orange)

## 📚 Table of Contents

- [Demo](##-Demo)
- [Tech Stack](##-Tech-Stack)
- [Features](##-Features)
- [Run Locally](##-Run-Locally)
- [Folder Structure](####-folder-structure)
- [Screen Shots](##-Screenshots)

## Tech Stack

**Frontend:**

- React.js
- Tailwind CSS

**Backend:**

- Node.js
- Express.js

**Database:**

- MongoDB

**Real-Time Communication:**

- Socket.IO

**Authentication & Security:**

- JWT (JSON Web Tokens)
- Bcrypt for password hashing

**Other Tools & Libraries:**

- Axios
- Dotenv
- CORS

## Features

- **Real-Time Messaging** – Instant, bidirectional communication powered by Socket.IO.
- **User Authentication** – Secure signup/login using JWT and password hashing.
- **Private** – Support for one-to-one chat with multiple users.
- **Message Persistence** – All messages are stored in MongoDB for later access.
- **UI** – Built with React and Tailwind CSS.
- **User Management** – Profile handling and user-specific sessions.

## Run Locally

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally or use MongoDB Atlas

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sahil242004/Chat-App.git
   cd Chat-App/

   ```

2. **Install dependencies for both frontend and backend**

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Setup environment variables**

   ```bash
   check .env.example file
   ```

4. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

5. **Start the frontend**

   ```bash
   cd frontend
   npm start
   ```

6. **Dummy credentials**
   ```bash
   //for logging in as User , dummy credentials
   EMAIL = 'sahil@gmail.com/shivam@gmail.com/gaurav@gmail.com'
   PASSWORD = '1234567890'
   ```

Your are good to go!!

## Screenshots

![Screenshot](/Docs/Image1.png)
![Screenshot](/Docs/Image2.png)
![Screenshot](/Docs/Image3.png)
![Screenshot](/Docs/Image4.png)
![Screenshot](/Docs/Image5.png)
![Screenshot](/Docs/Image6.png)
