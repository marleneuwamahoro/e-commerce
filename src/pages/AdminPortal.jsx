import { useState } from 'react'
import Navbar from '../compnents/Navbar'
import { UseProducts } from '../context/ProductContext'
import { useNavigate } from 'react-router-dom'

export default function AdminPortal() {
  const { products, setProducts } = UseProducts()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    description: '',
    origin: '',
    price: ''
  })

  const [error, setError] = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError({ ...error, [e.target.name]: '' })
  }

  function validate() {
    let errors = {}
    if (!form.name) errors.name = 'Coffee name is required'
    if (!form.description) errors.description = 'Description is required'
    if (!form.origin) errors.origin = 'Origin is required'
    if (!form.price) errors.price = 'Price is required'
    return errors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setError(errors)
      return
    }

    const newProduct = {
      name: form.name,
      description: form.description,
      origin: form.origin,
      price: parseFloat(form.price)
    }

    fetch('http://localhost:3000/coffee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then(r => r.json())
      .then(data => {
        setProducts(prev => [...prev, data])
        setForm({ name: '', description: '', origin: '', price: '' })
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      })
      .catch(() => {
        setProducts(prev => [...prev, { ...newProduct, id: Date.now() }])
        setForm({ name: '', description: '', origin: '', price: '' })
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      })
  }

  const pageStyle = {
    backgroundColor: '#8B6B4A',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }

  const contentStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px'
  }

  const formCardStyle = {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '600px',
    backdropFilter: 'blur(10px)'
  }

  const inputWrapStyle = {
    border: '1px dashed rgba(255,255,255,0.4)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px'
  }

  const labelStyle = {
    display: 'block',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '0.85rem',
    marginBottom: '6px'
  }

  // const inputStyle = {
  //   width: '100%',
  //   padding: '12px 16px',
  //   borderRadius: '8px',
  //   border: '2px solid transparent',
  //   backgroundColor: 'white',
  //   fontSize: '1rem',
  //   outline: 'none',
  //   boxSizing: 'border-box'
  // }
  const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '8px',
  border: '2px solid transparent',
  backgroundColor: 'white',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
  color: '#3D2B1F'   // ← add this
}

  const inputErrorStyle = {
    ...inputStyle,
    border: '2px solid #cc4444'
  }

  const errorTextStyle = {
    color: '#cc4444',
    fontSize: '0.8rem',
    marginTop: '4px'
  }

  const assistiveStyle = {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.75rem',
    marginTop: '4px'
  }

  const submitBtnStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#5C2D0E',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '10px'
  }

  return (
    <div style={pageStyle}>
      <Navbar />
      <div style={contentStyle}>
        <div style={formCardStyle}>
          <h3 style={{ color: '#9B7EFF', marginBottom: '20px', fontSize: '1.2rem' }}>
            ❖ Component
          </h3>

          {success && (
            <div style={{ backgroundColor: 'rgba(0,200,0,0.2)', color: 'white', padding: '10px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
              ✅ Coffee added successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Coffee Name */}
            <div style={inputWrapStyle}>
              <label style={labelStyle}>Coffee Name</label>
              <input
                name="name"
                type="text"
                placeholder="Type here"
                value={form.name}
                onChange={handleChange}
                style={error.name ? inputErrorStyle : inputStyle}
              />
              {error.name ? (
                <p style={errorTextStyle}>⚠ {error.name}</p>
              ) : (
                <p style={assistiveStyle}>Assistive Text</p>
              )}
            </div>

            {/* Description */}
            <div style={inputWrapStyle}>
              <label style={labelStyle}>Description</label>
              <input
                name="description"
                type="text"
                placeholder="Type here"
                value={form.description}
                onChange={handleChange}
                style={error.description ? inputErrorStyle : inputStyle}
              />
              {error.description ? (
                <p style={errorTextStyle}>⚠ {error.description}</p>
              ) : (
                <p style={assistiveStyle}>Assistive Text</p>
              )}
            </div>

            {/* Origin */}
            <div style={inputWrapStyle}>
              <label style={labelStyle}>Origin</label>
              <input
                name="origin"
                type="text"
                placeholder="Type here"
                value={form.origin}
                onChange={handleChange}
                style={error.origin ? inputErrorStyle : inputStyle}
              />
              {error.origin ? (
                <p style={errorTextStyle}>⚠ {error.origin}</p>
              ) : (
                <p style={assistiveStyle}>Assistive Text</p>
              )}
            </div>

            {/* Price */}
            <div style={inputWrapStyle}>
              <label style={labelStyle}>Price</label>
              <input
                name="price"
                type="number"
                step="0.01"
                placeholder="Type here"
                value={form.price}
                onChange={handleChange}
                style={error.price ? inputErrorStyle : inputStyle}
              />
              {error.price ? (
                <p style={errorTextStyle}>⚠ {error.price}</p>
              ) : (
                <p style={assistiveStyle}>Assistive Text</p>
              )}
            </div>

            <p style={{ color: '#9B7EFF', fontSize: '0.85rem', marginBottom: '10px' }}>
              ❖ Text in...
            </p>

            <button type="submit" style={submitBtnStyle}>
              Submit
            </button>
          </form>

          {/* Product list */}
          <div style={{ marginTop: '30px' }}>
            <h4 style={{ color: 'white', marginBottom: '12px' }}>All Products ({products.length})</h4>
            {products.map(p => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer', color: 'white' }}
              >
                <span>{p.name}</span>
                <span style={{ color: '#E8DDD0' }}>${p.price?.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}