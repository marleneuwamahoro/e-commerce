import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Checkout from './pages/Checkout.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import AddProduct from './pages/AddProduct.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import Shop from './pages/Shop.jsx'
import AdminPortal from './pages/AdminPortal.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
<Route path="/home" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/admin" element={<AdminPortal />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  </StrictMode>
)