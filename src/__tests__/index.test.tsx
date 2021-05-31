import React from 'react'
import { render, screen } from 'utils/test-utils'
import { App } from '..'

test('renders the home page', () => {
  render(<App />)
  const heading = screen.getByRole('heading', { name: /welcome/i })
  expect(heading).toHaveTextContent('Welcome')
})
