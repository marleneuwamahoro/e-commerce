import { useState } from 'react'
import Navbar from '../compnents/Navbar'
import { UseProducts } from '../context/ProductContext'
import { UseCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Shop() {
  const { products } = UseProducts()
  const { cart, setCart } = UseCart()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedOrigins, setSelectedOrigins] = useState([])

  const origins = [...new Set(products.map(p => p.origin))]

  function toggleOrigin(origin) {
    setSelectedOrigins(prev =>
      prev.includes(origin)
        ? prev.filter(o => o !== origin)
        : [...prev, origin]
    )
  }

  const filtered = products.filter(p => {
    const matchSearch =
      (p.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (p.description ?? '').toLowerCase().includes(search.toLowerCase())
    const matchOrigin = selectedOrigins.length === 0 || selectedOrigins.includes(p.origin)
    return matchSearch && matchOrigin
  })

  function addToCart(product) {
    const isInCart = cart.some(item => item.coffeeId === product.id)
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

  const pageStyle = { backgroundColor: '#8B6B4A', minHeight: '100vh', display: 'flex', flexDirection: 'column' }
  const contentStyle = { display: 'flex', flex: 1, padding: '20px' }
  const sidebarStyle = { width: '200px', flexShrink: 0, paddingRight: '20px', paddingTop: '10px' }
  const searchStyle = { width: '100%', padding: '10px 16px', borderRadius: '25px', border: 'none', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '1rem', marginBottom: '20px', outline: 'none' }
  const originLabelStyle = { display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px', cursor: 'pointer', fontSize: '0.95rem' }
  const gridStyle = { flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignContent: 'start' }
  const cardStyle = { backgroundColor: '#E8DDD0', borderRadius: '16px', padding: '20px', cursor: 'pointer', transition: 'transform 0.2s' }
  const cardTitleStyle = { fontSize: '1.1rem', fontWeight: '500', color: '#3D2B1F', marginBottom: '10px' }
  const cardTextStyle = { color: '#6B4F3A', fontSize: '0.9rem', marginBottom: '6px' }

  return (
    <div style={pageStyle}>
      <Navbar />
      <div style={contentStyle}>
        <div style={sidebarStyle}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={searchStyle}
          />
          <div>
            {origins.map((origin, i) => (
              <label key={i} style={originLabelStyle}>
                <input
                  type="checkbox"
                  checked={selectedOrigins.includes(origin)}
                  onChange={() => toggleOrigin(origin)}
                  style={{ width: '14px', height: '14px' }}
                />
                {origin}
              </label>
            ))}
          </div>
        </div>

        <div style={gridStyle}>
          {filtered.map(product => {
            const isInCart = cart.some(item => item.coffeeId === product.id)
            return (
              <div key={product.id} style={cardStyle} onClick={() => navigate(`/product/${product.id}`)}>
                <h3 style={cardTitleStyle}>{product.name}</h3>
                <p style={cardTextStyle}>{product.description}</p>
                <p style={cardTextStyle}>Origin: {product.origin}</p>
                <p style={{ ...cardTextStyle, fontWeight: 'bold' }}>${product.price?.toFixed(2)}</p>
                <button
                  onClick={e => { e.stopPropagation(); addToCart(product) }}
                  style={{
                    marginTop: '8px',
                    padding: '6px 14px',
                    backgroundColor: isInCart ? '#6B4F3A' : '#5C2D0E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    width: '100%'
                  }}
                >
                  {isInCart ? '✅ Added' : '+ Add to Cart'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}