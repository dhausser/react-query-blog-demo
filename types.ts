import React from 'react'

export interface Post {
  userId: React.Key
  id: React.Key
  title: string
  body: string
}
