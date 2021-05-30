import { useQuery, useQueryClient } from 'react-query'
import { Post } from 'types'

function fetchPost(postId): Promise<Post> {
  return fetch(`/api/posts/${postId}`)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error)
    })
}

export default function usePost(postId) {
  const queryClient = useQueryClient()
  return useQuery<Post, Error>(['posts', postId], () => fetchPost(postId), {
    initialData: () => {
      return queryClient
        .getQueryData<Post[]>('posts')
        ?.find((d) => d.id == postId)
    },
  })
}
