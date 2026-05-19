import { UseCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cart, setCart } = UseCart()

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id))
    fetch(`http://localhost:3000/cart/${id}`, { method: 'DELETE' })
  }

  function clearCart() {
    cart.forEach(item => {
      fetch(`http://localhost:3000/cart/${item.id}`, { method: 'DELETE' })
    })
    setCart([])
  }

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0)

  return (
    <div className="card sticky-top" style={{ top: '80px' }}>
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">🛒 Cart ({cart.length})</h5>
      </div>
      <div className="card-body">
        {cart.length === 0 ? (
          <p className="text-muted text-center py-3">Cart is empty!</p>
        ) : (
          <>
            <ul className="list-unstyled">
              {cart.map((product, index) => (
                <li key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                  <div>
                    <p className="mb-0 small fw-bold">{product.title}</p>
                    <small className="text-success">${product.price}</small>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFromCart(product.id)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            <hr />
            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Total:</span>
              <span className="text-success">${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-success w-100 mb-2">
              Checkout 💳
            </Link>
            <button className="btn btn-outline-danger w-100" onClick={clearCart}>
              Clear Cart 🗑️
            </button>
          </>
        )}
      </div>
    </div>
  )
}