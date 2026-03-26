# Blog App

A full-stack blog application where users can sign up, log in, create posts, edit them, delete them, and read posts from other users.

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- CSS Modules (per-component styles)

### Backend
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcryptjs

## Project Structure

```
├── backend/
│   ├── collection/       # Auth & post controllers
│   ├── db/               # MongoDB connection
│   ├── middleware/        # JWT auth middleware
│   ├── module/           # Mongoose models (User, Post)
│   ├── route/            # Express routes
│   └── app.js
│
└── frontend/
    └── src/
        ├── components/   # Navbar, PostCard
        ├── pages/        # LoginPage, PostsPage, NewPostPage, EditPostPage
        ├── App.jsx        # Routes
        └── main.jsx
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas URI

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
LIFE_TIME=7d
PORT=3000
```

Then run:

```bash
node app.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:3000`.

## Features

- Sign up / Login with JWT
- View all posts from all users
- Create, edit, and delete your own posts
- Protected routes (redirect to login if not authenticated)

## Deployment

Hosted on [Render.com](https://fullstak-blog-app-2.onrender.com)
