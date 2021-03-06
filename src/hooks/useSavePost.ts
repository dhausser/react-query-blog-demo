import { useMutation, useQueryClient, UseQueryOptions } from 'react-query'
import { Post } from 'types'

function savePost(newPost: Post) {
  return fetch(`/api/posts/${newPost.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  }).catch((error) => {
    throw new Error(error)
  })
}

export default function useSavePost<TData = Post>(
  options?: UseQueryOptions<Post, Error, TData>
) {
  const queryClient = useQueryClient()
  return useMutation(savePost, {
    // When mutate is called:
    onMutate: async (newPost: Post) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['posts', newPost.id])

      // Snapshot the previous value
      const previousPost = queryClient.getQueryData<Post>(['posts', newPost.id])

      // Optimistically update to the new value
      queryClient.setQueryData(['posts', newPost.id], newPost)
      if (queryClient.getQueryData<Post[]>('posts')) {
        queryClient.setQueryData<Post[]>('posts', (old) => {
          return old.map((d) => {
            if (d.id == newPost.id) {
              return newPost
            }
            return d
          })
        })
      } else {
        queryClient.setQueryData<Post[]>('posts', [newPost])
      }

      // Return a context object with the snapshotted value
      return { previousPost, newPost }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newPost, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          ['posts', context.newPost.id],
          context.previousPost
        )
      }
    },
    // Always refetch after error or success:
    onSettled: (data, error, newTodo) => {
      queryClient.invalidateQueries(['posts', newTodo.id])
    },
  })
}
