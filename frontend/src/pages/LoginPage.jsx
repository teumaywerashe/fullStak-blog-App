import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [signupUsername, setSignupUsername] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await axios.post('/api/v1/auth/login', {
        email: loginEmail,
        password: loginPassword,
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.name)
      navigate('/posts')
    } catch (err) {
      setError(err.response?.status === 401 ? 'Invalid email or password.' : 'Something went wrong.')
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await axios.post('/api/v1/auth/signup', {
        name: signupUsername,
        email: signupEmail,
        password: signupPassword,
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.name)
      navigate('/posts')
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong.')
    }
  }

  const switchForm = (e) => {
    e.preventDefault()
    setError('')
    setIsLogin(!isLogin)
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {isLogin ? (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="login-email">Email</label>
                <input
                  type="email"
                  id="login-email"
                  placeholder="Enter email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  placeholder="Enter password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-msg">{error}</p>}
              <button type="submit" className="btn">Login</button>
              <p className="switch">
                Don't have an account?{' '}
                <a href="#" onClick={switchForm}>Sign up</a>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="input-group">
                <label htmlFor="signup-username">Username</label>
                <input
                  type="text"
                  id="signup-username"
                  placeholder="Choose username"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="signup-email">Email</label>
                <input
                  type="email"
                  id="signup-email"
                  placeholder="Enter email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  placeholder="Create password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-msg">{error}</p>}
              <button type="submit" className="btn">Sign Up</button>
              <p className="switch">
                Already have an account?{' '}
                <a href="#" onClick={switchForm}>Login</a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default LoginPage
