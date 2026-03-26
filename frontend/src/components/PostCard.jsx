import { useNavigate } from 'react-router-dom'
import './PostCard.css'

function PostCard({ post, currentUser, onDelete }) {
  const navigate = useNavigate()

  const formatted = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const isOwner = post.username === currentUser

  return (
    <div className="post-card">
      <div className="post-body">
        <h2 className="post-title">{post.postHeader}</h2>
        <p className="post-meta">by {post.username} · {formatted}</p>
        <p className="post-text">{post.postText}</p>
      </div>
      {isOwner && (
        <div className="post-actions">
          <button className="btn-edit" onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
          <button className="btn-delete" onClick={() => onDelete(post._id)}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default PostCard
