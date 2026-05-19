import { NavLink } from 'react-router-dom'
import { UseCart } from '../context/CartContext'

export default function Navbar() {
  const { cart } = UseCart()

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

  return (
    <nav style={navStyle}>
      <NavLink
        to="/"
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        Home
      </NavLink>

      <NavLink
        to="/shop"
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        Shop {cart.length > 0 && (
          <span style={{ backgroundColor: '#5C2D0E', borderRadius: '50%', padding: '2px 7px', fontSize: '0.8rem', marginLeft: '5px' }}>
            {cart.length}
          </span>
        )}
      </NavLink>

      <NavLink
        to="/admin"
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        Admin Portal
      </NavLink>
    </nav>
  )
}