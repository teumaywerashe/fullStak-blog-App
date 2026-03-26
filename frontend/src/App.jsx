import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PostsPage from './pages/PostsPage'
import NewPostPage from './pages/NewPostPage'
import EditPostPage from './pages/EditPostPage'

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/posts" element={<PrivateRoute><PostsPage /></PrivateRoute>} />
        <Route path="/new-post" element={<PrivateRoute><NewPostPage /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditPostPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
