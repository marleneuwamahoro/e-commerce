import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const { setUser } = useUser()

  function handleSubmit(e) {
    e.preventDefault()

    fetch(`http://localhost:3000/users?email=${formData.email}`)
      .then(r => r.json())
      .then(data => {
        if (data.length > 0 && data[0].password === formData.password) {
          setUser(data[0])
          alert('Welcome back! ☕')
          navigate('/')
        } else {
          alert('Invalid email or password!')
        }
      })
      .catch(() => alert('Login failed. Try again.'))
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="loginPage">
      <div className="loginWrapper">
        <div className="loginForm">
          <h2 className="loginTitle">☕ Login</h2>

          <form onSubmit={handleSubmit}>
            <label className="loginLabel">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="marlene@me.dev"
              className="loginInput"
              required
            />

            <label className="loginLabel">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="loginInput"
              required
            />

            <button type="submit" className="loginBtn">
              Login
            </button>
          </form>

          <p className="loginHint">
            Test: marlene@me.dev / 1234
          </p>
        </div>
      </div>
    </div>
  )
}