import { render as rtlRender } from '@testing-library/react'
import { AppProviders } from 'context/app-providers'

function render(ui, renderOptions = {}) {
  return rtlRender(ui, { wrapper: AppProviders, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
