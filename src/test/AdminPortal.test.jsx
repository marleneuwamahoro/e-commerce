import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext'
import AdminPortal from '../pages/AdminPortal'

function renderAdmin(products = []) {
  return render(
    <UserContext.Provider value={{ user: { email: 'marlene@me.dev' }, setUser: vi.fn() }}>
      <ProductContext.Provider value={{ products, setProducts: vi.fn() }}>
        <CartContext.Provider value={{ cart: [], setCart: vi.fn() }}>
          <MemoryRouter>
            <AdminPortal />
          </MemoryRouter>
        </CartContext.Provider>
      </ProductContext.Provider>
    </UserContext.Provider>
  )
}

describe('AdminPortal', () => {
  test('renders the form fields', () => {
    renderAdmin()
    const inputs = screen.getAllByPlaceholderText('Type here')
    expect(inputs.length).toBe(4)
  })

  test('shows validation errors when submitting empty form', () => {
    renderAdmin()
    fireEvent.click(screen.getByText('Submit'))
    expect(screen.getByText(/Coffee name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Description is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Origin is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Price is required/i)).toBeInTheDocument()
  })

  test('shows product list', () => {
    const products = [{ id: 1, name: 'Vanilla Bean', price: 10 }]
    renderAdmin(products)
    expect(screen.getByText('All Products (1)')).toBeInTheDocument()
    expect(screen.getByText('Vanilla Bean')).toBeInTheDocument()
  })
})