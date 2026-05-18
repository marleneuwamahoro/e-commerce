import { useParams, useNavigate } from 'react-router-dom'
import { UseProducts } from '../context/ProductContext'
import { useState } from 'react'
import Navbar from '../compnents/Navbar'
import { CartProvider } from '../context/CartContext'

export default function ProductDetails() {
  const { id } = useParams()
  const { products, setProducts } = UseProducts()
  const navigate = useNavigate()

  const product = products.find(p => String(p.id) === String(id))

  const [editing, setEditing] = useState(false)
  const [price, setPrice] = useState(product?.price || '')
  const [description, setDescription] = useState(product?.description || '')

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mt-4">
          <div className="alert alert-danger">Product not found!</div>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </>
    )
  }

  function handleUpdate(e) {
    e.preventDefault()

    const updatedProduct = {
      ...product,
      price: parseFloat(price),
      description
    }

    fetch(`https://mockerjson.xyz/api/v1/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: parseFloat(price), description })
    })
      .then(() => {
        setProducts(prev =>
          prev.map(p => p.id === product.id ? updatedProduct : p)
        )
        setEditing(false)
        alert('Product updated successfully!')
      })
      .catch(() => {
        // Update locally even if API fails
        setProducts(prev =>
          prev.map(p => p.id === product.id ? updatedProduct : p)
        )
        setEditing(false)
      })
  }

  return (
    <>
      <CartProvider>
        <Navbar />
      </CartProvider>
      <div className="container mt-4">
        <button className="btn btn-outline-secondary mb-3" onClick={() => navigate('/')}>
          ← Back
        </button>

        <div className="row">
          <div className="col-md-5">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
            />
          </div>
          <div className="col-md-7">
            <h2>{product.title}</h2>
            <div className="mb-3">
              {product.categories?.map((cat, i) => (
                <span key={i} className="badge bg-secondary me-1">{cat}</span>
              ))}
            </div>

            {editing ? (
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    💾 Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p className="text-success fs-3 fw-bold">${product.price}</p>
                <p className="text-muted">{product.description}</p>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setEditing(true)
                    setPrice(product.price)
                    setDescription(product.description)
                  }}
                >
                  ✏️ Edit Product
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}