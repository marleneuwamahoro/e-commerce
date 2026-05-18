import './App.css'
import ProductList from './compnents/ProductList'
import Cart from './compnents/Cart'
import Navbar from './compnents/Navbar'
import SearchBar from './compnents/SearchBar'
import { useState } from 'react'

function App() {
  const [search, setSearch] = useState('')

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="content">
          <SearchBar search={search} setSearch={setSearch} />
          <div className="row">
            <div className="col-md-9">
              <ProductList search={search} />
            </div>
            <div className="col-md-3">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App