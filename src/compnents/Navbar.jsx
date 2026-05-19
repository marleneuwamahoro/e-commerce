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

  return (
    <>
      <nav className='navStyle'>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          Home
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          Shop
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? "active link" : "link")}
        >
          Admin Portal
        </NavLink>

        <button className="cartBtn" onClick={() => setShowCart(prev => !prev)}>
          🛒 Cart <span className="badge">{cart.length}</span>
        </button>
      </nav>

      {showCart && (
        <div className="dropdown">
          <div className="dropdownHeader">
            🛒 My Cart ({cart.length} items)
          </div>

          {cart.length === 0 ? (
            <p className="emptyCart">Your cart is empty!</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cartItem">
                  <div>
                    <p className="itemName">{item.name}</p>
                    <p className="itemPrice">${parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <button className="removeBtn" onClick={() => removeItem(item.id)}>
                    ✕ Remove
                  </button>
                </div>
              ))}

              <div className="cartFooter">
                <span className="totalText">
                  Total: <span className="totalPrice">${total.toFixed(2)}</span>
                </span>
                <button className="clearBtn" onClick={clearCart}>
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