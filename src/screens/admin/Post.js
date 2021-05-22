import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

//

import usePost from '../../hooks/usePost'
import useSavePost from '../../hooks/useSavePost'
import useDeletePost from '../../hooks/useDeletePost'

import PostForm from '../../components/PostForm'
import { Loader } from '../../components/styled'

export default function Post() {
  const { postId } = useParams()
  const navigate = useNavigate()

  const postQuery = usePost(postId)
  const savePostMutation = useSavePost()
  const deletePostMutation = useDeletePost()

  const onDelete = () => {
    deletePostMutation.mutate(postId)
    navigate('/admin')
  }

  return (
    <>
      {postQuery.isLoading ? (
        <span>
          <Loader /> Loading...
        </span>
      ) : (
        <div>
          <h3>{postQuery.data.title}</h3>
          <p>
            <Link to={`/blog/${postQuery.data.id}`}>View Post</Link>
          </p>
          <PostForm
            initialValues={postQuery.data}
            onSubmit={savePostMutation.mutate}
            submitText={
              savePostMutation.isLoading
                ? 'Saving...'
                : savePostMutation.isError
                ? 'Error!'
                : savePostMutation.isSuccess
                ? 'Saved!'
                : 'Save Post'
            }
          />

          <p>
            <button onClick={onDelete}>
              {deletePostMutation.isLoading
                ? 'Deleting...'
                : deletePostMutation.isError
                ? 'Error!'
                : deletePostMutation.isSuccess
                ? 'Deleted!'
                : 'Delete Post'}
            </button>
          </p>
        </div>
      )}
    </>
  )
}
