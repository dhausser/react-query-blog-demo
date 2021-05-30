import { render as rtlRender } from '@testing-library/react'
import { renderHook as rtlRenderHook } from '@testing-library/react-hooks'
import { AppProviders } from 'context/app-providers'

function render(ui, renderOptions = {}) {
  return rtlRender(ui, { wrapper: AppProviders, ...renderOptions })
}

function renderHook(customHook, renderOptions = {}) {
  return rtlRenderHook(customHook, { wrapper: AppProviders, ...renderOptions })
}

export * from '@testing-library/react'
export { render, renderHook }
