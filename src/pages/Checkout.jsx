import { UseCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import Navbar from '../compnents/Navbar'

export default function Checkout() {
  const { cart, setCart } = UseCart()
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0)

  function handleOrder() {
    cart.forEach(item => fetch(`http://localhost:3000/cart/${item.id}`, { method: 'DELETE' }))
    setCart([])
    alert('Order placed! ☕ Thank you!')
    navigate('/')
  }

  function removeItem(id) {
    setCart(prev => prev.filter(item => item.id !== id))
    fetch(`http://localhost:3000/cart/${id}`, { method: 'DELETE' })
  }

  const pageStyle = { backgroundColor: '#8B6B4A', minHeight: '100vh', display: 'flex', flexDirection: 'column' }
  const contentStyle = { flex: 1, padding: '40px', maxWidth: '700px', margin: '0 auto', width: '100%', color: 'white' }
  const cardStyle = { backgroundColor: '#E8DDD0', borderRadius: '12px', padding: '20px', color: '#3D2B1F', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
  const btnStyle = { padding: '12px 30px', backgroundColor: '#5C2D0E', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }

  return (
    <div style={pageStyle}>
      <Navbar />
      <div style={contentStyle}>
        <h2 style={{ marginBottom: '24px' }}>☕ Your Order</h2>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Your cart is empty!</p>
            <button onClick={() => navigate('/shop')} style={btnStyle}>Browse Coffee</button>
          </div>
        ) : (
          <>
            {cart.map((item, i) => (
              <div key={i} style={cardStyle}>
                <div>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: 0, color: '#6B4F3A', fontSize: '0.9rem' }}>{item.origin}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>${parseFloat(item.price).toFixed(2)}</span>
                  <button onClick={() => removeItem(item.id)} style={{ backgroundColor: '#cc4444', color: 'white', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}>✕</button>
                </div>
              </div>
            ))}

            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '20px', marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px' }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleOrder} style={{ ...btnStyle, flex: 1 }}>Place Order ☕</button>
                <button onClick={() => navigate('/shop')} style={{ ...btnStyle, backgroundColor: '#7A6352', flex: 1 }}>Continue Shopping</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}