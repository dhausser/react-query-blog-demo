import { useQuery } from 'react-query'

export default function usePosts() {
  return useQuery('posts', () =>
    fetch('/api/posts').then((response) => response.json())
  )
}
