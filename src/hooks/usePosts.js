import { useQuery } from 'react-query'

const fetchPosts = () => fetch('/api/posts').then((res) => res.json())

export default function usePosts() {
  return useQuery('posts', fetchPosts)
}
