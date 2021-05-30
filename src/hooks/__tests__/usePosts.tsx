import { QueryClientProvider, QueryClient, useQuery } from 'react-query'
import { renderHook } from '@testing-library/react-hooks'

export function useCustomHook() {
  return useQuery('customHook', () => 'Hello')
}

const queryClient = new QueryClient()
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

test('renders custom hook', async () => {
  const { result, waitFor } = renderHook(() => useCustomHook(), { wrapper })

  await waitFor(() => result.current.isSuccess)

  expect(result.current.data).toEqual('Hello')
})
