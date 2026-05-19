import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
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
import ProtectedRoute from './compnents/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/home" element={<ProtectedRoute><App /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
              <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
              <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminPortal /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  </StrictMode>
)