import ProductCard from './ProductCard'
import { UseProducts } from '../context/ProductContext'

export default function ProductList({ search = '' }) {
  const { products = [] } = UseProducts()  // ← guard against undefined products

  const filtered = products.filter(product =>
    (product.title ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (product.description ?? '').toLowerCase().includes(search.toLowerCase())  // ← guard against undefined fields
  )

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Products ({filtered.length})</h4>
      </div>
      {filtered.length === 0 ? (
        <div className="alert alert-info">
          No products found for "{search}"
        </div>
      ) : (
        <div className="row">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}