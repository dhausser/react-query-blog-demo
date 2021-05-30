import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
//

import { AppProviders } from 'context/app-providers'
import { Wrapper, Main } from './components/styled'
import GlobalLoader from './components/GlobalLoader'
import Sidebar from './components/Sidebar'

import Admin from './screens/admin'
import AdminPost from './screens/admin/Post'
import Blog from './screens/blog'
import BlogPost from './screens/blog/Post'

export default function App() {
  return (
    <AppProviders>
      <Wrapper>
        <GlobalLoader />
        <Sidebar />
        <Main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1>Welcome!</h1>
                </>
              }
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/:postId" element={<AdminPost />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
          </Routes>
        </Main>
      </Wrapper>
      <ReactQueryDevtools />
    </AppProviders>
  )
}
