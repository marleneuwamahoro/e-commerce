import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import { CartContext } from '../context/CartContext'
import Shop from '../pages/Shop'

const mockProducts = [
  { id: 1, name: 'Vanilla Bean', description: 'Medium Roast', origin: 'Colombia', price: 10.00 },
  { id: 2, name: 'House Blend', description: 'Dark Roast', origin: 'Vietnam', price: 12.00 },
  { id: 3, name: 'Light Roast', description: 'Fruity notes', origin: 'Ethiopia', price: 14.00 }
]

function renderShop(cart = []) {
  return render(
    <ProductContext.Provider value={{ products: mockProducts, setProducts: vi.fn() }}>
      <CartContext.Provider value={{ cart, setCart: vi.fn() }}>
        <MemoryRouter>
          <Shop />
        </MemoryRouter>
      </CartContext.Provider>
    </ProductContext.Provider>
  )
}

describe('Shop', () => {
  test('renders all products', () => {
    renderShop()
    expect(screen.getByText('Vanilla Bean')).toBeInTheDocument()
    expect(screen.getByText('House Blend')).toBeInTheDocument()
    expect(screen.getByText('Light Roast')).toBeInTheDocument()
  })

  test('filters products by search', () => {
    renderShop()
    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'Vanilla' }
    })
    expect(screen.getByText('Vanilla Bean')).toBeInTheDocument()
    expect(screen.queryByText('House Blend')).not.toBeInTheDocument()
  })

  test('filters products by origin checkbox', () => {
    renderShop()
    fireEvent.click(screen.getByLabelText ? screen.getByText('Colombia') : screen.getByText('Colombia'))
    expect(screen.getByText('Vanilla Bean')).toBeInTheDocument()
    expect(screen.queryByText('House Blend')).not.toBeInTheDocument()
  })

  test('add to cart button shows Added when item is in cart', () => {
    const cartWithItem = [{ id: 10, coffeeId: 1, name: 'Vanilla Bean', price: 10 }]
    renderShop(cartWithItem)
    expect(screen.getByText('✅ Added')).toBeInTheDocument()
  })
})