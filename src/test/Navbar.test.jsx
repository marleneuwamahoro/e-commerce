import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import Navbar from '../compnents/Navbar'

const mockCart = [
  { id: 1, name: 'Vanilla Bean', price: 10.00, coffeeId: 1 },
  { id: 2, name: 'House Blend', price: 12.00, coffeeId: 2 }
]

function renderNavbar(cart = []) {
  return render(
    <CartContext.Provider value={{ cart, setCart: vi.fn() }}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </CartContext.Provider>
  )
}

describe('Navbar', () => {
  test('renders all nav links', () => {
    renderNavbar()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Shop')).toBeInTheDocument()
    expect(screen.getByText('Admin Portal')).toBeInTheDocument()
  })

  test('shows correct cart item count', () => {
    renderNavbar(mockCart)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('opens cart dropdown when cart button clicked', () => {
    renderNavbar(mockCart)
    fireEvent.click(screen.getByText(/Cart/))
    expect(screen.getByText('Vanilla Bean')).toBeInTheDocument()
    expect(screen.getByText('House Blend')).toBeInTheDocument()
  })

  test('shows empty message when cart is empty', () => {
    renderNavbar([])
    fireEvent.click(screen.getByText(/Cart/))
    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument()
  })
})