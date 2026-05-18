import { createContext, useContext, useEffect, useState } from 'react'

export const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://mockerjson.xyz/api/v1/products/')
      .then(response => response.json())
      .then(fetchedData => {
        const { data } = fetchedData
        setProducts(data)
      })
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