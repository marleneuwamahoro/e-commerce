import { useParams, useNavigate } from 'react-router-dom'
import { UseProducts } from '../context/ProductContext'
import { UseCart } from '../context/CartContext'
import { useState } from 'react'
import Navbar from '../compnents/Navbar'

export default function ProductDetails() {
  const { id } = useParams()
  const { products, setProducts } = UseProducts()
  const { cart, setCart } = UseCart()
  const navigate = useNavigate()

  const product = products.find(p => String(p.id) === String(id))

  const [editing, setEditing] = useState(false)
  const [price, setPrice] = useState(product?.price || '')
  const [description, setDescription] = useState(product?.description || '')
  const [success, setSuccess] = useState(false)

  if (!product) {
    return (
      <div style={{ backgroundColor: '#8B6B4A', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ padding: '40px', color: 'white', textAlign: 'center' }}>
          <h2>Product not found!</h2>
          <button onClick={() => navigate('/shop')} style={{ padding: '10px 20px', backgroundColor: '#5C2D0E', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}>
            ← Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const isInCart = cart.some(item => item.coffeeId === product.id)

  function addToCart() {
    if (isInCart) return

    const { id: coffeeId, ...rest } = product

    fetch('http://localhost:3000/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...rest, coffeeId })
    })
      .then(r => r.json())
      .then(saved => setCart(prev => [...prev, saved]))
      .catch(() => setCart(prev => [...prev, { ...product, coffeeId: product.id }]))
  }

  function handleUpdate(e) {
    e.preventDefault()
    const updated = { ...product, price: parseFloat(price), description }

    fetch(`http://localhost:3000/coffee/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: parseFloat(price), description })
    })
      .then(() => {
        setProducts(prev => prev.map(p => p.id === product.id ? updated : p))
        setEditing(false)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      })
      .catch(() => {
        setProducts(prev => prev.map(p => p.id === product.id ? updated : p))
        setEditing(false)
      })
  }

  const pageStyle = { backgroundColor: '#8B6B4A', minHeight: '100vh', display: 'flex', flexDirection: 'column' }
  const contentStyle = { flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }
  const cardStyle = { backgroundColor: '#E8DDD0', borderRadius: '16px', padding: '40px', maxWidth: '600px', width: '100%', color: '#3D2B1F' }
  const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', marginBottom: '12px', boxSizing: 'border-box' }
  const btnStyle = { padding: '10px 24px', backgroundColor: '#5C2D0E', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.95rem' }

  return (
    <div style={pageStyle}>
      <Navbar />
      <div style={contentStyle}>
        <button onClick={() => navigate('/shop')} style={{ ...btnStyle, marginBottom: '20px', alignSelf: 'flex-start' }}>
          ← Back to Shop
        </button>

        <div style={cardStyle}>
          {success && (
            <div style={{ backgroundColor: 'rgba(0,150,0,0.15)', color: 'green', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>
              ✅ Product updated successfully!
            </div>
          )}

          <h2 style={{ marginBottom: '8px' }}>{product.name}</h2>
          <span style={{ backgroundColor: '#8B6B4A', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>
            {product.origin}
          </span>

          {editing ? (
            <form onSubmit={handleUpdate} style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Price ($)</label>
              <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} style={inputStyle} required />
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Description</label>
              <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} style={inputStyle} required />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={btnStyle}>💾 Save</button>
                <button type="button" onClick={() => setEditing(false)} style={{ ...btnStyle, backgroundColor: '#999' }}>Cancel</button>
              </div>
            </form>
          ) : (
            <div style={{ marginTop: '20px' }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#5C2D0E' }}>${product.price?.toFixed(2)}</p>
              <p style={{ color: '#6B4F3A', lineHeight: '1.6' }}>{product.description}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={addToCart} style={{ ...btnStyle, opacity: isInCart ? 0.6 : 1 }} disabled={isInCart}>
                  {isInCart ? '✅ In Cart' : '🛒 Add to Cart'}
                </button>
                <button onClick={() => { setEditing(true); setPrice(product.price); setDescription(product.description) }} style={{ ...btnStyle, backgroundColor: '#7A6352' }}>
                  ✏️ Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}