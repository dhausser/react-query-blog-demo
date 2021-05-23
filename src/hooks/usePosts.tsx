import { useQuery } from 'react-query'
import { Post } from '../../types'

const fetchPosts = () =>
  fetch('/api/posts')
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error)
    })

export default function usePosts() {
  return useQuery<Post[], Error>('posts', fetchPosts)
}
