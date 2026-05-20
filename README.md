<div align="center">

# CloudSync
</div>

## Overview

CloudSync is a full-stack web application that allows users to securely upload, download, share and manage files. Built with Node.js, Express and MongoDB.

---

## Features

| Feature | Description |
|---|---|
| User Authentication | Secure signup and login with JWT tokens via bcryptjs |
| Password Strength Check | Real-time password strength indicator on signup |
| File Upload | Upload files via file picker (Multer) |
| File Preview | In-browser file viewer with iframe support |
| File Sharing | Generate shareable links via Web Share API (clipboard fallback) |
| File Delete | Remove files instantly from both disk and MongoDB |
| Dashboard | View total files, storage used, and manage everything in one place |
| Data Persistence | Files persist in MongoDB across sessions |
| AI Assistant | Built-in chatbot (Neeli) to help users navigate the app |
| Responsive Design | Fully functional on desktop and mobile |

---

## Architecture

```
Browser  -->  Static Frontend (HTML/CSS/JS)
                       |
                       v
           Express.js REST API (localhost:5000)
                       |
            ___________|___________
           |                       |
           v                       v
      MongoDB                   Local Disk
   (User & File Metadata)      (uploads/)
```

---

## Tech Stack

**Frontend**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-339933?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-1572B6?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)

**Key Libraries**

| Library | Purpose |
|---|---|
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| multer | File upload handling |
| mongoose | MongoDB ODM |
| cors | Cross-origin requests |
| dotenv | Environment configuration |

---

## Project Structure

```
CloudSync/
├── frontend/
│   ├── index.html          
│   ├── login.html         
│   ├── dashboard.html     
│   ├── viewer.html        
│   ├── style.css           
│   ├── cloudsync-bot.js   
│   └── assets/
│       └── CloudSync_logo.png
│
├── backend/
│   ├── server.js           
│   ├── .env                
│   ├── package.json
│   ├── models/
│   │   ├── User.js        
│   │   └── File.js         
│   ├── routes/
│   │   ├── authRoutes.js  
│   │   └── fileRoutes.js   
│   └── uploads/            
```

---

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user (name, email, password) |
| POST | `/api/auth/login` | Login and receive JWT token |

### Files (`/api/files`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/files/upload` | Upload a file (multipart/form-data) |
| GET | `/api/files/` | List all uploaded files |
| DELETE | `/api/files/:id` | Delete a file by ID |

---

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally on port 27017)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/CloudSync.git
   cd CloudSync
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Configure environment**

   The `.env` file in `backend/` should contain:

   ```
   MONGO_URI=mongodb://127.0.0.1:27017/cloudsync
   JWT_SECRET=your_secret_key
   ```

4. **Start MongoDB**

   Ensure MongoDB is running on `localhost:27017`.

5. **Start the backend server**

   ```bash
   cd backend
   node server.js
   ```

   Server starts on `http://localhost:5000`.

6. **Open the frontend**

   Open `frontend/index.html` in your browser, or serve it via a local HTTP server:

   ```bash
   npx serve frontend
   ```

---

## How It Works

1. User registers with name, email, and password (password strength is checked in real-time)
2. On login, the backend returns a JWT token stored in session storage
3. User uploads a file — Multer stores it in the `uploads/` directory
4. File metadata (name, size, path, timestamp) is saved to MongoDB
5. Files appear on the dashboard with View, Share, and Delete options
6. File sharing copies a viewer link to the clipboard (or uses Web Share API on mobile)
7. On delete — the file is removed from disk and the database record is deleted

---

## AI Assistant — Neeli

CloudSync includes **Neeli**, a built-in client-side AI assistant available as a floating chat widget on all pages. Neeli can help users with:

- How to upload files
- How to log in / register
- Project technology stack
- Navigation and troubleshooting

Neeli uses local keyword-based responses — no external API required.

---

## License

This project is open source and available under the MIT License.

---

<div align="center">
© 2026 CloudSync
</div>