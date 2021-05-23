import { useMutation, useQueryClient } from 'react-query'

const deletePost = (postId) =>
  fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
    body: postId,
  }).catch((error) => {
    throw new Error(error)
  })

export default function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation(deletePost, {
    onSettled: () => {
      queryClient.invalidateQueries('posts')
    },
  })
}
