import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import './PostsPage.css'

function PostsPage() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])


  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')

  useEffect(() => {
    if (!token) { navigate('/'); return }
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/api/v1/posts', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPosts(data)
    } catch {
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPosts((prev) => prev.filter((p) => p._id !== id))
    } catch {
      alert('Failed to delete post.')
    }
  }

  return (
    <>
      <Navbar />
      <div className="posts-wrapper">
        <div className="posts-header">
          <h1>All Posts</h1>
          <button className="btn-new" onClick={() => navigate('/new-post')}>+ New Post</button>
        </div>
        {loading ? (
          <p className="status-msg">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="status-msg">No posts yet. Be the first to write one!</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} currentUser={username} onDelete={handleDelete} />
          ))
        )}
      </div>
    </>
  )
}

export default PostsPage
