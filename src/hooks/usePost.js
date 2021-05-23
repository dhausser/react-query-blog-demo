import { useQuery, useQueryClient } from 'react-query'

const fetchPost = (postId) =>
  fetch(`/api/posts/${postId}`).then((res) => res.json())

export default function usePost(postId) {
  const queryClient = new useQueryClient()
  return useQuery(['posts', postId], () => fetchPost(postId), {
    initialData: () => {
      return queryClient.getQueryData('posts')?.find((d) => d.id == postId)
    },
  })
}
