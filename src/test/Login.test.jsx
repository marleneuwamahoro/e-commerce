import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { CartContext } from '../context/CartContext'
import Login from '../pages/Login'

function renderLogin(setUser = vi.fn()) {
  return render(
    <UserContext.Provider value={{ user: {}, setUser }}>
      <CartContext.Provider value={{ cart: [], setCart: vi.fn() }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

describe('Login', () => {
  test('renders email and password fields', () => {
    renderLogin()
    expect(screen.getByPlaceholderText('marlene@me.dev')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
  })

  test('renders login button', () => {
    renderLogin()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  test('allows typing in email and password fields', () => {
    renderLogin()
    const emailInput = screen.getByPlaceholderText('marlene@me.dev')
    const passwordInput = screen.getByPlaceholderText('••••••••')
    fireEvent.change(emailInput, { target: { value: 'marlene@me.dev' } })
    fireEvent.change(passwordInput, { target: { value: '123456789' } })
    expect(emailInput.value).toBe('marlene@me.dev')
    expect(passwordInput.value).toBe('123456789')
  })

  test('shows test credentials hint', () => {
    renderLogin()
    expect(screen.getByText(/marlene@me.dev/i)).toBeInTheDocument()
  })
})