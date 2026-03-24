
import './App.css'

function App() {
  

  return (
  <divv>
    <div class="container">
        
        <div class="form-box" id="login-box">
            <h2>Login</h2>
            <form>
                <div class="input-group">
                    <label for="login-email">Email</label>
                   
                    <input type="email" id="login-email" placeholder="Enter email" required/>
                </div>
                <div class="input-group">
                    <label for="login-password">Password</label>
                    <input type="password" id="login-password" placeholder="Enter password" required/>
                </div>
                <p id="login-confirm"></p>
                <button type="submit" class="login-btn btn">Login</button>
                <p class="switch">
                    Don't have an account?
                    <a href="#" onclick="showSignup()">Sign up</a>
                </p>
            </form>
        </div>

        
        <div class="form-box hidden" id="signup-box">
            <h2>Sign Up</h2>
            <form>
                <div class="input-group">
                    <label for="signup-username">Username</label>
                    <input type="text" id="signup-username" placeholder="Choose username" required/>
                </div>
                <div class="input-group">
                    <label for="signup-email">Email</label>
                    <input type="email" id="signup-email" placeholder="Enter email" required/>
                </div>
                <div class="input-group">
                    <label for="signup-password">Password</label>
                    <input type="password" id="signup-password" placeholder="Create password" required/>
                </div>
                <p id="signup-confirm"></p>
                <button type="submit" class="signup-btn btn">Sign Up</button>
                <p class="switch">
                    Already have an account?
                    <a href="#" onclick="showLogin()">Login</a>
                </p>
            </form>
        </div>
    </div>
  
</divv>

  )
}

export default App
