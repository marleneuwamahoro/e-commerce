import { NavLink } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { UseCart } from '../context/CartContext'

export default function Navbar() {
  const { user, setUser } = useUser()
  const { cart } = UseCart()

  function handleLogout() {
    setUser({})
  }

  return (
    <nav className="sticky-top navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">🛒 ShopReact</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-product">Add Product</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/checkout">
                Checkout 🛒 {cart.length > 0 && (
                  <span className="badge bg-danger">{cart.length}</span>
                )}
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            {user.email ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">👤 {user.email}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm mt-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}