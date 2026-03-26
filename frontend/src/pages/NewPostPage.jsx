import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './PostFormPage.css'

function NewPostPage() {
  const navigate = useNavigate()
  const [header, setHeader] = useState('')
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    try {
      await axios.post('/api/v1/posts', { postHeader: header, postText: text, username }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate('/posts')
    } catch {
      setError('Failed to create post. Try again.')
    }
  }

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="post-header">Title</label>
            <input
              type="text"
              id="post-header"
              placeholder="Post title"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="post-text">Content</label>
            <textarea
              id="post-text"
              placeholder="Write your post..."
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <div className="form-actions">
            <button type="button" className="btn-back" onClick={() => navigate('/posts')}>Back</button>
            <button type="submit" className="btn-submit">Publish</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPostPage
