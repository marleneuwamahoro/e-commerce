import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import Navbar from '../compnents/Navbar'

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

  const pageStyle = {
    backgroundColor: '#8B6B4A',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }

  const formStyle = {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    backdropFilter: 'blur(10px)'
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    marginBottom: '16px',
    boxSizing: 'border-box'
  }

  const btnStyle = {
    width: '100%',
    padding: '13px',
    backgroundColor: '#5C2D0E',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer'
  }

  return (
    <div style={pageStyle}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={formStyle}>
          <h2 style={{ color: 'white', marginBottom: '24px', textAlign: 'center' }}>
            ☕ Login
          </h2>

          <form onSubmit={handleSubmit}>
            <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '6px', display: 'block' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="sam@me.dev"
              style={inputStyle}
              required
            />

            <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '6px', display: 'block' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={inputStyle}
              required
            />

            <button type="submit" style={btnStyle}>
              Login
            </button>
          </form>

          <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: '16px', fontSize: '0.85rem' }}>
            Test: sam@me.dev / 123456789
          </p>
        </div>
      </div>
    </div>
  )
}