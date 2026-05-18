import Navbar from '../compnents/Navbar'
import { UseCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const { cart, setCart } = UseCart()
  const navigate = useNavigate()

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price), 0
  )

  function handleOrder() {
    cart.forEach(item => {
      fetch(`http://localhost:3000/cart/${item.id}`, {
        method: 'DELETE'
      })
    })
    setCart([])
    alert('Order placed successfully! 🎉')
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>🛒 Checkout</h2>
        <hr />
        {cart.length === 0 ? (
          <div className="alert alert-info">
            Your cart is empty!{' '}
            <button
              className="btn btn-link p-0"
              onClick={() => navigate('/')}
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              <h4>Order Summary</h4>
              <div className="list-group mb-3">
                {cart.map((item, i) => (
                  <div key={i} className="list-group-item d-flex justify-content-between">
                    <div>
                      <h6 className="mb-0">{item.title}</h6>
                      <small className="text-muted">{item.description?.substring(0, 50)}...</small>
                    </div>
                    <span className="text-success fw-bold">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5>Total: <span className="text-success">${total.toFixed(2)}</span></h5>
                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={handleOrder}
                  >
                    Place Order 🎉
                  </button>
                  <button
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => navigate('/')}
                  >
                    ← Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}