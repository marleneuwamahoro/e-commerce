import { Link } from 'react-router-dom'
import Navbar from '../compnents/Navbar'
import { CartProvider } from '../context/CartContext'
import { useFetch } from '../hooks/useFetch'

export default function Home() {
  const { data } = useFetch('http://localhost:3000/store_info')

  const store = data?.[0]

  return (
    <>
      <CartProvider>
        <Navbar />
      </CartProvider>
      <div className="container mt-5 text-center">
        <div className="p-5 mb-4 bg-dark text-white rounded-3">
          <h1 className="display-4">
            🛒 {store?.name || 'ShopReact'}
          </h1>
          <p className="lead">
            {store?.description || 'The best online store for all your needs'}
          </p>
          {store?.phone_number && (
            <p>📞 {store.phone_number}</p>
          )}
          <Link to="/" className="btn btn-light btn-lg me-3">
            🛍️ Shop Now
          </Link>
          <Link to="/add-product" className="btn btn-outline-light btn-lg">
            ➕ Add Product
          </Link>
        </div>
      </div>
    </>
  )
}