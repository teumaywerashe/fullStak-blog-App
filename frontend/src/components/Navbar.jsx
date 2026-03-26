import { useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') || ''

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/posts')}>
        📝 BlogApp
      </div>
      <div className="navbar-right">
        <div className="avatar">{username.charAt(0).toUpperCase()}</div>
        <span className="nav-username">{username}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
