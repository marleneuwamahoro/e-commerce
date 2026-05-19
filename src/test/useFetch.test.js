import { renderHook, waitFor } from '@testing-library/react'
import { useFetch } from '../hooks/useFetch'

describe('useFetch', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  test('returns data on successful fetch', async () => {
    const mockData = [{ id: 1, name: 'Coffee R Us' }]
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData)
    })

    const { result } = renderHook(() => useFetch('http://localhost:3000/store_info'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBe('')
  })

  test('sets error on failed fetch', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useFetch('http://localhost:3000/store_info'))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe('Network error')
    expect(result.current.data).toBeNull()
  })

  test('does not fetch when url is empty', () => {
    global.fetch = vi.fn()
    renderHook(() => useFetch(''))
    expect(global.fetch).not.toHaveBeenCalled()
  })
})