import { createContext, useContext, useEffect, useState } from 'react'

export const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/coffee')
      .then(r => r.json())
      .then(setProducts)
      .catch(() => setProducts([]))
  }, [])

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

export function UseProducts() {
  return useContext(ProductContext)
}