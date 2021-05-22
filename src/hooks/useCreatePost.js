import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export default function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation((newPost) => axios.post('/api/posts', newPost), {
    onMutate: async (newPost) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('posts')

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData('posts')

      // Optimistically update to the new value
      queryClient.setQueryData('posts', (old) => [...old, newPost])

      // Return a context object with the snapshotted value
      return { previousPosts }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newPost, context) => {
      queryClient.setQueryData('posts', context.previousTodos)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries('posts')
    },
  })
}
