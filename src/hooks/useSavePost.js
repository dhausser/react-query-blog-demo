import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

export default function useSavePost() {
  const queryClient = useQueryClient()
  return useMutation(
    (newPost) =>
      axios.patch(`/api/posts/${newPost.id}`, newPost).then((res) => res.data),
    {
      // When mutate is called:
      onMutate: async (newPost) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['posts', newPost.id])

        // Snapshot the previous value
        const previousPost = queryClient.getQueryData(['posts', newPost.id])

        // Optimistically update to the new value
        queryClient.setQueryData(['posts', newPost.id], newPost)
        if (queryClient.getQueryData('posts')) {
          queryClient.setQueryData('posts', (old) => {
            return old.map((d) => {
              if (d.id == newPost.id) {
                return newPost
              }
              return d
            })
          })
        } else {
          queryClient.setQueryData('posts', [newPost])
        }

        // Return a context object with the snapshotted value
        return { previousPost, newPost }
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newPost, context) => {
        queryClient.setQueryData(
          ['posts', context.newPost.id],
          context.previousPost
        )
      },
      // Always refetch after error or success:
      onSettled: (newTodo) => {
        queryClient.invalidateQueries(['posts', newTodo.id])
      },
    }
  )
}
