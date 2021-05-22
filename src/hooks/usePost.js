import { useQuery } from 'react-query'

export const fetchPost = (postId) =>
  fetch(`/api/posts/${postId}`).then((res) => res.json())

export default function usePost(postId) {
  return useQuery(['posts', postId], () => fetchPost(postId))
}
