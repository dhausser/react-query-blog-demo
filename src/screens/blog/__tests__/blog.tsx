import * as React from 'react'
import { render, screen } from 'utils/test-utils'
import Blog from 'screens/blog'

test('renders the blog list', () => {
  render(<Blog />)
  expect(screen.getByText('Blog')).toBeInTheDocument()
})
