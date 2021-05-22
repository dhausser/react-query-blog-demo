import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

export default function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation((postId) => axios.delete(`/api/posts/${postId}`), {
    onMutate: async (postId) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('posts')

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData('posts')

      // Optimistically update to the new value
      queryClient.setQueryData('posts', () =>
        previousPosts.filter((d) => d.id != postId)
      )

      // Return a context object with the snapshotted value
      return { previousPosts }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newPost, context) => {
      console.log(err)
      queryClient.setQueryData('posts', context.previousPosts)
    },
    // // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries('posts')
    },
  })
}
