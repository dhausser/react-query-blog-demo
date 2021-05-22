import React from 'react'
import { Link } from 'react-router-dom'

import PostForm from '../../components/PostForm'
import { Loader } from '../../components/styled'

import usePosts from '../../hooks/usePosts'
import useCreatePost from '../../hooks/useCreatePost'

export default function Posts() {
  const postsQuery = usePosts()
  const createPostMutation = useCreatePost()

  return (
    <section>
      <div>
        <div>
          {postsQuery.isLoading ? (
            <span>
              <Loader /> Loading
            </span>
          ) : (
            <>
              <h3>Posts</h3>
              <ul>
                {postsQuery.data.map((post) => (
                  <li key={post.id}>
                    <Link to={`./${post.id}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
              <br />
            </>
          )}
        </div>
      </div>
      <hr />
      <div>
        <h3>Create New Post</h3>
        <div>
          <PostForm
            onSubmit={createPostMutation.mutate}
            clearOnSubmit
            submitText={
              createPostMutation.isLoading
                ? 'Saving...'
                : createPostMutation.isError
                ? 'Error!'
                : createPostMutation.isSuccess
                ? 'Saved!'
                : 'Create Post'
            }
          />
        </div>
      </div>
    </section>
  )
}
