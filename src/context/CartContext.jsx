import { createContext, useContext, useEffect, useState } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/cart')
      .then(r => r.json())
      .then(setCart)
      .catch(() => setCart([]))
  }, [])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function UseCart() {
  return useContext(CartContext)
}