import { Link } from 'react-router-dom'
import { UseCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { cart, setCart } = UseCart()

  const isInCart = cart.some(item => item.id === product.id)

  function handleOnClick() {
    if (isInCart) return

    setCart(prev => [...prev, product])

    fetch('http://localhost:3000/cart', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
  }

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-muted small">{product.description?.substring(0, 80)}...</p>
          <p className="card-text fw-bold text-success fs-5">${product.price}</p>
          <div className="mt-auto d-flex gap-2">
            <button
              onClick={handleOnClick}
              disabled={isInCart}
              className={`btn ${isInCart ? 'btn-success' : 'btn-primary'} flex-grow-1`}
            >
              {isInCart ? '✅ Added' : '🛒 Add to Cart'}
            </button>
            <Link to={`/product/${product.id}`} className="btn btn-warning">
              👁️ View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}