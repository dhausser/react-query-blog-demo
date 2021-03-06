import {
  useMutation,
  MutationFunction,
  UseMutationOptions,
  useQueryClient,
} from 'react-query'
import { Post } from 'types'

const createPost = (newPost): Promise<Post> =>
  fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error)
    })

export default function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation(createPost, {
    onMutate: async (newPost: Post) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('posts')

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData<Post[]>('posts')

      // Optimistically update to the new value
      queryClient.setQueryData<Post[]>('posts', (old) => [...old, newPost])

      // Return a context object with the snapshotted value
      return { previousPosts }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newPost, context) => {
      queryClient.setQueryData('posts', context.previousPosts)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries('posts')
    },
  })
}
