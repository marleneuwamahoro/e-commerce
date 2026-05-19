import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseProducts } from '../context/ProductContext'

export default function AddProduct() {
  const navigate = useNavigate()
  const { setProducts } = UseProducts()

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    categories: ''
  })

  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const newProduct = {
      title: form.title,
      description: form.description,
      price: parseFloat(form.price),
      image: form.image || 'https://placehold.co/400x300/3498DB/FFFFFF',
      categories: form.categories.split(',').map(c => c.trim()),
      status: 'active',
      id: Date.now()
    }

    setProducts(prev => [...prev, newProduct])
    setLoading(false)
    navigate('/')
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">➕ Add New Product</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Product Title *</label>
                  <input
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Enter product title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Description *</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows={3}
                    placeholder="Enter product description"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Price ($) *</label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    className="form-control"
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Image URL</label>
                  <input
                    name="image"
                    type="text"
                    className="form-control"
                    placeholder="https://..."
                    value={form.image}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Categories</label>
                  <input
                    name="categories"
                    type="text"
                    className="form-control"
                    placeholder="Electronics, Sports..."
                    value={form.categories}
                    onChange={handleChange}
                  />
                  <small className="text-muted">Separate with commas</small>
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-success flex-grow-1"
                    disabled={loading}
                  >
                    {loading ? '⏳ Adding...' : '✅ Add Product'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}