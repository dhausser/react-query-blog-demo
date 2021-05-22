import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

export default function useSavePost() {
  const queryClient = useQueryClient()
  return useMutation(
    (values) =>
      axios.patch(`/api/posts/${values.id}`, values).then((res) => res.data),
    {
      onSuccess: (post) => {
        queryClient.invalidateQueries(['posts', [post.id]])
      },
    }
  )
}
