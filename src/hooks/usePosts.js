import { useQuery } from 'react-query'

const fetchPosts = () =>
  fetch('/api/posts')
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error)
    })

export default function usePosts() {
  return useQuery('posts', fetchPosts)
}
