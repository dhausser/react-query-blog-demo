import { useMutation, useQueryClient } from 'react-query'

const createPost = (newPost) =>
  fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  })

export default function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation(createPost, {
    onMutate: async (newPost) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('posts')

      console.log(newPost)
      console.log(JSON.stringify(newPost))

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
