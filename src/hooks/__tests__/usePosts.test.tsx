import { useQuery } from 'react-query'
import { renderHook } from 'utils/test-utils'
import usePosts from 'hooks/usePosts'

export function useCustomHook() {
  return useQuery('customHook', () => 'Hello')
}

test('renders custom hook', async () => {
  const { result, waitFor } = renderHook(() => useCustomHook())

  await waitFor(() => result.current.isSuccess)

  expect(result.current.data).toEqual('Hello')
})

test('renders use posts hook', async () => {
  const { result, waitFor } = renderHook(() => usePosts())

  await waitFor(() => result.current.isSuccess)

  expect(result.current.data).toEqual([])
})
