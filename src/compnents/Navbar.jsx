import { NavLink } from 'react-router-dom'
import { UseCart } from '../context/CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { cart, setCart } = UseCart()
  const [showCart, setShowCart] = useState(false)

  function removeItem(id) {
    setCart(prev => prev.filter(item => item.id !== id))
    fetch(`http://localhost:3000/cart/${id}`, { method: 'DELETE' })
  }

  function clearCart() {
    cart.forEach(item => fetch(`http://localhost:3000/cart/${item.id}`, { method: 'DELETE' }))
    setCart([])
    setShowCart(false)
  }

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0)

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 60px',
    backgroundColor: '#7A6352',
    position: 'sticky',
    top: 0,
    zIndex: 100
  }

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.3rem',
    fontWeight: '300',
    letterSpacing: '1px'
  }

  const activeLinkStyle = {
    ...linkStyle,
    borderBottom: '2px solid white',
    paddingBottom: '4px'
  }

  const cartBtnStyle = {
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '20px',
    padding: '8px 20px',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    letterSpacing: '0.5px'
  }

  const badgeStyle = {
    backgroundColor: '#5C2D0E',
    borderRadius: '50%',
    padding: '2px 7px',
    fontSize: '0.75rem',
    marginLeft: '8px'
  }

  const dropdownStyle = {
    position: 'absolute',
    top: '70px',
    right: '60px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    width: '300px',
    zIndex: 200,
    overflow: 'hidden'
  }

  return (
    <>
      <nav style={navStyle}>
        <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
          Home
        </NavLink>
        <NavLink to="/shop" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
          Shop
        </NavLink>
        <NavLink to="/admin" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
          Admin Portal
        </NavLink>

        <button style={cartBtnStyle} onClick={() => setShowCart(prev => !prev)}>
          🛒 Cart <span style={badgeStyle}>{cart.length}</span>
        </button>
      </nav>

      {showCart && (
        <div style={dropdownStyle}>
          <div style={{ backgroundColor: '#5C2D0E', color: 'white', padding: '14px 20px', fontSize: '1rem', fontWeight: '500' }}>
            🛒 My Cart ({cart.length} items)
          </div>

          {cart.length === 0 ? (
            <p style={{ padding: '20px', color: '#888', textAlign: 'center' }}>Your cart is empty!</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #f0f0f0' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: '500', fontSize: '0.95rem', color: '#3D2B1F' }}>{item.name}</p>
                    <p style={{ margin: 0, color: '#8B6B4A', fontSize: '0.85rem' }}>${parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    ✕ Remove
                  </button>
                </div>
              ))}

              <div style={{ padding: '14px 20px', backgroundColor: '#f9f7f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: '#3D2B1F' }}>
                  Total: <span style={{ color: '#5C2D0E' }}>${total.toFixed(2)}</span>
                </span>
                <button
                  onClick={clearCart}
                  style={{ backgroundColor: '#888', color: 'white', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Clear All
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}