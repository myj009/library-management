import React from 'react'
import { useState } from 'react'
// import { auth } from './../../config/firebase'
// import { createUserWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  return (
    <div className="app-container">
    {/* card with 2 sides. Image on left side and signup form on the right sides */}
      <div className="card">
        <div className="left">
        </div>
        <div className="right">
          <div className="login_or_signup">
            <button className="login">Login</button>
            <button className="signup">Signup</button>
          </div>
          <form>
            <div className="form-control">
              <label htmlFor="email">Email id</label>
              <input type="email" name="email" id="email" onChange={handleEmailChange} value={email} />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" onChange={handlePasswordChange} value={password} />
            </div>
            <div className="form-control">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" name="confirm-password" id="confirm-password" onChange={handleConfirmPasswordChange} value={confirmPassword} />
            </div>
            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login