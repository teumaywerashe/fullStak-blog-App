import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './PostFormPage.css'

function EditPostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [header, setHeader] = useState('')
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`/api/v1/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => {
      setHeader(data.postHeader)
      setText(data.postText)
    }).catch(() => navigate('/posts'))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const token = localStorage.getItem('token')
    try {
      await axios.patch(`/api/v1/posts/${id}`, { postHeader: header, postText: text }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate('/posts')
    } catch {
      setError('Failed to update post. Try again.')
    }
  }

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2>Edit Post</h2>
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
            <button type="submit" className="btn-submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPostPage
